/** An in-flow rubber stamp: a dashed box (default) or a ring */
function PostStamp(props: { children: React.ReactNode; ring?: boolean; className?: string }) {
  const shape = props.ring
    ? "grid aspect-square w-[118px] place-items-center rounded-full border-[3px] text-center"
    : "border-[2.5px] border-dashed px-[14px] py-[8px]";
  return (
    <span
      className={`stamp inline-block -rotate-[3deg] font-stamp text-[14px] font-bold uppercase leading-[1.35] tracking-[0.14em] opacity-85 ${shape} ${props.className ?? ""}`.trim()}
    >
      {props.children}
    </span>
  );
}

export default PostStamp;
