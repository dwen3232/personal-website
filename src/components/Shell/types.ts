import type { ReactNode } from "react";

/** One face of content, as given to a shell. */
export interface FaceSpec {
  node: ReactNode;
  /** Exists only to pad the book's page pairing; shells may skip it and it gets no flip arrow */
  filler?: boolean;
  /** Shown in the Book only, e.g. placeholder pages */
  bookOnly?: boolean;
  /** Deep-link id: `#slug` opens the Book to this face and scrolls the ScrollSheet to it */
  slug?: string;
  /** Width / height of this face's sheet in the ScrollSheet. Defaults to 0.5 */
  tallAspect?: number;
}
