import fs from "node:fs";
import path from "node:path";

/** What every post exports as `metadata` */
export interface PostMeta {
  title: string;
  /** ISO date, e.g. "2026-10-20" */
  date: string;
  summary: string;
  draft?: boolean;
  /** Lowercase topics, shown on the post and the index */
  tags?: string[];
}

export interface Post extends PostMeta {
  slug: string;
  /** Estimated from the post's prose at ~230 words per minute; at least 1 */
  readingMinutes: number;
}

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

const WORDS_PER_MINUTE = 230;

/** Drafts show in `next dev`, or in a build run with SHOW_DRAFTS=1 */
const SHOW_DRAFTS = process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";

/** Count words of prose: skip import/export statements, code blocks and JSX tags */
function readingMinutes(source: string): number {
  const prose = source
    .replace(/^(import|export)\b[\s\S]*?(?=\n\s*\n|$)/gm, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`[\]()!|-]/g, " ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Every visible post, newest first. Build time only: reads the filesystem. */
export async function getPosts(): Promise<Post[]> {
  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { metadata } = (await import(`@/content/posts/${slug}.mdx`)) as { metadata: PostMeta };
      const source = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      return { ...metadata, slug, readingMinutes: readingMinutes(source) };
    })
  );

  return posts
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** One visible post by slug, or undefined */
export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((post) => post.slug === slug);
}
