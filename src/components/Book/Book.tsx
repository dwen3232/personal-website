"use client";

import React, { useEffect, useState } from "react";
import ShowAnimationContext from "./context";
import Page from "./Page";

function Book(props: {
  /** Faces to be displayed within each Book's Page, each Page displays two faces */
  faces: React.ReactNode[];
}) {
  const numFaces: number = props.faces.length;
  const numPages: number = numFaces / 2;

  /** Boolean that controls animation, true if an animation is underway, false otherwise */
  const [animationLock, setAnimationLock] = useState<boolean>(false);

  /** Controls which pages will display their animations and when they will */
  const [showAnimation, setShowAnimation] = useState<boolean[]>(
    Array(numFaces).fill(false)
  );

  /** Number controlling which page is being shown on the right side of the book, if equal to numPages, no page on the right side */
  const [currentPage, setCurrentPage] = useState<number>(0);

  /** Function that increments currentPage only if animationLock is available */
  const incrementPage = () => {
    console.log(`incrementPage`);
    if (!animationLock) {
      setAnimationLock(true);
      setCurrentPage((currentPage) =>
        currentPage < numPages ? currentPage + 1 : currentPage
      );
    }
  };

  /** Function that decrements currentPage only if animationLock is available */
  const decrementPage = () => {
    console.log(`decrementPage`);
    if (!animationLock) {
      setAnimationLock(true);
      setCurrentPage((currentPage) =>
        currentPage > 0 ? currentPage - 1 : currentPage
      );
    }
  };

  /** Function that releases the animation lock */
  const releaseAnimationLock = () => {
    console.log("release animation lock");
    setAnimationLock(false);
  };

  const updateShowAnimation = () => {
    let newState = Array(numFaces).fill(false);
    if (2 * currentPage < numFaces) {
      newState[2 * currentPage] = true;
    }
    if (2 * currentPage - 1 >= 0) {
      newState[2 * currentPage - 1] = true;
    }
    setShowAnimation(newState);
  };

  /** Immediately flip to Page 1 */
  useEffect(() => {
    if (currentPage === 0) {
      incrementPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(`currentPage: ${currentPage}`);

  return (
    // <div className='bg-blue-400 h-[80vh] max-w-[80vw] aspect-[99/70] z-10 m-auto rounded-lg border-blue-200 border-2 p-3 shadow-lg'>
    // TODO: find the best way to size this
    <div className="z-10 m-auto aspect-[99/70] w-[95vmin] rounded-lg bg-blue-400 p-3 shadow-2xl">
      <div className="pages relative h-full w-full bg-transparent">
        <ShowAnimationContext.Provider value={showAnimation}>
          {Array.from(Array(numPages).keys()).map((n, _) => (
            <Page
              key={n}
              num={n}
              numFaces={numFaces}
              numPages={numPages}
              front={props.faces[2 * n]}
              back={n + 1 < numFaces && props.faces[2 * n + 1]}
              currentPage={currentPage}
              incrementPage={incrementPage}
              decrementPage={decrementPage}
              releaseAnimationLock={releaseAnimationLock}
              updateShowAnimation={updateShowAnimation}
            />
          ))}
        </ShowAnimationContext.Provider>
      </div>
    </div>
  );
}

export default Book;
