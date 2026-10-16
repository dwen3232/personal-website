/** A strip of masking tape. Position, width and rotation come from className/style. */
function Tape(props: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      className={`tape-masking pointer-events-none absolute z-10 h-[6cqw] ${props.className ?? ""}`.trim()}
      style={props.style}
    />
  );
}

export default Tape;
