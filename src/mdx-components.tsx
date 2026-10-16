import type { MDXComponents } from "mdx/types";

/** Element overrides for every MDX post. Styling arrives in Phase 2 of docs/blog-plan.md. */
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
