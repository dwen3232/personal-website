'use client';
import Image from 'next/image';
import Book, { ShowAnimationContext } from '@/components/Book';


import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { useContext, useEffect, useState } from 'react';
import WelcomePage from '@/components/WelcomePage';


function Intro(props: {
  text: string
}) {
  return (<center>
    {props.text}
  </center>)
}


function AnimationPage(props: {
  faceKey: number
}) {
  const animation = useContext(ShowAnimationContext)[props.faceKey]

  return (
    <center>
      <RoughNotation type="underline" show={animation}>
        Hello RoughNotation
      </RoughNotation>

    </center>
  )
}


export default function Home() {
  // const [currentPage, setCurrentPage] = useState(0);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [])

  return (
    <main className="w-screen h-screen flex">
      <Book
        faces={[
          <Intro key={0} text='Title'/>,
          // <Intro key={1} text='Page 1'/>,
          <WelcomePage key={1} faceKey={1} />,
          <AnimationPage key={2} faceKey={2} />,
          <AnimationPage key={3} faceKey={3} />,
          <AnimationPage key={4} faceKey={4} />,
          <AnimationPage key={5} faceKey={5} />,
        ]}
      />
      
    </main>
  )
}
