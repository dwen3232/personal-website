"use client";

import { useEffect, useRef, useState } from "react";
import RouteSegment from "../Scrapbook/RouteSegment";

/**
 * A route through labelled stops that draws itself when scrolled into view.
 * Stops alternate high and low across the width.
 */
function RouteDraw(props: { stops: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const n = props.stops.length;
  const points = props.stops.map((_, i) => ({
    x: n === 1 ? 50 : 8 + (84 * i) / (n - 1),
    y: i % 2 === 0 ? 34 : 70,
  }));
  const d = points
    .map((p, i) => {
      if (i === 0) return `M${p.x} ${p.y}`;
      const prev = points[i - 1];
      const mid = (prev.x + p.x) / 2;
      return `C${mid} ${prev.y} ${mid} ${p.y} ${p.x} ${p.y}`;
    })
    .join(" ");

  return (
    <div ref={ref} className="relative my-[1.8em] h-[180px]" role="img" aria-label={`Route: ${props.stops.join(", then ")}`}>
      <RouteSegment d={d} drawn={drawn} />
      {points.map((p, i) => (
        <div key={i} className="absolute -translate-x-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <i
            aria-hidden="true"
            className="absolute left-1/2 top-0 block h-[18px] w-[18px] -translate-x-1/2 -translate-y-full rotate-[-45deg] rounded-[50%_50%_50%_0] bg-rust after:absolute after:inset-[30%] after:rounded-full after:bg-paper after:content-['']"
          />
          <span className="absolute left-1/2 top-[8px] -translate-x-1/2 whitespace-nowrap font-title text-[22px] font-bold tracking-[0.06em] text-rust">
            {props.stops[i]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default RouteDraw;
