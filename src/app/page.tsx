import Image from "next/image";
import Book from "@/components/Book/Book";

import WelcomePage from "@/components/Pages/WelcomePage";
import AboutMePage from "@/components/Pages/AboutMePage";
import Empty from "@/components/Pages/EmptyPage";
import SkillsPage from "@/components/Pages/SkillsPage";

export default function Home() {
  return (
    <main className="flex h-screen w-screen font-mono">
      <Image
        src="/natural-wooden-background.jpg"
        className="object-cover"
        alt="background"
        fetchPriority="high"
        fill
        priority
      />
      <Book
        faces={[
          <Empty key={0} faceKey={0} />,
          <WelcomePage key={1} faceKey={1} />,
          <AboutMePage key={2} faceKey={2} />,
          <SkillsPage key={3} faceKey={3} />,
          <Empty key={4} faceKey={4} />,
          <Empty key={5} faceKey={5} />,
        ]}
      />
    </main>
  );
}
