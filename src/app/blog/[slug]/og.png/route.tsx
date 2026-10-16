import { formatPostDate } from "@/lib/dates";
import { renderCard } from "@/lib/og";
import { getPost, getPosts } from "@/lib/posts";

// Social card per post; see src/app/og.png/route.tsx for why this is a route handler
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  // Mirrors the page: a placeholder slug keeps the static export valid when every post is a draft
  if (posts.length === 0) return [{ slug: "_" }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return renderCard({ label: "field notes", title: "Field notes" });
  return renderCard({
    label: "field notes",
    title: post.title,
    summary: post.summary,
    stamp: formatPostDate(post.date),
  });
}
