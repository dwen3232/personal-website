import { renderCard } from "@/lib/og";

// Social card for the home page, rendered once at build time to out/og.png. A route handler
// rather than opengraph-image.tsx, whose exported file has no extension: CloudFront's .html
// rewrite and S3's content-type detection both need ".png".
export const dynamic = "force-static";

export function GET() {
  return renderCard({
    label: "start here",
    title: "Hello, I'm David Wen",
    summary: "Machine learning engineer, backend developer, math nerd.",
    display: true,
  });
}
