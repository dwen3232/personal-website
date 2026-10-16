/** A map pin whose point sits at (left, top). */
function Pin(props: { left: string; top: string; className?: string }) {
  return (
    <i
      aria-hidden="true"
      className={`map-pin absolute z-[3] block aspect-square w-[4cqw] ${props.className ?? ""}`.trim()}
      style={{ left: props.left, top: props.top }}
    />
  );
}

export default Pin;
