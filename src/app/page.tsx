import Book from "@/components/Book/Book";
import PageTurn from "@/components/PageTurn";
import WoodBackground from "@/components/WoodBackground";
import type { FaceSpec } from "@/components/Shell";

import WelcomePage from "@/components/Pages/WelcomePage";
import AboutMePage from "@/components/Pages/AboutMePage";
import EmptyPage from "@/components/Pages/EmptyPage";
import UnderConstructionPage from "@/components/Pages/UnderConstructionPage";

/** Every face, in reading order. Both shells render from this one list. */
const FACES: FaceSpec[] = [
  { node: <EmptyPage faceKey={0} />, filler: true },
  { node: <WelcomePage faceKey={1} />, slug: "hello", tallPages: 2 },
  { node: <AboutMePage faceKey={2} />, slug: "about" },
  { node: <UnderConstructionPage />, bookOnly: true },
  { node: <UnderConstructionPage />, bookOnly: true },
  { node: <UnderConstructionPage />, bookOnly: true },
];

export default function Home() {
  return (
    <main className="relative font-mono">
      <WoodBackground />
      <div className="shell-book h-screen w-screen">
        <Book faces={FACES} />
      </div>
      <div className="shell-turn">
        <PageTurn faces={FACES} />
      </div>
    </main>
  );
}
