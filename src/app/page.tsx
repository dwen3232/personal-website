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
          <EmptyPage key={0} faceKey={0} />,
          <WelcomePage key={1} faceKey={1} />,
          <AboutMePage key={2} faceKey={2} />,
          <UnderConstructionPage flipDirection="left" key={3} />,
          <UnderConstructionPage flipDirection="right" key={4} />,
          <UnderConstructionPage flipDirection="left" key={5} />,
        ]}
      />
    </main>
  );
}
