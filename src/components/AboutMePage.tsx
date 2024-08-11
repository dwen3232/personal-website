"use client";
import Image from "next/image";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { ShowAnimationContext } from "./Book";
import { useContext } from "react";
import Link from "next/link";

function AboutMePage(props: { faceKey: number }) {
  const animation = useContext(ShowAnimationContext)[props.faceKey];

  // TODO: refactor all these cards into some abstraction

  const pageCover = (
    <div className="absolute left-1/2 top-1/2 h-[91.5%] w-[87.5%] -translate-x-[53%] -translate-y-[49%] transform bg-orange-200" />
  );

  const aboutMeCard = (
    <div className="absolute left-[3%] top-[28.4%] flex h-[41%] w-[57%] flex-col rounded-sm bg-[#867D53] px-[5%] py-[06%] text-white drop-shadow-md">
      <span className="text-3xl">{"About Me"}</span>
      <br />
      <span>
        {
          "I'm a tech and math enthusiast who loves learning new things. As hobbies, I enjoy chess, video games, weight lifting, and reading scifi"
        }
      </span>
      <br />
      <span>{"Stay tuned for some of my projects! And maybe a blog?"}</span>
    </div>
  );

  const seashoreImage = (
    <div className="absolute left-[54%] top-[5%] h-[36.4%] w-[42%] -rotate-1 rounded-sm drop-shadow-md">
      <Image unoptimized src="/sea-shore-photo.jpg" alt="sample" fill />
    </div>
  );

  const chessSticker = (
    <div className="absolute left-[6%] top-[5%] aspect-square w-[30%]">
      <Image src="/chess-sticker.png" alt="sample" fill />
    </div>
  );

  const linkedinIcon = (
    <Link
      className="relative h-full flex-grow"
      href="https://www.linkedin.com/in/davidrwen/"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image
        className="object-contain"
        src="/linkedin-icon.png"
        alt="LinkedIn Link"
        fill
      />
    </Link>
  );

  const githubIcon = (
    <Link
      className="relative h-full flex-grow"
      href="https://github.com/dwen3232"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image
        className="object-contain"
        src="/github-icon.png"
        alt="GitHub Link"
        fill
      />
    </Link>
  );

  const socialMediaLinks = (
    <div className="absolute left-[5%] top-[90%] flex h-[5%] w-[20%] justify-between">
      {linkedinIcon}
      {githubIcon}
    </div>
  );

  return (
    <div className="relative h-full w-full">
      {pageCover}
      {aboutMeCard}
      {seashoreImage}
      {chessSticker}
      {socialMediaLinks}
    </div>
  );
}

export default AboutMePage;
