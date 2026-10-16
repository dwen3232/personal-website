import Link from "next/link";
import { notFound } from "next/navigation";
import PostMetaLine from "@/components/blog/PostMetaLine";
import PostStamp from "@/components/blog/PostStamp";
import RouteRule from "@/components/blog/RouteRule";
import { formatPostDate } from "@/lib/dates";
import { cardMetadata } from "@/lib/og";
import { getPost, getPosts, type PostMeta } from "@/lib/posts";

/**
 * `output: "export"` rejects a dynamic route with no params, which is the state whenever
 * every post is a draft. Emit one placeholder path that renders the 404 page instead.
 */
const NO_POSTS_SLUG = "_";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  if (posts.length === 0) return [{ slug: NO_POSTS_SLUG }];
  return posts.map((post) => ({ slug: post.slug }));
}

async function loadPost(slug: string) {
  return (await import(`@/content/posts/${slug}.mdx`)) as {
    default: React.ComponentType;
    metadata: PostMeta;
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === NO_POSTS_SLUG) return {};
  const { metadata } = await loadPost(slug);
  const card = cardMetadata({
    image: `/blog/${slug}/og.png`,
    alt: metadata.title,
    title: metadata.title,
    description: metadata.summary,
    type: "article",
  });
  return {
    title: `${metadata.title} · David Wen`,
    description: metadata.summary,
    ...card,
    openGraph: { ...card.openGraph, type: "article" as const, publishedTime: metadata.date, tags: metadata.tags },
  };
}

const LINK_CLASS = "underline decoration-rust decoration-2 underline-offset-4 hover:text-rust";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === NO_POSTS_SLUG) notFound();
  const { default: Post } = await loadPost(slug);
  const metadata = await getPost(slug);
  if (!metadata) notFound();

  return (
    <article>
      <header>
        <PostStamp>
          {formatPostDate(metadata.date)}
          {metadata.draft && " · draft"}
        </PostStamp>
        <h1 className="m-0 mt-[18px] font-title text-[clamp(44px,9cqw,72px)] font-bold leading-[0.95] tracking-[0.04em] [text-wrap:balance]">
          {metadata.title}
        </h1>
        <p className="m-0 mt-[14px] font-hand text-[20px] leading-[1.45]">{metadata.summary}</p>
        <PostMetaLine className="mt-[12px]" readingMinutes={metadata.readingMinutes} tags={metadata.tags} />
      </header>
      <RouteRule />
      <div className="post">
        <Post />
      </div>
      <RouteRule />
      <footer className="flex flex-wrap items-baseline justify-between gap-[12px] font-hand text-[18px]">
        <Link href="/blog" className={LINK_CLASS}>
          ← all field notes
        </Link>
        <span>
          send a postcard <span className="text-rust">→</span>{" "}
          <a className={LINK_CLASS} href="https://www.linkedin.com/in/davidrwen/" target="_blank" rel="noopener noreferrer">
            linkedin
          </a>
          {" · "}
          <a className={LINK_CLASS} href="https://github.com/dwen3232" target="_blank" rel="noopener noreferrer">
            github
          </a>
        </span>
      </footer>
    </article>
  );
}
