"use client";
import Image from "next/image";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { ShowAnimationContext } from "./Book";
import { useContext } from "react";

function WelcomePage(props: { faceKey: number }) {
  const animation = useContext(ShowAnimationContext)[props.faceKey];

  // TODO: refactor all these cards into some abstraction
  const pageCover = (
    <div className="absolute left-1/2 top-1/2 h-[91.5%] w-[87.5%] -translate-x-1/2 -translate-y-1/2 transform bg-orange-200" />
  );

  const headshotImage = (
    <div className="absolute left-[1.5%] top-[2%] h-[39%] w-[48%] rotate-1 rounded-sm bg-orange-100 p-[3%] drop-shadow-md">
      <Image unoptimized src="/headshot-photo.jpg" alt="sample" fill />
    </div>
  );

  const greetingCard = (
    <div className="absolute left-[47%] top-[05%] flex h-[27%] w-[51%] rotate-2 flex-col rounded-sm bg-yellow-50 px-8 py-14 drop-shadow-md">
      <RoughNotationGroup show={animation}>
        <h1 className="text-3xl">
          {"Hi, I'm "}
          <RoughNotation
            type="box"
            color="LightSkyBlue"
            strokeWidth={2}
            iterations={1}
            order={"1"}
          >
            {/* <span className="text-3xl"> */}
            {"David"}
            {/* </span> */}
          </RoughNotation>
        </h1>
        <br />

        {/* // TODO: Make this all highlight at same time */}
        <span className="text-lg">
          <RoughNotation
            type="highlight"
            color="Thistle"
            padding={0}
            order={"2"}
          >
            machine learning
          </RoughNotation>{" "}
          engineer
        </span>
        <span className="text-lg">
          <RoughNotation
            type="highlight"
            color="LightGreen"
            padding={0}
            order={"2"}
          >
            backend
          </RoughNotation>{" "}
          developer
        </span>
        <span className="text-lg">
          <RoughNotation type="highlight" color="Gold" padding={0} order={"2"}>
            math
          </RoughNotation>{" "}
          nerd
        </span>
      </RoughNotationGroup>
    </div>
  );

  const aboutMeCard = (
    <div className="absolute left-[07%] top-[40%] flex h-[28%] w-[45%] -rotate-1 flex-col rounded-sm bg-yellow-50 p-4 drop-shadow-md">
      <RoughNotationGroup show={animation}>
        <span className="text-lg">
          {" - mle & swe at "}
          <RoughNotation type="highlight" color="Thistle" padding={0}>
            {"UKG"}
          </RoughNotation>
        </span>
        <span className="text-lg">
          {" - "}
          <RoughNotation type="highlight" color="LightGreen" padding={0}>
            {"georgia tech"}
          </RoughNotation>
          {" class of 2023"}
        </span>
        <span className="text-lg">
          {" - BS in "}
          <RoughNotation type="highlight" color="Gold" padding={0}>
            {"math"}
          </RoughNotation>
          {" and "}
          <RoughNotation type="highlight" color="Gold" padding={0}>
            {"cs"}
          </RoughNotation>
        </span>
      </RoughNotationGroup>
    </div>
  );

  const skylineImage = (
    <div className="absolute left-[45%] top-[55%] h-[38%] w-[45%] rotate-3 rounded-sm drop-shadow-md">
      <Image unoptimized src="/atlanta-skyline-photo.jpg" alt="sample" fill />
    </div>
  );

  const macbookSticker = (
    <div className="absolute left-[53%] top-[30%] aspect-square w-[31%]">
      <Image unoptimized src="/macbook-sticker.png" alt="sample" fill />
    </div>
  );

  const moneyplantSticker = (
    <div className="absolute left-[10%] top-[65%] aspect-square w-[30%]">
      <Image unoptimized src="/money-plant-sticker.png" alt="sample" fill />
    </div>
  );

  return (
    <div className="relative h-full w-full">
      {pageCover}
      {greetingCard}
      {aboutMeCard}
      {skylineImage}
      {headshotImage}
      {macbookSticker}
      {moneyplantSticker}
    </div>
  );
}

export default WelcomePage;
