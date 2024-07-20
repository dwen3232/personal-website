import Image from "next/image";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { ShowAnimationContext } from "./Book";
import { useContext } from "react";

function AboutMePage(props: { faceKey: number }) {
  const animation = useContext(ShowAnimationContext)[props.faceKey];

  // TODO: refactor all these cards into some abstraction

  //   - size: 340, 348 (57%, 41%)
  // - left top: (3%, 28.4%)
  const aboutMeCard = (
    <div className="absolute left-[3%] top-[28.4%] flex h-[41%] w-[57%] flex-col rounded-sm bg-[#867D53] px-[5%] py-[06%] text-white drop-shadow-md">
      <span className="text-3xl">{"About Me"}</span>
      <br />
      <span>
        {
          "I'm a tech and math enthusiast who loves learning new things. As hobbies, I enjoy chess, video games, and reading scifi"
        }
      </span>
      <br />
      <span>{"Stay tuned for some of my projects! And maybe a blog?"}</span>
    </div>
  );

  // - size: 182, 168 (30%, 20%)
  // - left top: (6.5%,  4.5%)
  const chessSticker = (
    <div className="absolute left-[6%] top-[5%] aspect-square w-[30%]">
      <Image src="/chess-sticker.png" alt="sample" fill />
    </div>
  );

  return (
    <div className="relative h-full w-full">
      {aboutMeCard}
      {chessSticker}
    </div>
  );
}

export default AboutMePage;

