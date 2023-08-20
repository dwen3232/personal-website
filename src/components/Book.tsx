'use client';
import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group'

// TODO: couple the pages with a page number state
function Book(props: {
  faces: React.ReactNode[]
}) {

  const [animationLock, setAnimationLock] = useState(false);
  // currentPage refers to the page on the right side
  // currentPage's max val is numPages, where no pages are on the right side
  // all pages >= currentPage are flipped
  const [currentPage, setCurrentPage] = useState(0);
  const numFaces: number = props.faces.length;
  const numPages: number = numFaces / 2;

  return (
    <div className='bg-blue-400 h-[80vh] max-w-[80vw] aspect-[99/70] z-10
      m-auto rounded-lg border-blue-200 border-2 p-3 shadow-lg'>
        <div className='pages w-full h-full relative bg-transparent'>
        {
          Array.from(Array(numPages).keys()).map((n, _) => 
            <Page key={n}
                  num={n}
                  numFaces={numFaces}
                  front={props.faces[2 * n]} 
                  back={n + 1 < numFaces && props.faces[2 * n + 1]}

                  lock={animationLock}
                  setLock={setAnimationLock}
            />
          )
        }
        </div>
    </div>
  )
}


function Page(props: {
  num: number,
  numFaces: number,
  front: React.ReactNode,
  back: React.ReactNode,
  lock: boolean,
  setLock: React.Dispatch<React.SetStateAction<boolean>>
}) {
  // If page isFlipped, page is on the left side, front hidden and back showing
  const [isFlipped, setIsFlipped] = useState(false);
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);


  const incrementPage = () => {
    console.log(`incrementPage`)
    if (!props.lock) {
      props.setLock(true);
      setIsFlipped(true);
    }
  }
  const decrementPage = () => {
    console.log(`decrementPage`)
    if (!props.lock) {
      props.setLock(true);
      setIsFlipped(false);
    }
  }

  return (
    <>
      <CSSTransition nodeRef={frontRef} in={isFlipped} timeout={1500} classNames={"front-page"}
        onEntered={() => {console.log('release lock'); props.setLock(false)}}
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
        onExited={() => {console.log('release lock'); props.setLock(false)}}>
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
