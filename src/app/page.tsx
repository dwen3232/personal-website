import Book from "@/components/Book/Book";
import WoodBackground from "@/components/WoodBackground";

import WelcomePage from "@/components/Pages/WelcomePage";
import AboutMePage from "@/components/Pages/AboutMePage";
import EmptyPage from "@/components/Pages/EmptyPage";
import SkillsPage from "@/components/Pages/SkillsPage";
import UnderConstructionPage from "@/components/Pages/UnderConstructionPage";

export default function Home() {
  return (
    <main className="flex h-screen w-screen font-mono">
      <WoodBackground />
      <Book
        faces={[
          { node: <EmptyPage key={0} faceKey={0} />, filler: true },
          { node: <WelcomePage key={1} faceKey={1} /> },
          { node: <AboutMePage key={2} faceKey={2} /> },
          { node: <UnderConstructionPage key={3} /> },
          { node: <UnderConstructionPage key={4} /> },
          { node: <UnderConstructionPage key={5} /> },
        ]}
      />
    </main>
  );
}
