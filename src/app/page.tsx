import Image from "next/image";
import Book, { ShowAnimationContext } from "@/components/Book";

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
          // <Intro key={1} text='Page 1'/>,
          <WelcomePage key={1} faceKey={1} />,
          <AboutMePage key={2} faceKey={2} />,
          <Empty key={3} />,
        ]}
      />
    </main>
  );
}
