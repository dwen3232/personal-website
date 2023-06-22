'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group'

function Book(props: {
  pages: React.ReactNode[]
}) {

  const [animationLock, setAnimationLock] = useState(false);
  const numPages = props.pages.length;

  return (
    <div className='bg-blue-400 h-[80vh] max-w-[80vw] aspect-[99/70] z-10
      m-auto rounded-lg border-blue-200 border-2 p-3 shadow-lg'>
        {/* PAGES */}
        <div className='pages w-full h-full relative bg-transparent'>
        {
          Array.from(Array(numPages).keys()).filter((n) => n % 2 === 0).map((n, i) =>
            <Page key={i}
                  num={n}
                  numPages={numPages}
                  front={props.pages[n]} 
                  back={n + 1 < numPages && props.pages[n+1]}
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
  numPages: number,
  front: React.ReactNode,
  back: React.ReactNode,
  lock: boolean,
  setLock: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  // console.log(`${props.pageIndex}`)

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
          style={{zIndex: props.numPages - props.num}} 
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

function Intro(props: {
  text: string
}) {
  return (<center>
    {props.text}
    <Image
      src="/next.svg"
      alt="Background"
      width={100}
      height={100}
    /> 
  </center>)
}

export default function Home() {
  
  return (
    <main className="w-screen h-screen flex">
      {/* <Image
        src="/natural-wooden-background.jpg"
        alt="Background"
        fill
      /> */}
      <Book
        pages={[
          <Intro key={0} text='Title'/>,
          <Intro key={1} text='Page 1'/>,
          <Intro key={2} text='Page 2'/>,
          <Intro key={3} text='Page 3'/>,
          <Intro key={4} text='Page 4'/>,
          <Intro key={5} text='Page 5'/>,
          <Intro key={6} text='Page 6'/>,
          <Intro key={7} text='Page 7'/>,
          <Intro key={8} text='Page 8'/>,
          <Intro key={9} text='Page 9'/>,
        ]}
      />
      
    </main>
  )
}
