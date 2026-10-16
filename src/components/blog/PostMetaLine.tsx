/** "4 min read" followed by tag chips */
function PostMetaLine(props: { readingMinutes: number; tags?: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-[10px] gap-y-[6px] font-hand text-[16px] text-[#6f675d] ${props.className ?? ""}`.trim()}>
      <span>{props.readingMinutes} min read</span>
      {props.tags?.map((tag) => (
        <span
          key={tag}
          className="rounded-[3px] border-[1.5px] border-dashed border-[rgba(180,83,42,0.6)] px-[7px] py-[1px] font-stamp text-[12px] font-bold uppercase tracking-[0.12em] text-rust"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default PostMetaLine;
