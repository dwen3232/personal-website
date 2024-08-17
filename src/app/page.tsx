import Image from "next/image";
import Book from "@/components/Book/Book";

import WelcomePage from "@/components/WelcomePage";
import AboutMePage from "@/components/AboutMePage";

function Intro(props: { text: string }) {
  return <center>{props.text}</center>;
}

function Empty() {
  return <div></div>;
}

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
          <Intro key={0} text="" />,
          <WelcomePage key={1} faceKey={1} />,
          <AboutMePage key={2} faceKey={2} />,
          <WelcomePage key={3} faceKey={3} />,
          <AboutMePage key={4} faceKey={4} />,
          <Empty key={3} />,
        ]}
      />
    </main>
  );
}
