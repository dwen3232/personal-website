import type { ReactNode } from "react";

/** One face of content, as given to a shell. */
export interface FaceSpec {
  node: ReactNode;
  /** Exists only to pad the book's page pairing; shells may skip it and it gets no flip arrow */
  filler?: boolean;
  /** Shown in the Book only, e.g. placeholder pages */
  bookOnly?: boolean;
  /** Width / height of this face's sheet in the ScrollSheet. Defaults to 0.5 */
  tallAspect?: number;
}
