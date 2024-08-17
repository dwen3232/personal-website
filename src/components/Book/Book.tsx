"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BookStateContext } from "./context";
import Page from "./Page";

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

  /** Function that increments currentPage only if animationLock is available */
  const incrementPage = useCallback(() => {
    console.log(`incrementPage`);
    if (!animationLock) {
      setAnimationLock(true);
      setCurrentPage((currentPage) =>
        currentPage < numPages ? currentPage + 1 : currentPage
      );
    }
  }, [animationLock, setAnimationLock, setCurrentPage]);

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
  const releasePageTransitionLock = () => {
    console.log("release animation lock");
    setAnimationLock(false);
  };

  const isFaceVisible = useCallback(
    (face: number) => {
      if (
        !animationLock &&
        face <= 2 * currentPage &&
        face > 2 * (currentPage - 1)
      ) {
        return true;
      }
      return false;
    },
    [currentPage, numFaces, animationLock]
  );

  /** Immediately flip to Page 1 */
  useEffect(() => {
    console.log("Triggered initial page flip");
    if (currentPage === 0) {
      incrementPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incrementPage]);

  console.log(`currentPage: ${currentPage}`);

  return (
    // TODO: find the best way to size this
    <div className="z-10 m-auto aspect-[99/70] w-[95vmin] rounded-lg bg-blue-400 p-3 shadow-2xl">
      <div className="pages relative h-full w-full bg-transparent">
        <BookStateContext.Provider
          value={{
            numFaces,
            numPages,
            currentPage,
            animationLock,
            incrementPage,
            decrementPage,
            releasePageTransitionLock,
            isFaceVisible,
          }}
        >
          {Array.from(Array(numPages).keys()).map((n, _) => (
            <Page
              key={n}
              num={n}
              front={props.faces[2 * n]}
              back={n + 1 < numFaces && props.faces[2 * n + 1]}
            />
          ))}
        </BookStateContext.Provider>
      </div>
    </div>
  );
}

export default Book;
