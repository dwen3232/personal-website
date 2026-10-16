import Image from "next/image";

function Polaroid(props: {
  src: string;
  alt: string;
  caption?: string;
  /** Positioning and size; the polaroid is absolutely positioned */
  className?: string;
  style?: React.CSSProperties;
  /** CSS object-position for the photo, e.g. "center 30%" */
  focus?: string;
}) {
  return (
    <figure
      className={`polaroid absolute m-0 p-[1.2cqw] pb-[4.8cqw] tall:p-[1.8cqw] tall:pb-[6.4cqw] ${props.className ?? ""}`.trim()}
      style={props.style}
    >
      <div className="relative h-full w-full">
        <Image
          unoptimized
          src={props.src}
          alt={props.alt}
          fill
          className="object-cover"
          style={{ objectPosition: props.focus }}
        />
      </div>
      {props.caption && (
        <figcaption className="absolute inset-x-0 bottom-[3%] text-center font-hand text-[1.8cqw] tall:text-[3cqw] text-[#4a4744]">
          {props.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default Polaroid;
