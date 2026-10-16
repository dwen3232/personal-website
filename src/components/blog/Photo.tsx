import Tape from "../Scrapbook/Tape";

/** Small, stable tilt per image so a post's photos don't all lean the same way */
function tiltFor(src: string) {
  let hash = 0;
  for (const ch of src) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return ((Math.abs(hash) % 5) - 2) * 0.6;
}

/**
 * An in-flow instant-film print for posts. Unlike the home page's square Polaroid, it keeps
 * the photo's own shape. Markdown images become this: `![alt](/img.jpg "caption")`.
 */
function Photo(props: { src?: string; alt?: string; title?: string; caption?: string; width?: string }) {
  if (!props.src) return null;
  const caption = props.caption ?? props.title;
  return (
    <figure
      className="relative mx-auto my-[1.8em] [container-type:inline-size]"
      style={{ width: props.width ?? "min(100%, 520px)", rotate: `${tiltFor(props.src)}deg` }}
    >
      <Tape className="left-1/2 top-[-12px] w-[22%] -translate-x-1/2" style={{ height: 26 }} />
      <div className="polaroid px-[5cqw] pb-[15cqw] pt-[5cqw]">
        {/* Plain img: post images have unknown dimensions and the site is a static export */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={props.src} alt={props.alt ?? ""} className="block h-auto w-full" loading="lazy" />
      </div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-[4.5cqw] text-center font-hand text-[clamp(14px,4.4cqw,20px)] leading-none text-[#4a4744]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default Photo;
