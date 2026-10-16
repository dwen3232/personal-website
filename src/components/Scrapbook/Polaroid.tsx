import Image from "next/image";

/**
 * An instant-film print drawn in code around a plain photo. Proportions follow a real
 * print (measured from scans): a square window with ~6% borders on three sides and a deep
 * ~23.5% bottom margin, all relative to the print's width. Give it a width only; the
 * height follows from the print's aspect ratio.
 */
function Polaroid(props: {
  src: string;
  alt: string;
  caption?: string;
  /** Positioning and width; the print is absolutely positioned */
  className?: string;
  style?: React.CSSProperties;
  /** CSS object-position for the photo, e.g. "center 30%" */
  focus?: string;
}) {
  return (
    <figure
      className={`polaroid absolute m-0 aspect-[1000/1171] [container-type:inline-size] ${props.className ?? ""}`.trim()}
      style={props.style}
    >
      <div className="absolute left-[6.2cqw] right-[6.2cqw] top-[6cqw] aspect-square">
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
        <figcaption className="absolute inset-x-0 bottom-[7cqw] text-center font-hand text-[7cqw] leading-none text-[#4a4744]">
          {props.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default Polaroid;
