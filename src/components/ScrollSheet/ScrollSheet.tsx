"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ScrollTopBar from "./ScrollTopBar";
import { FaceVisibilityContext, currentHashSlug, replaceHashSlug, type FaceSpec } from "../Shell";

/** Share of a sheet that must be on screen before it counts as visible */
const VISIBLE_THRESHOLD = 0.2;

/** Where on the screen (0 = top, 1 = bottom) the route's drawing edge sits */
const DRAW_LINE = 0.6;

/**
 * A scrolling shell: every content face laid end to end on one long sheet, inside the
 * leather cover. Routes draw with scroll position. Not used on the home page (phones get
 * PageTurn there); kept for long-form pages such as the blog.
 */
function ScrollSheet(props: {
  faces: FaceSpec[];
  /** Attach scroll and visibility listeners. Pass false while the sheet is hidden */
  active?: boolean;
}) {
  const active = props.active ?? true;
  const sheetRefs = useRef<(HTMLElement | null)[]>([]);
  const [visible, setVisible] = useState<Set<number>>(new Set());

  const faces = useMemo(
    () =>
      props.faces
        .map((face, faceKey) => ({ face, faceKey }))
        .filter(({ face }) => !face.filler && !face.bookOnly),
    [props.faces]
  );

  const isFaceVisible = useCallback((faceKey: number) => visible.has(faceKey), [visible]);

  /** Visibility, for faces that animate on appearance */
  useEffect(() => {
    if (!active) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            const key = Number((entry.target as HTMLElement).dataset.faceKey);
            if (entry.isIntersecting) next.add(key);
            else next.delete(key);
          }
          return next;
        });
      },
      { threshold: VISIBLE_THRESHOLD }
    );
    sheetRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [active]);

  /** Route drawing, tied to scroll position */
  useEffect(() => {
    if (!active) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const drawLine = window.innerHeight * DRAW_LINE;
      let current = 0;
      sheetRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const progress = reduceMotion ? 1 : Math.min(1, Math.max(0, (drawLine - rect.top) / rect.height));
        el.style.setProperty("--route-progress", progress.toFixed(3));
        if (rect.top <= drawLine) current = i;
      });

      // Keep the URL hash pointing at the sheet being read; the first sheet is the bare URL
      if (window.scrollY > 0) {
        const slug = faces[current]?.face.slug ?? null;
        if (currentHashSlug() !== slug) replaceHashSlug(current === 0 ? null : slug);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [active, faces]);

  return (
    // Sized in px: the root font-size is viewport-based (for the Book), so rem is tiny on phones
    <div className="relative min-h-screen font-hand">
      <ScrollTopBar active={active} />

      <div className="book-cover mx-auto mb-[64px] mt-[68px] w-[min(560px,calc(100%-24px))] rounded-[14px] p-[10px]">
        <FaceVisibilityContext.Provider value={{ isFaceVisible }}>
          <div className="relative overflow-hidden rounded-[6px]">
            {faces.map(({ face, faceKey }, i) => (
              <section
                key={faceKey}
                ref={(el) => {
                  sheetRefs.current[i] = el;
                }}
                id={face.slug}
                data-face-key={faceKey}
                className="scroll-sheet scroll-mt-[68px]"
                style={{ aspectRatio: face.tallAspect ?? 0.5 }}
              >
                {face.node}
              </section>
            ))}
          </div>
        </FaceVisibilityContext.Provider>
      </div>
    </div>
  );
}

export default ScrollSheet;
