"use client";

import Image from "next/image";
import { useBookContext } from "../Book";
import rough from "roughjs";
import { useRef } from "react";

function SkillsPage(props: { faceKey: number }) {
  const { isFaceVisible, decrementPage } = useBookContext();
  // const nodeRef = useRef<HTMLDivElement>(null);
  // const roughRef = useRef(rough.svg(nodeRef.current));

  const flipPageButton = (
    <div className="absolute left-[8%] top-[88%] aspect-[1.2] w-[12%] -scale-x-100">
      <Image
        src="/drawn-arrow-icon.png"
        alt="Drawn Arrow"
        onClick={decrementPage}
        fill
      />
    </div>
  );
  return (
    <div>
      <h1>WIP</h1>
      {flipPageButton}
    </div>
  );
}

export default SkillsPage;
