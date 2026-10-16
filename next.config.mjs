import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // GitHub-flavored Markdown: tables, strikethrough, task lists, autolinks
    remarkPlugins: [remarkGfm],
    // Shiki at build time: posts ship highlighted HTML, no client-side highlighter
    rehypePlugins: [[rehypePrettyCode, { theme: "github-light", keepBackground: false }]],
  },
});

export default withMDX(nextConfig);
