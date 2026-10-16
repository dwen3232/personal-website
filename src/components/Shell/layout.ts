"use client";

import { useSyncExternalStore } from "react";

/**
 * Screens matching this get the Book; everything else gets the PageTurn.
 * Keep in sync with the `.shell-book` / `.shell-turn` rules in globals.css,
 * which decide visibility before any JavaScript runs.
 */
export const BOOK_LAYOUT_QUERY = "(min-width: 900px) and (min-aspect-ratio: 5/4)";

export type ShellName = "book" | "turn";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(BOOK_LAYOUT_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Which shell is on screen. `null` during prerender and hydration, so the static HTML
 * never depends on it; shells use it only to gate listeners and animations.
 */
export function useActiveShell(): ShellName | null {
  return useSyncExternalStore(
    subscribe,
    () => (window.matchMedia(BOOK_LAYOUT_QUERY).matches ? "book" : "turn"),
    () => null
  );
}
