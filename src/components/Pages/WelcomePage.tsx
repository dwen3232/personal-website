"use client";

import { Entry, Pin, Polaroid, RouteSegment, Stamp, Tape } from "../Scrapbook";
import { useFaceVisibility } from "../Shell";

/** Route through the three stops, in the face's 0-100 space, for each page shape */
const ROUTE_SPREAD = "M12 30 C11 40 26 43 50 42 S88 44 84 62 C80 72 40 66 24 72 S10 84 16 86";
const ROUTE_TALL = "M14 33 C14 39 30 40 44 43 S60 47 60 50 C60 55 82 57 80 63 C78 70 44 73 36 79 S16 85 18 90";

function WelcomePage(props: { faceKey: number }) {
  const { isFaceVisible } = useFaceVisibility();
  const visible = isFaceVisible(props.faceKey);

  return (
    <div className="relative h-full w-full overflow-hidden font-hand text-ink">
      <div className="absolute right-[4%] top-[5%] flex flex-col items-end gap-[1.4cqw] tall:left-[8%] tall:right-auto tall:top-[2.5%] tall:items-start">
        <h1 className="m-0 whitespace-nowrap font-title text-[10.8cqw] font-bold leading-none tracking-[0.06em] tall:text-[12cqw]">
          {"Hello, I'm"}
          <span className="block spread:hidden">David Wen</span>
        </h1>
        <div className="h-[0.32cqw] w-[72cqw] rounded-full bg-ink tall:h-[0.5cqw] tall:w-[60cqw]" />
      </div>

      <RouteSegment d={ROUTE_SPREAD} drawn={visible} className="tall:hidden" />
      <RouteSegment d={ROUTE_TALL} drawn={visible} className="spread:hidden" />
      <Pin className="left-[12%] top-[30%] tall:left-[14%] tall:top-[33%]" />
      <Pin className="left-[84%] top-[62%] tall:left-[80%] tall:top-[63%]" />
      <Pin className="left-[16%] top-[86%] tall:left-[18%] tall:top-[90%]" />

      <Entry
        className="absolute left-[17%] top-[22%] w-[44%] tall:left-[21%] tall:top-[30.2%] tall:w-[74%]"
        label="start here"
        title="Hi, I'm David"
        items={["machine learning engineer", "backend developer", "math nerd"]}
      />

      <Polaroid
        src="/headshot-photo.jpg"
        alt="David Wen"
        focus="center 30%"
        className="left-[64%] top-[18%] h-[27%] w-[27%] rotate-3 tall:left-[38%] tall:top-[12%] tall:h-[16.5%] tall:w-[52%]"
      />
      <Tape className="left-[70%] top-[16%] w-[12%] -rotate-[5deg] tall:left-[52%] tall:top-[11.2%] tall:w-[24%]" />

      <div className="absolute left-[38%] top-[47%] w-[42%] text-right tall:left-[8%] tall:top-[57.5%] tall:w-[64%]">
        <Entry label="atlanta, ga" title="Georgia Tech, 2023" />
        <div className="mt-[1.6cqw] text-[2.8cqw] tall:mt-0 tall:text-[4.3cqw]">B.S. in math and cs</div>
      </div>

      <Polaroid
        src="/atlanta-skyline-photo.jpg"
        alt="Atlanta skyline"
        className="left-[8%] top-[44%] h-[22%] w-[24%] -rotate-3 tall:left-[50%] tall:top-[69%] tall:h-[11%] tall:w-[42%]"
      />
      <Tape className="left-[13%] top-[42%] w-[11%] rotate-3 tall:left-[60%] tall:top-[68.2%] tall:w-[20%]" />

      <Entry
        className="absolute left-[21%] top-[80%] w-[50%] tall:left-[24.5%] tall:top-[87.6%] tall:w-[70%]"
        label="current stop"
        title="mle & swe at LAHZO"
      />

      <Stamp
        variant="ring"
        className="left-[72%] top-[74%] w-[17%] -rotate-12 tall:left-[10%] tall:top-[67%] tall:w-[28%]"
      >
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
