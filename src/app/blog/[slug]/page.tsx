import { notFound } from "next/navigation";
import { getPosts } from "@/lib/posts";

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === NO_POSTS_SLUG) return {};
  const { metadata } = await import(`@/content/posts/${slug}.mdx`);
  return { title: `${metadata.title} · David Wen`, description: metadata.summary };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === NO_POSTS_SLUG) notFound();
  const { default: Post, metadata } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <main className="mx-auto max-w-[680px] px-[20px] py-[48px] font-read text-[18px] leading-[1.65] text-ink">
      <h1 className="m-0 font-title text-[56px] leading-none">{metadata.title}</h1>
      <div className="mt-[8px] text-[14px] text-[#6f675d]">{metadata.date}</div>
      <article className="mt-[32px]">
        <Post />
      </article>
    </main>
  );
}
