const ICONS = {
  knight: {
    viewBox: "0 0 40 50",
    body: (
      <>
        <path d="M10 46 H32 M12 41 H30 L28 34 C30 26 32 18 28 10 C25 5 20 3 16 4 L15 1 L12 6 C8 8 6 13 5 18 L4 24 C4 27 7 28 9 26 L13 22 C15 22 17 21 18 19 C18 25 13 30 12 34 Z" strokeLinejoin="round" />
        <circle cx="13" cy="12" r="1.4" fill="currentColor" stroke="none" />
      </>
    ),
  },
  gamepad: {
    viewBox: "0 0 60 36",
    body: (
      <>
        <path d="M14 4 H46 C56 4 60 30 52 32 C46 34 42 24 36 24 H24 C18 24 14 34 8 32 C0 30 4 4 14 4Z" />
        <path d="M16 11 V19 M12 15 H20" />
        <circle cx="42" cy="12" r="2" fill="currentColor" stroke="none" />
        <circle cx="47" cy="17" r="2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  dumbbell: {
    viewBox: "0 0 60 24",
    body: (
      <>
        <rect x="5" y="3" width="7" height="18" rx="1.5" />
        <rect x="48" y="3" width="7" height="18" rx="1.5" />
        <path d="M12 12 H48 M1 12 H5 M55 12 H59" strokeWidth={2.4} />
      </>
    ),
  },
  rocket: {
    viewBox: "0 0 40 50",
    body: (
      <>
        <path d="M20 3 C28 10 30 22 27 34 H13 C10 22 12 10 20 3Z" />
        <circle cx="20" cy="18" r="4" />
        <path d="M13 27 L6 36 L13 35 M27 27 L34 36 L27 35 M16 38 L20 47 L24 38" strokeLinejoin="round" />
      </>
    ),
  },
  laptop: {
    viewBox: "0 0 60 40",
    body: (
      <>
        <rect x="10" y="4" width="40" height="26" rx="2" />
        <path d="M4 34 H56 L52 38 H8Z" strokeLinejoin="round" />
        <path d="M18 13 l4 4 -4 4 M26 21 h8" strokeLinecap="round" />
      </>
    ),
  },
  cap: {
    viewBox: "0 0 60 40",
    body: (
      <>
        <path d="M30 4 L58 15 L30 26 L2 15Z" strokeLinejoin="round" />
        <path d="M14 20 V30 C20 36 40 36 46 30 V20 M54 17 V30" />
      </>
    ),
  },
} as const;

export type LineIconName = keyof typeof ICONS;

/** Fineliner-style outline icon; inherits color from `currentColor`. */
function LineIcon(props: { name: LineIconName; className?: string; style?: React.CSSProperties }) {
  const icon = ICONS[props.name];
  return (
    <svg
      aria-hidden="true"
      viewBox={icon.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={props.className}
      style={props.style}
    >
      {icon.body}
    </svg>
  );
}

export default LineIcon;
