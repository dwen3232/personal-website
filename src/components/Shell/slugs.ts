import type { FaceSpec } from "./types";

/** The slug in the current URL hash, or null */
export function currentHashSlug(): string | null {
  const slug = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  return slug || null;
}

/** Index of the face with this slug, or -1 */
export function faceIndexForSlug(faces: FaceSpec[], slug: string | null): number {
  return slug ? faces.findIndex((face) => face.slug === slug) : -1;
}

/** Point the URL hash at `slug` (or clear it) without adding a history entry */
export function replaceHashSlug(slug: string | null) {
  if (slug === currentHashSlug()) return;
  const { pathname, search } = window.location;
  window.history.replaceState(window.history.state, "", slug ? `#${slug}` : pathname + search);
}
