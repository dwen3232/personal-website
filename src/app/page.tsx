import Book from "@/components/Book/Book";
import ScrollSheet from "@/components/ScrollSheet";
import WoodBackground from "@/components/WoodBackground";
import type { FaceSpec } from "@/components/Shell";

import WelcomePage from "@/components/Pages/WelcomePage";
import AboutMePage from "@/components/Pages/AboutMePage";
import EmptyPage from "@/components/Pages/EmptyPage";
import UnderConstructionPage from "@/components/Pages/UnderConstructionPage";

/** Every face, in reading order. Both shells render from this one list. */
const FACES: FaceSpec[] = [
  { node: <EmptyPage faceKey={0} />, filler: true },
  { node: <WelcomePage faceKey={1} />, tallAspect: 0.26 },
  { node: <AboutMePage faceKey={2} />, tallAspect: 0.5 },
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
      <div className="shell-scroll">
        <ScrollSheet faces={FACES} />
      </div>
    </main>
  );
}
