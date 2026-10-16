/** A map pin whose point sits at the element's left/top, set through className. */
function Pin(props: { className?: string }) {
  return (
    <i
      aria-hidden="true"
      className={`map-pin absolute z-[3] block aspect-square w-[4cqw] tall:w-[5.5cqw] ${props.className ?? ""}`.trim()}
    />
  );
}

export default Pin;
