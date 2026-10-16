/** A journal entry: a bold line followed by indented branch lines. */
function Entry(props: {
  label?: string;
  title: React.ReactNode;
  items?: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`font-hand text-ink ${props.className ?? ""}`.trim()} style={props.style}>
      {props.label && (
        <div className="mb-[0.6cqw] font-title text-[4.6cqw] tall:text-[6cqw] leading-none tracking-[0.08em] text-rust">
          {props.label}
        </div>
      )}
      <div className="text-[3.5cqw] font-bold tall:text-[5cqw] leading-[1.5]">{props.title}</div>
      {props.items?.map((item, i) => (
        <div key={i} className="pl-[3.2cqw] text-[2.8cqw] tall:pl-[4.4cqw] tall:text-[4.3cqw] leading-[1.5]">
          <span className="text-rust">{"↳ "}</span>
          {item}
        </div>
      ))}
    </div>
  );
}

export default Entry;
