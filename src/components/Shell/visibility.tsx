import { createContext, useContext } from "react";

/**
 * The only shell state a face may depend on. Each shell (Book, and later ScrollSheet)
 * provides its own implementation, so faces render the same in either.
 */
interface FaceVisibility {
  isFaceVisible(faceKey: number): boolean;
}

const FaceVisibilityContext = createContext<FaceVisibility>({
  isFaceVisible: () => false,
});

const useFaceVisibility = () => useContext(FaceVisibilityContext);

export { FaceVisibilityContext, useFaceVisibility };
export type { FaceVisibility };
