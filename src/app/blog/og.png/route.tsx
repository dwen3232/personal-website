import { renderCard } from "@/lib/og";

// Social card for the blog index; see src/app/og.png/route.tsx for why this is a route handler
export const dynamic = "force-static";

export function GET() {
  return renderCard({
    label: "field notes",
    title: "Things I'm building and learning",
    summary: "Notes on machine learning, backend engineering and math.",
  });
}
