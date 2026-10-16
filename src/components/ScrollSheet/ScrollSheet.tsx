"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaceVisibilityContext, useActiveShell, type FaceSpec } from "../Shell";

/** Share of a sheet that must be on screen before it counts as visible */
const VISIBLE_THRESHOLD = 0.2;

/** Where on the screen (0 = top, 1 = bottom) the route's drawing edge sits */
const DRAW_LINE = 0.6;

/**
 * The phone and portrait-tablet shell: every content face laid end to end on one long
 * sheet, inside the same leather cover. Routes draw with scroll position.
 */
function ScrollSheet(props: { faces: FaceSpec[] }) {
  const active = useActiveShell() === "scroll";
  const sheetRefs = useRef<(HTMLElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<Set<number>>(new Set());

  const faces = props.faces
    .map((face, faceKey) => ({ face, faceKey }))
    .filter(({ face }) => !face.filler && !face.bookOnly);

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

  /** Route drawing and the progress pin, both tied to scroll position */
  useEffect(() => {
    if (!active) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const drawLine = window.innerHeight * DRAW_LINE;
      sheetRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const progress = reduceMotion ? 1 : Math.min(1, Math.max(0, (drawLine - rect.top) / rect.height));
        el.style.setProperty("--route-progress", progress.toFixed(3));
      });
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const overall = max > 0 ? window.scrollY / max : 0;
      trackRef.current?.style.setProperty("--p", `${(overall * 100).toFixed(1)}%`);
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
  }, [active]);

  return (
    // Sized in px: the root font-size is viewport-based (for the Book), so rem is tiny on phones
    <div className="relative min-h-screen font-hand">
      <header className="scroll-topbar fixed inset-x-0 top-0 z-30 flex items-center gap-[12px] px-[20px] pb-[16px] pt-[max(12px,env(safe-area-inset-top))] text-[#f5efe4]">
        <span className="whitespace-nowrap font-title text-[26px] font-bold tracking-[0.06em]">David Wen</span>
        <div ref={trackRef} aria-hidden="true" className="scroll-track relative h-[4px] flex-1">
          <i className="scroll-track-fill" />
          <b className="scroll-track-pin" />
        </div>
      </header>

      <div className="book-cover mx-auto mb-[64px] mt-[68px] w-[min(560px,calc(100%-24px))] rounded-[14px] p-[10px]">
        <FaceVisibilityContext.Provider value={{ isFaceVisible }}>
          <div className="relative overflow-hidden rounded-[6px]">
            {faces.map(({ face, faceKey }, i) => (
              <section
                key={faceKey}
                ref={(el) => {
                  sheetRefs.current[i] = el;
                }}
                data-face-key={faceKey}
                className="scroll-sheet"
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
