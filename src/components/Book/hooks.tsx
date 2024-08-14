"use client";

import { useContext } from "react";
import ShowAnimationContext from "./context";

function useCurrentAnimation(faceKey: number) {
  const showAnimationContext = useContext(ShowAnimationContext);
  return showAnimationContext[faceKey];
}

export { useCurrentAnimation };
