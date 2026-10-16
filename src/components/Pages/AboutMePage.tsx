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

function AboutMePage(props: { faceKey: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden font-hand text-ink">
      <div className="absolute left-[4%] top-[5%] flex flex-col items-start gap-[1.4cqw]">
        <div className="whitespace-nowrap font-title text-[10.8cqw] font-bold leading-none tracking-[0.06em]">
          David Wen
        </div>
        <div className="h-[0.32cqw] w-[72cqw] rounded-full bg-ink" />
      </div>

      <div className="absolute left-[10%] top-[23%] w-[52%]">
        <Entry title="About me" />
        <p className="m-0 mt-[0.8cqw] text-[2.85cqw] leading-[1.6]">
          {"I'm a tech and math enthusiast who loves learning new things."}
        </p>
      </div>

      <Polaroid
        src="/sea-shore-photo.jpg"
        alt="The sea from the shore"
        className="left-[67%] top-[20%] h-[30%] w-[25%] -rotate-[2.5deg]"
      />
      <Tape className="left-[72%] top-[18%] w-[12%] rotate-6" />

      <div className="absolute left-[10%] top-[51%] w-[50%]">
        <div className="font-title text-[4.6cqw] font-bold leading-none tracking-[0.08em] text-rust">
          packed for the trip
        </div>
        <ul className="m-0 mt-[2cqw] grid list-none grid-cols-[7cqw_1fr] items-center gap-x-[2.4cqw] gap-y-[1.8cqw] p-0 text-[2.9cqw]">
          {PACKED.map(({ icon, label }) => (
            <li key={label} className="contents">
              <LineIcon name={icon} className="h-[5cqw] w-[6.8cqw]" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <Stamp variant="box" className="left-[62%] top-[58%] w-[30%] rotate-[4deg]">
        NEXT STOPS
        <br />
        {"→ projects"}
        <br />
        {"→ a blog?"}
      </Stamp>

      <div className="absolute left-[10%] top-[86%] text-[3cqw]">
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
