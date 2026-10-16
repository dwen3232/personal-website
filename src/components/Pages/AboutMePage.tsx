"use client";

import Link from "next/link";
import { Entry, LineIcon, Polaroid, Stamp, Tape } from "../Scrapbook";
import type { LineIconName } from "../Scrapbook/LineIcon";

const PACKED: { icon: LineIconName; label: string }[] = [
  { icon: "knight", label: "chess set" },
  { icon: "gamepad", label: "a controller" },
  { icon: "dumbbell", label: "gym bag" },
  { icon: "rocket", label: "a sci-fi paperback" },
];

const LINK_CLASS = "underline decoration-rust decoration-[0.3cqw] underline-offset-[0.7cqw]";

const TITLE_CLASS = "whitespace-nowrap font-title font-bold leading-none tracking-[0.06em]";

function AboutMePage(props: { faceKey: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden font-hand text-ink">
      {/* On a spread this finishes the title begun on the facing page */}
      <div className="absolute left-[4%] top-[5%] flex flex-col items-start gap-[1.4cqw] tall:hidden">
        <div className={`${TITLE_CLASS} text-[10.8cqw]`}>David Wen</div>
        <div className="h-[0.32cqw] w-[72cqw] rounded-full bg-ink" />
      </div>
      <h2 className={`${TITLE_CLASS} absolute left-[8%] top-[4%] m-0 text-[11cqw] spread:hidden`}>About me</h2>

      <div className="absolute left-[10%] top-[23%] w-[52%] tall:left-[8%] tall:top-[12.5%] tall:w-[84%]">
        <Entry title="About me" className="tall:hidden" />
        <p className="m-0 mt-[0.8cqw] text-[2.85cqw] leading-[1.6] tall:text-[4.4cqw]">
          {"I'm a tech and math enthusiast who loves learning new things."}
        </p>
      </div>

      <Polaroid
        src="/sea-shore-photo.jpg"
        alt="The sea from the shore"
        className="left-[67%] top-[20%] h-[30%] w-[25%] -rotate-[2.5deg] tall:left-[8%] tall:top-[28%] tall:h-[24%] tall:w-[46%]"
      />
      <Tape className="left-[72%] top-[18%] w-[12%] rotate-6 tall:left-[18%] tall:top-[26.5%] tall:w-[22%]" />

      <div className="absolute left-[10%] top-[51%] w-[50%] tall:left-[8%] tall:top-[57%] tall:w-[84%]">
        <div className="font-title text-[4.6cqw] font-bold leading-none tracking-[0.08em] text-rust tall:text-[6cqw]">
          packed for the trip
        </div>
        <ul className="m-0 mt-[2cqw] grid list-none grid-cols-[7cqw_1fr] items-center gap-x-[2.4cqw] gap-y-[1.8cqw] p-0 text-[2.9cqw] tall:grid-cols-[9cqw_1fr] tall:gap-y-[2.6cqw] tall:text-[4.3cqw]">
          {PACKED.map(({ icon, label }) => (
            <li key={label} className="contents">
              <LineIcon name={icon} className="h-[5cqw] w-[6.8cqw] tall:h-[6.5cqw] tall:w-[8.5cqw]" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <Stamp
        variant="box"
        className="left-[62%] top-[58%] w-[30%] rotate-[4deg] tall:left-[59%] tall:top-[32%] tall:w-[34%]"
      >
        NEXT STOPS
        <br />
        {"→ projects"}
        <br />
        {"→ a blog?"}
      </Stamp>

      <div className="absolute left-[10%] top-[86%] text-[3cqw] tall:left-[8%] tall:top-[88%] tall:text-[4.4cqw]">
        {"send a postcard "}
        <span className="text-rust">{"→"}</span>{" "}
        <Link className={LINK_CLASS} href="https://www.linkedin.com/in/davidrwen/" rel="noopener noreferrer" target="_blank">
          linkedin
        </Link>
        {" · "}
        <Link className={LINK_CLASS} href="https://github.com/dwen3232" rel="noopener noreferrer" target="_blank">
          github
        </Link>
      </div>
    </div>
  );
}

export default AboutMePage;
