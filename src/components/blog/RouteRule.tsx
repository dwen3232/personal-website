/** Section break: a dashed route with a pin in the middle. Markdown `---` becomes this. */
function RouteRule() {
  return (
    <div role="separator" className="my-[2.2em] flex items-center gap-[14px]">
      <span className="h-0 flex-1 border-t-2 border-dashed border-[rgba(42,38,34,0.35)]" />
      <i aria-hidden="true" className="relative block h-[16px] w-[16px] rotate-[-45deg] rounded-[50%_50%_50%_0] bg-rust after:absolute after:inset-[30%] after:rounded-full after:bg-paper after:content-['']" />
      <span className="h-0 flex-1 border-t-2 border-dashed border-[rgba(42,38,34,0.35)]" />
    </div>
  );
}

export default RouteRule;
