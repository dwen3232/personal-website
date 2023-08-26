import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import { ShowAnimationContext } from "./Book"
import { useContext } from "react"

function WelcomePage(props: {
    faceKey: number
  }) {
    const animation = useContext(ShowAnimationContext)[props.faceKey]


    return (
        <div className="relative w-full h-full">
            {/** Page Cover */}
            <div className="absolute bg-orange-300 w-[87.5%] h-[91.5%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
            {/** Greeting Card */}
            <div className="flex flex-col bg-yellow-50 shadow-lg absolute w-[51%] h-[28%] left-[2.5%] top-[11%] p-4">
                <RoughNotationGroup show={animation}>
                    <span>
                        {"Hi, Im "}
                        <RoughNotation type="circle" color="blue">{"David"}</RoughNotation>

                    </span>
                    <span>
                        <RoughNotation type="highlight" color="yellow">backend</RoughNotation> developer
                    </span>
                    <span>
                        <RoughNotation type="underline" color="purple">machine learning</RoughNotation> engineer
                    </span>
                </RoughNotationGroup>
                {/* <span>{"Hi, I'm David"}</span>
                <span>{"backend developer"}</span>
                <span>{"frontend amateur"}</span>
                <span>{"math enthusiast"}</span> */}
            </div>
        </div>
        
    )
  }

export default WelcomePage;