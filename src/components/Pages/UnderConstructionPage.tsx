import React from "react";
import FlipPageButton from "../Book/FlipPageButton";

interface UnderConstructionProps {
  flipDirection?: "left" | "right";
  message?: string;
  icon?: React.ReactNode;
}

const UnderConstructionPage: React.FC<UnderConstructionProps> = ({
  flipDirection = "left",
  message = "This page is under construction",
  icon = "🚧",
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="text-8xl">{icon}</div>
      <p className="text-2xl">{message}</p>
      <FlipPageButton flipDirection={flipDirection} />
    </div>
  );
};

export default UnderConstructionPage;
