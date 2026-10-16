import Tape from "../Scrapbook/Tape";

/** A taped note card set apart from the body text */
function Callout(props: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="callout relative my-[1.8em] -rotate-[0.6deg] px-[22px] pb-[18px] pt-[22px] font-hand text-[19px] leading-[1.55]">
      <Tape className="left-[18px] top-[-10px] w-[90px] -rotate-[4deg]" style={{ height: 22 }} />
      {props.title && (
        <div className="mb-[6px] font-title text-[26px] font-bold leading-none tracking-[0.06em] text-rust">
          {props.title}
        </div>
      )}
      <div className="callout-body">{props.children}</div>
    </aside>
  );
}

export default Callout;
