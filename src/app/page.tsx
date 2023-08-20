'use client';
import Image from 'next/image';
import Book from '@/components/Book';


import { RoughNotation, RoughNotationGroup } from "react-rough-notation";


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


function FirstPage() {


  return (
    <center>
      <RoughNotation type="underline" show={true}>
        Hello RoughNotation
      </RoughNotation>

    </center>
  )
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
        faces={[
          <Intro key={0} text='Title'/>,
          // <Intro key={1} text='Page 1'/>,
          <FirstPage key={1} />,
          <Intro key={2} text='Page 2'/>,
          <Intro key={3} text='Page 3'/>,
        ]}
      />
      
    </main>
  )
}
