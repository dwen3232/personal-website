import Image from 'next/image';
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import { ShowAnimationContext } from "./Book"
import { useContext } from "react"

function WelcomePage(props: {
  faceKey: number
}) {
  const animation = useContext(ShowAnimationContext)[props.faceKey]

  // TODO: refactor all these cards into some abstraction
  const pageCover = (
    <div className="absolute bg-orange-300 w-[87.5%] h-[91.5%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
  );

  const greetingCard = (
    <div className="flex flex-col bg-yellow-50 shadow-lg absolute w-[51%] h-[28%] left-[2.5%] top-[11%] px-8 py-14 rotate-1">
      <RoughNotationGroup show={animation}>
          <h1 className="text-3xl">
              {"Hi, I'm "}
              <RoughNotation type="box" color="LightSkyBlue" strokeWidth={2} iterations={1} order={"1"}>
                  {/* <span className="text-3xl"> */}
                      {"David"}
                  {/* </span> */}
              </RoughNotation>

          </h1>
          <br/>

          {/* // TODO: Make this all highlight at same time */}
          <span>
              <RoughNotation type="highlight" color="Thistle" order={"2"}>machine learning</RoughNotation> engineer
          </span>
          <span>
              <RoughNotation type="highlight" color="LightGreen" order={"2"}>backend</RoughNotation> developer
          </span>
          <span>
              <RoughNotation type="highlight" color="Gold" order={"2"}>math</RoughNotation> nerd
          </span>
      </RoughNotationGroup>
    </div>
  );
  
  const aboutMeCard = (
    <div className="flex flex-col absolute shadow-sm bg-yellow-50 w-[40%] h-[28%] left-[57%] top-[38%] p-4">
      <RoughNotationGroup show={animation}>
          <span className="text-sm">
              {" - machine learning engineer at "}
              <RoughNotation type="highlight" color="Thistle" padding={2}>UKG</RoughNotation>
          </span>
          <span className="text-sm">
              {" - "}
              <RoughNotation type="highlight" color="LightGreen" padding={2}>{"georgia tech "}</RoughNotation>
                {"class of 2023"}
          </span>
          <span className="text-sm">
              {" - BS in "}
              <RoughNotation type="highlight" color="Gold">math</RoughNotation> 
              {" and "} 
              <RoughNotation type="highlight" color="Gold">comp sci</RoughNotation>
          </span>
      </RoughNotationGroup>
    </div>
  );

  const backgroundTextCard = (
    <div className="absolute bg-yellow-100 w-[60%] h-[28%] left-[33%] top-[64%] shadow-sm p-4 text-xs">
      {"i'm a ramblin' wreck from georgia tech and a hell of an engineer a helluva', helluva helluva helluva helluva engineer like all the jolly good fellows i drink my whiskey clear i'm a ramblin' wreck from georgia tech and a hell of an engineer oh, if i had a daughter sir, i'd dress her in white and gold and put her on the campus, sir, to cheer on the brave and bold and if i had a son, sir, i'd tell you what he'd do he would yell “to hell with georgia” like his daddy used to do oh, i wish i had a barrel of rum and sugar three thousand pounds a college bell to put it in and a clapper to stir it around i'd drink to all the good fellows who come from far and near i'm a ramblin' gamblin' hell of an engineer! hey!"}
    </div>
  );

  const quoteCard = (
    <div className="absolute bg-yellow-50 w-[43%] h-[15%] left-[7%] top-[80%] p-4 text-sm flex flex-col">
      <span>{"\"The soul becomes dyed with the colour of its thoughts.\""}</span>
      <span>{" - Marcus Aurelius"}</span>
    </div>
  );

  const skylineImage = (
    <div className="absolute w-[42%] h-[36.4%] left-[54.5%] top-[5%] -rotate-1 shadow-md">
      <Image src="/atlanta-skyline-photo.png" alt="sample" fill/>
    </div>
  );

  const beachImage = (
    <div className="absolute w-[45%] h-[38%] left-[25%] top-[50%] rotate-3 shadow-md">
      <Image src="/sea-shore-photo.png" alt="sample" fill/>
    </div>
  );

  const macbookSticker = (
    <div className="absolute w-[31%] aspect-square left-[68%] top-[50%]">
      <Image src="/macbook-sticker.png" alt="sample" fill/>
    </div>
  )

  const moneyplantSticker = (
    <div className="absolute w-[26%] aspect-square left-[3%] top-[64%]">
      <Image src="/money-plant-sticker.png" alt="sample" fill/>
    </div>
  )

  return (
    <div className="relative w-full h-full">
        {pageCover}
        {greetingCard}
        
        {backgroundTextCard}
        {skylineImage}
        {aboutMeCard}
        {beachImage}
        {macbookSticker}
        {quoteCard}
        {moneyplantSticker}
    </div>
      
  )
}

export default WelcomePage;