import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog · David Wen",
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <main className="mx-auto max-w-[680px] px-[20px] py-[48px] font-read text-[18px] text-ink">
      <h1 className="m-0 font-title text-[56px] leading-none">Blog</h1>
      {posts.length === 0 ? (
        <p>Nothing here yet.</p>
      ) : (
        <ul className="m-0 mt-[32px] list-none p-0">
          {posts.map((post) => (
            <li key={post.slug} className="mb-[28px]">
              <Link href={`/blog/${post.slug}`} className="text-[24px] font-bold text-ink">
                {post.title}
              </Link>
              <div className="text-[14px] text-[#6f675d]">
                {post.date}
                {post.draft && " · draft"}
              </div>
              <p className="m-0 mt-[6px]">{post.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
