"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * The fixed bar over scrolling pages: the site name and a dotted track whose pin follows
 * how far down the page you are. Sized in px, since the root font-size is viewport-based.
 */
function ScrollTopBar(props: {
  /** Attach the scroll listener. Pass false while the bar is hidden */
  active?: boolean;
  /** Where the name links to. Omit for plain text */
  homeHref?: string;
  /** Extra items after the name, e.g. a section label */
  children?: React.ReactNode;
}) {
  const active = props.active ?? true;
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      trackRef.current?.style.setProperty("--p", `${(progress * 100).toFixed(1)}%`);
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

  const name = (
    <span className="whitespace-nowrap font-title text-[26px] font-bold tracking-[0.06em]">David Wen</span>
  );

  return (
    <header className="scroll-topbar fixed inset-x-0 top-0 z-30 flex items-center gap-[12px] px-[20px] pb-[16px] pt-[max(12px,env(safe-area-inset-top))] font-hand text-[#f5efe4]">
      {props.homeHref ? (
        <Link href={props.homeHref} className="text-inherit no-underline">
          {name}
        </Link>
      ) : (
        name
      )}
      {props.children}
      <div ref={trackRef} aria-hidden="true" className="scroll-track relative h-[4px] flex-1">
        <i className="scroll-track-fill" />
        <b className="scroll-track-pin" />
      </div>
    </header>
  );
}

export default ScrollTopBar;
