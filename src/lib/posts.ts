import fs from "node:fs";
import path from "node:path";

/** What every post exports as `metadata` */
export interface PostMeta {
  title: string;
  /** ISO date, e.g. "2026-10-20" */
  date: string;
  summary: string;
  draft?: boolean;
}

export interface Post extends PostMeta {
  slug: string;
}

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

/** Drafts show in `next dev`, or in a build run with SHOW_DRAFTS=1 */
const SHOW_DRAFTS = process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";

/** Every visible post, newest first. Build time only: reads the filesystem. */
export async function getPosts(): Promise<Post[]> {
  const slugs = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = (await import(`@/content/posts/${slug}.mdx`)) as { metadata: PostMeta };
      return { ...metadata, slug };
    })
  );

  return posts
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}
