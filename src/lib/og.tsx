import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/** Social card size (Open Graph and Twitter) */
export const OG_SIZE = { width: 1200, height: 630 };

/** `openGraph` / `twitter` metadata pointing at a card image. Child metadata replaces the
 * parent's openGraph object wholesale, so every page passes the full set. */
export function cardMetadata(card: { image: string; alt: string; title?: string; description?: string; type?: "website" | "article" }) {
  const image = { url: card.image, ...OG_SIZE, alt: card.alt, type: "image/png" };
  return {
    openGraph: {
      siteName: "David Wen",
      type: card.type ?? "website",
      title: card.title,
      description: card.description,
      images: [image],
    },
    twitter: { card: "summary_large_image" as const, title: card.title, description: card.description, images: [image] },
  };
}

const FONT_DIR = path.join(process.cwd(), "src/app/fonts");

const INK = "#2a2622";
const RUST = "#b4532a";

/** Satori, which renders these at build time, needs TTF/OTF; the site itself uses WOFF2 */
async function loadFonts() {
  const [amatic, libron, libronBold] = await Promise.all([
    fs.readFile(path.join(FONT_DIR, "amatic-sc/AmaticSC-Bold.ttf")),
    fs.readFile(path.join(FONT_DIR, "libron/Libron-Regular.ttf")),
    fs.readFile(path.join(FONT_DIR, "libron/Libron-Bold.ttf")),
  ]);
  return [
    { name: "Amatic SC", data: amatic, weight: 700 as const, style: "normal" as const },
    { name: "Libron", data: libron, weight: 400 as const, style: "normal" as const },
    { name: "Libron", data: libronBold, weight: 700 as const, style: "normal" as const },
  ];
}

/**
 * A page of the notebook as a social card: leather cover, dot-grid paper, a rust pin and
 * label, the title, and the site name. `display` picks the lettered title (home) or the
 * reading serif (posts, which have longer titles).
 */
export async function renderCard(card: {
  label: string;
  title: string;
  summary?: string;
  stamp?: string;
  display?: boolean;
}) {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", padding: 26, background: "#a8794e" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "56px 72px",
            borderRadius: 10,
            backgroundColor: "#f8f4e7",
            backgroundImage: "radial-gradient(circle, #cfc7b3 2.2px, transparent 2.8px)",
            backgroundSize: "30px 30px",
            color: INK,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: "50% 50% 50% 0",
                  background: RUST,
                  transform: "rotate(-45deg)",
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: 999, background: "#f8f4e7" }} />
              </div>
              <div style={{ fontFamily: "Amatic SC", fontSize: 44, letterSpacing: 3, color: RUST }}>{card.label}</div>
            </div>
            <div
              style={
                card.display
                  ? { marginTop: 30, fontFamily: "Amatic SC", fontSize: 132, lineHeight: 1, letterSpacing: 4 }
                  : { marginTop: 30, fontFamily: "Libron", fontWeight: 700, fontSize: 70, lineHeight: 1.08 }
              }
            >
              {card.title}
            </div>
            {card.summary && (
              <div style={{ marginTop: 24, fontFamily: "Libron", fontSize: 32, lineHeight: 1.35, color: "#4a4440" }}>
                {card.summary}
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "Amatic SC", fontSize: 44, letterSpacing: 3 }}>davidrwen.com</div>
            {card.stamp && (
              <div
                style={{
                  display: "flex",
                  padding: "6px 18px",
                  border: `3px dashed ${RUST}`,
                  color: RUST,
                  fontFamily: "Amatic SC",
                  fontSize: 36,
                  letterSpacing: 3,
                  transform: "rotate(-3deg)",
                }}
              >
                {card.stamp}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() }
  );
}
