import Image from 'next/image';
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import { ShowAnimationContext } from "./Book"
import { useContext } from "react"

function AboutMePage(props: {
  faceKey: number
}) {
  const animation = useContext(ShowAnimationContext)[props.faceKey]

  // TODO: refactor all these cards into some abstraction
  
//   - size 307, 330 (51%, 39%)
// - left top: (46%, 2%)
  const headshotImage = (
    <div className="absolute bg-orange-100 w-[51%] h-[39%] left-[46%] top-[2%] rotate-2 drop-shadow-md rounded-sm p-[3%]">
      <div className="relative w-full h-full drop-shadow-md rouded-sm">
        <Image src="/headshot-photo.png" alt="sample" fill/>
      </div>
    </div>
  );

//   - size: 340, 348 (57%, 41%)
// - left top: (3%, 28.4%)
  const aboutMeCard = (
    <div className="flex flex-col absolute bg-[#867D53] text-white w-[57%] h-[41%] left-[3%] top-[28.4%] drop-shadow-md rounded-sm px-[5%] py-[10%]">
      <span className="text-3xl">
        {"About Me"}
      </span>
      <br/>
      <span className="text-sm">
        {"I love learning all things related to math and computers, whether it be statistics, pure math, computer architecture, machine learning, or even economics. I also love building things, mostly because it lets me learn more. I plan to share what I learn and build here."}
      </span>
    </div>
  )

  // - size: 182, 168 (30%, 20%)
  // - left top: (6.5%,  4.5%)
  const chessSticker = (
    <div className="absolute w-[30%] aspect-square left-[6%] top-[5%]">
      <Image src="/chess-sticker.png" alt="sample" fill/>
    </div>
  )

  return (
    <div className="relative w-full h-full">
      {aboutMeCard}
      {headshotImage}
      {chessSticker}
    </div>
      
  )
}

export default AboutMePage;