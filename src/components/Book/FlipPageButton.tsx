"use client";

import React from "react";
import Image from "next/image";
import { useBookContext } from "./hooks";

interface FlipPageButtonProps {
  className?: string;
  flipDirection?: "left" | "right";
}

const FlipPageButton: React.FC<FlipPageButtonProps> = ({
  className = "",
  flipDirection: direction = "left",
}) => {
  const { incrementPage, decrementPage } = useBookContext();
  const scaleX = direction === "left" ? "-scale-x-100" : "";
  const location = direction === "left" ? "left-[8%]" : "right-[8%]";
  const onClick = direction === "left" ? decrementPage : incrementPage;

  return (
    <div
      className={`absolute top-[88%] aspect-[1.2] w-[12%] ${location} ${scaleX} ${className}`.trim()}
    >
      <Image
        src="/drawn-arrow-icon.png"
        alt="Drawn Arrow"
        onClick={onClick}
        fill
      />
    </div>
  );
};

export default FlipPageButton;
