'use client';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group'


export const ShowAnimationContext = createContext([] as boolean[]);

function Book(props: {
  /** Faces to be displayed within each Book's Page, each Page displays two faces */
  faces: React.ReactNode[],
}) {

  const numFaces: number = props.faces.length;
  const numPages: number = numFaces / 2;

  /** Boolean that controls animation, true if an animation is underway, false otherwise */
  const [animationLock, setAnimationLock] = useState<boolean>(false);

  /** Controls which pages will display their animations and when they will */
  const [showAnimation, setShowAnimation] = useState<boolean[]>(Array(numFaces).fill(false))


  /** Number controlling which page is being shown on the right side of the book, if equal to numPages, no page on the right side */
  const [currentPage, setCurrentPage] = useState<number>(0);

  

  /** Function that increments currentPage only if animationLock is available */
  const incrementPage = () => {
    console.log(`incrementPage`)
    if (!animationLock) {
      setAnimationLock(true);
      setCurrentPage((currentPage) => currentPage < numPages ? currentPage + 1 : currentPage);
    }
  }

  /** Function that decrements currentPage only if animationLock is available */
  const decrementPage = () => {
    console.log(`decrementPage`)
    if (!animationLock) {
      setAnimationLock(true);
      setCurrentPage((currentPage) => currentPage > 0 ? currentPage - 1 : currentPage);
    }
  }

  /** Function that releases the animation lock */
  const releaseAnimationLock = () => {
    console.log('release animation lock');
    setAnimationLock(false);
  }

  const updateShowAnimation = () => {
    var newState = Array(numFaces).fill(false);
    if (2 * currentPage < numFaces) {
      newState[2 * currentPage] = true;
    }
    if (2 * currentPage - 1 >= 0) {
      newState[2 * currentPage - 1] = true;
    }
    setShowAnimation(newState);
  }

  /** Immediately flip to Page 1 */
  useEffect(() => {
    if (currentPage === 0) {
      incrementPage()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(`currentPage: ${currentPage}`);

  return (
    // <div className='bg-blue-400 h-[80vh] max-w-[80vw] aspect-[99/70] z-10 m-auto rounded-lg border-blue-200 border-2 p-3 shadow-lg'>
    // TODO: find the best way to size this
    <div className='bg-blue-400 min-w-[80vw] aspect-[99/70] z-10 m-auto rounded-lg p-3 shadow-2xl'>
        <div className='pages w-full h-full relative bg-transparent'>
          <ShowAnimationContext.Provider value={showAnimation}>
          {
            Array.from(Array(numPages).keys()).map((n, _) => 
              <Page key={n}
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
            )
          }
          </ShowAnimationContext.Provider>
        
        </div>
    </div>
  )
}


function Page(props: {
  num: number,
  numFaces: number,
  numPages: number,
  front: React.ReactNode,
  back: React.ReactNode,
  currentPage: number,
  incrementPage: {(): void},
  decrementPage: {(): void},
  releaseAnimationLock: {(): void},
  updateShowAnimation: {(): void}
}) {
  /** If page isFlipped, page is on the left side, front hidden and back showing */
  const isFlipped = props.num < props.currentPage;

  /** Refs for CSSTransition */
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  // TODO: refactor this
  const [incrementPage, decrementPage, releaseAnimationLock, updateShowAnimation] = [
    props.incrementPage, props.decrementPage, props.releaseAnimationLock, props.updateShowAnimation];


  // The two CSSTransitions are synchronized, when one is entered, the other is exited
  // TODO: refactor to use TransitionGroup?
  return (
    <>
      <CSSTransition nodeRef={frontRef} in={isFlipped} timeout={1500} classNames={"front-page"}
        onEntered={() => {
          releaseAnimationLock();
          updateShowAnimation();
        }}
      >
        <div ref={frontRef}
          className={`front-page absolute w-1/2 h-full top-0 right-0 rounded-r-md shadow-md`}
          style={{zIndex: props.numFaces - props.num}} 
          onClick={incrementPage}
        >
          {props.front}
        </div>
      </CSSTransition>
      <CSSTransition nodeRef={backRef} in={isFlipped} timeout={1500} classNames={"back-page"}
        onExited={() => {
          releaseAnimationLock();
          updateShowAnimation();
        }}
      >
        <div 
          ref={backRef}
          className={`back-page paper-color absolute w-1/2 h-full top-0 left-0 rounded-l-md shadow-md`}
          style={{zIndex: props.num}} 
          onClick={decrementPage}
        >
          {props.back}
        </div>
      </CSSTransition>
    </>
  )
}

export default Book;
