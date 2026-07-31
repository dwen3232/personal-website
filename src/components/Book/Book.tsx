"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { BookStateContext } from "./context";
import Page from "./Page";
import { FLIP_DURATION_MS } from "./constants";

/** Minimum horizontal drag distance, in px, before a touch gesture counts as a swipe */
const SWIPE_THRESHOLD_PX = 50;

function Book(props: {
  /** Faces to be displayed within each Book's Page, each Page displays two faces */
  faces: React.ReactNode[];
}) {
  const numFaces: number = props.faces.length;
  const numPages: number = numFaces / 2;

  /** Boolean that controls animation, true if an animation is underway, false otherwise */
  const [animationLock, setAnimationLock] = useState<boolean>(false);

  /** Number controlling which page is being shown on the right side of the book, if equal to numPages, no page on the right side */
  const [currentPage, setCurrentPage] = useState<number>(0);

  /** Controls which pages will display their animations and when they will */
  const [faceVisiblityFlags, setVisibilityFlags] = useState<boolean[]>(
    Array(numFaces).fill(false)
  );

  /** Function that increments currentPage only if animationLock is available */
  const incrementPage = useCallback(() => {
    console.log(`incrementPage`);
    if (!animationLock) {
      setAnimationLock(true);
      setCurrentPage((currentPage) =>
        currentPage < numPages ? currentPage + 1 : currentPage
      );
    }
  }, [animationLock, numPages, setAnimationLock, setCurrentPage]);

  /** Function that decrements currentPage only if animationLock is available */
  const decrementPage = useCallback(() => {
    console.log(`decrementPage`);
    if (!animationLock) {
      setAnimationLock(true);
      setCurrentPage((currentPage) =>
        currentPage > 0 ? currentPage - 1 : currentPage
      );
    }
  }, [animationLock, setAnimationLock, setCurrentPage]);

  /** Function that releases the animation lock */
  const releasePageTransitionLock = useCallback(() => {
    console.log("release animation lock");
    setAnimationLock(false);
  }, [setAnimationLock]);

  /** Used for updating whether a face is visible */
  const updateVisibilityFlags = useCallback(() => {
    let newState = Array(numFaces).fill(false);
    if (2 * currentPage < numFaces) {
      newState[2 * currentPage] = true;
    }
    if (2 * currentPage - 1 >= 0) {
      newState[2 * currentPage - 1] = true;
    }
    setVisibilityFlags(newState);
  }, [currentPage, numFaces, setVisibilityFlags]);

  /** Returns whether a face is visible */
  const isFaceVisible = useCallback(
    (face: number) => {
      return faceVisiblityFlags[face];
    },
    [faceVisiblityFlags]
  );

  /** Immediately flip to Page 1 */
  useEffect(() => {
    console.log("Triggered initial page flip");
    setCurrentPage((currentPage) =>
      currentPage === 0 ? currentPage + 1 : currentPage
    );
  }, [setCurrentPage]);

  /** Arrow-key navigation */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        decrementPage();
      } else if (event.key === "ArrowRight") {
        incrementPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [incrementPage, decrementPage]);

  /** Swipe navigation */
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartXRef.current = event.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const touchStartX = touchStartXRef.current;
      touchStartXRef.current = null;
      if (touchStartX === null) return;

      const deltaX = event.changedTouches[0].clientX - touchStartX;
      if (deltaX <= -SWIPE_THRESHOLD_PX) {
        incrementPage();
      } else if (deltaX >= SWIPE_THRESHOLD_PX) {
        decrementPage();
      }
    },
    [incrementPage, decrementPage]
  );

  return (
    // TODO: find the best way to size this
    <div
      className="z-10 m-auto aspect-[99/70] w-[95vmin] rounded-lg bg-blue-400 p-3 shadow-2xl"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="pages relative h-full w-full bg-transparent"
        style={{ "--flip-duration": `${FLIP_DURATION_MS}ms` } as React.CSSProperties}
      >
        <BookStateContext.Provider
          value={{
            numFaces,
            numPages,
            currentPage,
            animationLock,
            incrementPage,
            decrementPage,
            isFaceVisible,
          }}
        >
          {Array.from(Array(numPages).keys()).map((n, _) => (
            <Page
              key={n}
              num={n}
              front={props.faces[2 * n]}
              back={n + 1 < numFaces && props.faces[2 * n + 1]}
              releasePageTransitionLock={releasePageTransitionLock}
              updateVisibilityFlags={updateVisibilityFlags}
            />
          ))}
        </BookStateContext.Provider>
      </div>
    </div>
  );
}

export default Book;
