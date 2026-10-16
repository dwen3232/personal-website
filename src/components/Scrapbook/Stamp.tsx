/** A rubber-stamp mark: a ring (round) or a dashed box. */
function Stamp(props: {
  variant: "ring" | "box";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const shape =
    props.variant === "ring"
      ? "grid aspect-square place-items-center rounded-full border-[0.5cqw] text-center text-[2.6cqw] opacity-80"
      : "border-[0.44cqw] border-dashed px-[2.8cqw] py-[2cqw] text-[2.2cqw] opacity-85";
  return (
    <div
      className={`stamp absolute font-stamp leading-[1.4] tracking-[0.12em] ${shape} ${props.className ?? ""}`.trim()}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

export default Stamp;
