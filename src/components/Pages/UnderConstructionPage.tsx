import React from "react";

interface UnderConstructionProps {
  message?: string;
  icon?: React.ReactNode;
}

const UnderConstructionPage: React.FC<UnderConstructionProps> = ({
  message = "This page is under construction",
  icon = "🚧",
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="text-8xl">{icon}</div>
      <p className="text-2xl">{message}</p>
    </div>
  );
};

export default UnderConstructionPage;
