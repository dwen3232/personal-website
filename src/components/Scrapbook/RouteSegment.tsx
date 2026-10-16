"use client";

import { useId } from "react";

/**
 * A dashed route drawn in the face's 0-100 coordinate space. A solid mask path with
 * pathLength=1 reveals the dashes; the parent toggles `route-drawn` to animate it in.
 */
function RouteSegment(props: { d: string; drawn: boolean; className?: string }) {
  const maskId = useId();
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-0 h-full w-full ${props.drawn ? "route-drawn" : ""} ${props.className ?? ""}`.trim()}
    >
      <mask id={maskId} maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120">
        <path className="route-draw" d={props.d} pathLength={1} fill="none" stroke="#fff" strokeWidth={24} />
      </mask>
      <path
        d={props.d}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={1.6}
        strokeDasharray="1 5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}

export default RouteSegment;
