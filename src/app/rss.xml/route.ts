import { getPosts } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Rendered once at build time into out/rss.xml
export const dynamic = "force-static";

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Noon UTC, so readers in any timezone see the post's own date */
const pubDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const categories = (post.tags ?? []).map((tag) => `      <category>${escape(tag)}</category>`).join("\n");
      return [
        "    <item>",
        `      <title>${escape(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pubDate(post.date)}</pubDate>`,
        `      <description>${escape(post.summary)}</description>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} · Field notes</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes on machine learning, backend engineering and math.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
