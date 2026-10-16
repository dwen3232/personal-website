import type { ReactNode } from "react";

/** One face of content, as given to a shell. */
export interface FaceSpec {
  node: ReactNode;
  /** Exists only to pad the book's page pairing; shells may skip it and it gets no flip arrow */
  filler?: boolean;
}
