"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { BookStateContext } from "./context";
import {
  FaceVisibilityContext,
  currentHashSlug,
  faceIndexForSlug,
  replaceHashSlug,
  useActiveShell,
  type FaceSpec,
} from "../Shell";
import Page from "./Page";
import { FLIP_DURATION_MS } from "./constants";

/** Minimum horizontal drag distance, in px, before a touch gesture counts as a swipe */
const SWIPE_THRESHOLD_PX = 50;

/** The page that shows face `k`: front faces sit on the right of page k/2, back faces on the left of the next one */
const pageForFace = (k: number) => Math.ceil(k / 2);

function Book(props: {
  /** Faces to be displayed within each Book's Page, each Page displays two faces */
  faces: FaceSpec[];
}) {
  /** Both shells are in the DOM; only the visible one listens for input and auto-flips */
  const active = useActiveShell() === "book";
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

  /** Page for the face named in the URL hash, or null */
  const pageForHash = useCallback(() => {
    const k = faceIndexForSlug(props.faces, currentHashSlug());
    return k < 0 ? null : pageForFace(k);
  }, [props.faces]);

  /** Flip open as soon as the book is on screen: to the face in the URL hash, else Page 1 */
  useEffect(() => {
    if (!active) return;
    console.log("Triggered initial page flip");
    const target = Math.max(1, pageForHash() ?? 1);
    setCurrentPage((currentPage) => (currentPage === 0 ? target : currentPage));
  }, [active, pageForHash, setCurrentPage]);

  /** Follow in-page links and back/forward to a different face */
  useEffect(() => {
    if (!active) return;
    const handleHashChange = () => {
      const target = pageForHash();
      if (target === null || target === currentPage || animationLock) return;
      setAnimationLock(true);
      setCurrentPage(target);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [active, animationLock, currentPage, pageForHash]);

  /** Keep the URL hash pointing at the open spread; the first spread is the bare URL */
  useEffect(() => {
    if (!active || currentPage === 0) return;
    const onScreen = [props.faces[2 * currentPage - 1], props.faces[2 * currentPage]];
    const hashSlug = currentHashSlug();
    if (hashSlug && onScreen.some((face) => face?.slug === hashSlug)) return;
    const slug = currentPage === 1 ? null : onScreen.find((face) => face?.slug)?.slug ?? null;
    replaceHashSlug(slug);
  }, [active, currentPage, props.faces]);

  /** Arrow-key navigation */
  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        decrementPage();
      } else if (event.key === "ArrowRight") {
        incrementPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, incrementPage, decrementPage]);

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
      className="book-cover z-10 m-auto aspect-[99/70] w-[min(94vw,127vh)] rounded-[1.2%/1.7%] p-[1.8%]"
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
          }}
        >
          <FaceVisibilityContext.Provider value={{ isFaceVisible }}>
            {Array.from(Array(numPages).keys()).map((n, _) => {
              const front = props.faces[2 * n];
              const back = props.faces[2 * n + 1];
              return (
                <Page
                  key={n}
                  num={n}
                  front={front.node}
                  back={back?.node}
                  frontArrow={!front.filler}
                  backArrow={!!back && !back.filler && !front.filler}
                  releasePageTransitionLock={releasePageTransitionLock}
                  updateVisibilityFlags={updateVisibilityFlags}
                />
              );
            })}
          </FaceVisibilityContext.Provider>
        </BookStateContext.Provider>
      </div>
      <div aria-hidden="true" className="book-ribbon absolute bottom-[-5%] left-[49.4%] z-[-1] h-[10%] w-[1.4%]" />
      <div aria-hidden="true" className="book-elastic absolute bottom-[-2.5%] right-[0.4%] top-[-2.5%] z-20 w-[1%] rounded-sm" />
    </div>
  );
}

export default Book;
