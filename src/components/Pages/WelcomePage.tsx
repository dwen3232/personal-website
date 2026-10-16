"use client";

import { Entry, Pin, Polaroid, RouteSegment, Stamp, Tape } from "../Scrapbook";
import { useFaceVisibility } from "../Shell";

const ROUTE = "M12 30 C11 40 26 43 50 42 S88 44 84 62 C80 72 40 66 24 72 S10 84 16 86";

function WelcomePage(props: { faceKey: number }) {
  const { isFaceVisible } = useFaceVisibility();
  const visible = isFaceVisible(props.faceKey);

  return (
    <div className="relative h-full w-full overflow-hidden font-hand text-ink">
      <div className="absolute right-[4%] top-[5%] flex flex-col items-end gap-[1.4cqw]">
        <h1 className="m-0 whitespace-nowrap font-title text-[10.8cqw] font-bold leading-none tracking-[0.06em]">
          {"Hello, I'm"}
        </h1>
        <div className="h-[0.32cqw] w-[72cqw] rounded-full bg-ink" />
      </div>

      <RouteSegment d={ROUTE} drawn={visible} />
      <Pin left="12%" top="30%" />
      <Pin left="84%" top="62%" />
      <Pin left="16%" top="86%" />

      <Entry
        className="absolute left-[17%] top-[22%] w-[44%]"
        label="start here"
        title="Hi, I'm David"
        items={["machine learning engineer", "backend developer", "math nerd"]}
      />

      <Polaroid
        src="/headshot-photo.jpg"
        alt="David Wen"
        focus="center 30%"
        className="left-[64%] top-[18%] h-[27%] w-[27%] rotate-3"
      />
      <Tape className="left-[70%] top-[16%] w-[12%] -rotate-[5deg]" />

      <Entry
        className="absolute left-[38%] top-[47%] w-[42%] text-right"
        label="atlanta, ga"
        title="Georgia Tech, 2023"
      />
      <div className="absolute left-[38%] top-[57%] w-[42%] text-right text-[2.8cqw]">
        B.S. in math and cs
      </div>

      <Polaroid
        src="/atlanta-skyline-photo.jpg"
        alt="Atlanta skyline"
        className="left-[8%] top-[44%] h-[22%] w-[24%] -rotate-3"
      />
      <Tape className="left-[13%] top-[42%] w-[11%] rotate-3" />

      <Entry
        className="absolute left-[21%] top-[80%] w-[50%]"
        label="current stop"
        title="mle & swe at LAHZO"
      />

      <Stamp variant="ring" className="left-[72%] top-[74%] w-[17%] -rotate-12">
        ATL
        <br />
        {"— 2023 —"}
        <br />
        GT
      </Stamp>
    </div>
  );
}

export default WelcomePage;
