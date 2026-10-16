"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FaceVisibilityContext,
  currentHashSlug,
  faceIndexForSlug,
  replaceHashSlug,
  useActiveShell,
  type FaceSpec,
} from "../Shell";

/** Minimum horizontal drag, in px, before a gesture counts as a swipe */
const SWIPE_THRESHOLD_PX = 40;

/** Taps right of this fraction of the page turn forward; left of it, back */
const TAP_SPLIT = 0.45;


interface Leaf {
  faceKey: number;
  face: FaceSpec;
  /** Which slice of the face this leaf shows */
  slice: number;
  slices: number;
}

/**
 * The phone and portrait-tablet shell: the notebook held so only the right-hand page
 * shows, spine on the left. Each turn rotates one leaf around the spine. A tall face can
 * span several leaves, each showing the next slice of it.
 */
function PageTurn(props: { faces: FaceSpec[] }) {
  const active = useActiveShell() === "turn";

  const leaves = useMemo<Leaf[]>(
    () =>
      props.faces.flatMap((face, faceKey) => {
        if (face.filler || face.bookOnly) return [];
        const slices = face.tallPages ?? 1;
        return Array.from({ length: slices }, (_, slice) => ({ faceKey, face, slice, slices }));
      }),
    [props.faces]
  );

  const [current, setCurrent] = useState(0);
  const [hintSeen, setHintSeen] = useState(false);

  const go = useCallback(
    (index: number) => {
      setCurrent(Math.max(0, Math.min(leaves.length - 1, index)));
      setHintSeen(true);
    },
    [leaves.length]
  );

  const isFaceVisible = useCallback(
    (faceKey: number) => leaves[current]?.faceKey === faceKey,
    [leaves, current]
  );

  /** First leaf of the face named in the URL hash, or -1 */
  const leafForHash = useCallback(() => {
    const faceKey = faceIndexForSlug(props.faces, currentHashSlug());
    return leaves.findIndex((leaf) => leaf.faceKey === faceKey);
  }, [props.faces, leaves]);

  /** Open at the face in the URL hash, and follow later hash changes */
  useEffect(() => {
    if (!active) return;
    const target = leafForHash();
    if (target >= 0) setCurrent(target);
    const handleHashChange = () => {
      const next = leafForHash();
      if (next >= 0) setCurrent(next);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [active, leafForHash]);

  /** Keep the URL hash pointing at the open face; the first face is the bare URL */
  useEffect(() => {
    if (!active) return;
    const leaf = leaves[current];
    if (!leaf) return;
    const isFirstFace = leaf.faceKey === leaves[0].faceKey;
    replaceHashSlug(isFirstFace ? null : leaf.face.slug ?? null);
  }, [active, current, leaves]);

  /** Arrow keys */
  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(current + 1);
      else if (event.key === "ArrowLeft") go(current - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, current, go]);

  /** Swipes and taps */
  const start = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (event: React.PointerEvent) => {
    start.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const from = start.current;
    start.current = null;
    if (!from) return;
    const dx = event.clientX - from.x;
    const dy = event.clientY - from.y;
    if (Math.abs(dx) >= SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      go(current + (dx < 0 ? 1 : -1));
    } else if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && !(event.target as HTMLElement).closest("a")) {
      const rect = event.currentTarget.getBoundingClientRect();
      go(current + ((event.clientX - rect.left) / rect.width > TAP_SPLIT ? 1 : -1));
    }
  };

  return (
    // Sized in px: the root font-size is viewport-based (for the Book), so rem is tiny on phones
    <div className="turn-stage font-hand">
      <div className="turn-book book-cover">
        <div
          className="turn-leaves"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (start.current = null)}
        >
          <FaceVisibilityContext.Provider value={{ isFaceVisible }}>
            {leaves.map((leaf, i) => {
              const turned = i < current;
              return (
                <div
                  key={`${leaf.faceKey}-${leaf.slice}`}
                  className={`turn-leaf ${turned ? "turned" : ""}`}
                  style={{ zIndex: turned ? i + 1 : leaves.length - i + 10 }}
                  aria-hidden={i !== current}
                >
                  <div className="turn-front">
                    <div
                      className="turn-sheet"
                      style={{ height: `${leaf.slices * 100}%`, top: `${-leaf.slice * 100}%` }}
                    >
                      {leaf.face.node}
                    </div>
                  </div>
                  <div className="turn-back" />
                </div>
              );
            })}
          </FaceVisibilityContext.Provider>
        </div>
        <div aria-hidden="true" className="book-elastic absolute bottom-[-12px] right-[1px] top-[-12px] z-20 w-[8px] rounded-sm" />
      </div>

      <nav aria-label="Pages" className="absolute inset-x-0 bottom-[max(18px,env(safe-area-inset-bottom))] flex items-center justify-center gap-[8px]">
        {leaves.map((leaf, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Page ${i + 1}`}
            aria-current={i === current ? "page" : undefined}
            onClick={() => go(i)}
            className={`h-[8px] rounded-full border-0 p-0 transition-all ${i === current ? "w-[20px] bg-[#f5efe4]" : "w-[8px] bg-[rgba(245,239,228,0.35)]"}`}
          />
        ))}
      </nav>
      {!hintSeen && (
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[max(16px,env(safe-area-inset-bottom))] right-[28px] text-[14px] text-[#f5efe4]/70">
          {"swipe ←"}
        </div>
      )}
    </div>
  );
}

export default PageTurn;
