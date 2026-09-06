export default function WoodBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <filter id="wood-grain" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.004 0.06"
          numOctaves="4"
          seed="7"
          result="noise"
        />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0    0    0    1 0"
          result="grayNoise"
        />
        <feComponentTransfer in="grayNoise" result="grain">
          <feFuncR type="table" tableValues="0.30 0.45 0.60 0.78" />
          <feFuncG type="table" tableValues="0.18 0.29 0.41 0.55" />
          <feFuncB type="table" tableValues="0.09 0.15 0.23 0.34" />
        </feComponentTransfer>
        <feGaussianBlur in="grain" stdDeviation="0.5 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#wood-grain)" />
    </svg>
  );
}
