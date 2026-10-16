import Link from "next/link";
import PostMetaLine from "@/components/blog/PostMetaLine";
import { formatPostDate } from "@/lib/dates";
import { cardMetadata } from "@/lib/og";
import { getPosts } from "@/lib/posts";

export const metadata = {
  title: "Field notes · David Wen",
  description: "Notes on machine learning, backend engineering and math.",
  ...cardMetadata({
    image: "/blog/og.png",
    alt: "Field notes by David Wen",
    title: "Field notes",
    description: "Notes on machine learning, backend engineering and math.",
  }),
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <>
      <h1 className="m-0 font-title text-[clamp(48px,10cqw,76px)] font-bold leading-none tracking-[0.05em]">Field notes</h1>
      <div className="mt-[6px] h-[2px] w-[min(60%,320px)] rounded bg-ink" />
      <p className="m-0 mt-[14px] font-hand text-[19px]">
        Things I&apos;m building and learning, written down along the way.{" "}
        <a href="/rss.xml" className="text-rust underline decoration-2 underline-offset-4">
          rss
        </a>
      </p>

      {posts.length === 0 ? (
        <p className="m-0 mt-[40px] font-hand text-[19px] text-rust">First stop coming soon.</p>
      ) : (
        // The list is a route: a dashed line with a pin at each post
        <ol className="relative m-0 mt-[40px] list-none p-0 pl-[34px] before:absolute before:bottom-[24px] before:left-[8px] before:top-[10px] before:border-l-2 before:border-dashed before:border-[rgba(42,38,34,0.35)] before:content-['']">
          {posts.map((post) => (
            <li key={post.slug} className="relative mb-[34px] last:mb-0">
              <i
                aria-hidden="true"
                className="absolute left-[-34px] top-[10px] block h-[18px] w-[18px] rotate-[-45deg] rounded-[50%_50%_50%_0] bg-rust after:absolute after:inset-[30%] after:rounded-full after:bg-paper after:content-['']"
              />
              <div className="font-title text-[20px] font-bold tracking-[0.08em] text-rust">
                {formatPostDate(post.date)}
                {post.draft && " · draft"}
              </div>
              <Link href={`/blog/${post.slug}`} className="font-hand text-[25px] font-bold leading-tight text-ink underline decoration-rust decoration-2 underline-offset-[5px] hover:text-rust">
                {post.title}
              </Link>
              <p className="m-0 mt-[6px] font-read text-[18px] leading-[1.6]">{post.summary}</p>
              <PostMetaLine className="mt-[6px]" readingMinutes={post.readingMinutes} tags={post.tags} />
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
