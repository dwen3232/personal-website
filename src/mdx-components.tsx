import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Callout from "@/components/blog/Callout";
import Photo from "@/components/blog/Photo";
import PostStamp from "@/components/blog/PostStamp";
import RouteDraw from "@/components/blog/RouteDraw";
import RouteRule from "@/components/blog/RouteRule";

/**
 * Element overrides and components available in every post without an import.
 * Typography for plain elements lives in `.post` in globals.css.
 */
const components: MDXComponents = {
  a: ({ href = "", children, id, className }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} id={id} className={className}>
        {children}
      </Link>
    ) : (
      <a href={href} id={id} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  img: (props) => <Photo src={typeof props.src === "string" ? props.src : undefined} alt={props.alt} title={props.title} />,
  hr: () => <RouteRule />,
  Callout,
  Photo,
  Stamp: PostStamp,
  RouteDraw,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
