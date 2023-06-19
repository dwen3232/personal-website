'use client';
import Image from 'next/image';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useState } from 'react';
// import anime from 'animejs';

export default function Home() {
  const [pageIndex, setPageIndex] = useState(false)

  // TODO: fix onClick
  const flipPage = () => {
    console.log(pageIndex);
    setPageIndex(!pageIndex);
  }
    
  return (
    <main className="w-screen h-screen flex">
      {/* <Image
        src="/natural-wooden-background.jpg"
        alt="Background"
        fill
      /> */}
      {/* BOOK */}
      <div className='bg-blue-200 h-[80vh] max-w-[80vw] aspect-[16/9] z-10
      m-auto rounded-lg border-solid border-black border-2 p-3 peer-placeholder-shown:'>
        {/* PAGES */}
        <div className='pages w-full h-full relative bg-transparent'>
          {/* PAGE 1 */}
          <div className='paper-color w-1/2 h-full absolute top-0 left-0'>
            <center>Page 1</center>
          </div>
          {/* PAGE 2 and 3*/}
          <div className={`flip-page w-1/2 h-full absolute top-0 right-0 z-[1]
            ${pageIndex ? 'is-flipped': ''}`} onClick={flipPage}>
            <div className={`front paper-color absolute w-full h-full`} >
              <center>Page 2
                <Image src={"vercel.svg"} width="100" height="100" alt="Picture"/>
              </center>
            </div>
            <div className={`back paper-color absolute w-full h-full`}>
              <center>
                Page 3
                <Image src={"next.svg"} width="100" height="100" alt="Picture"/>  
              </center>
            </div>
          </div>
          {/* PAGE 4 and 5*/}
          <div className='bg-orange-400 w-1/2 h-full absolute top-0 right-0'>
            <center>Page 4</center>
          </div>
          {/* <div className={`flip-page w-1/2 h-full absolute top-0 right-0
            ${pageIndex ? 'is-flipped': ''}`} onClick={flipPage}>
            <div className={`front bg-red-50 absolute w-full h-full`} >
              <p>Page 4</p>

            </div>
            <div className={`back bg-purple-50 absolute w-full h-full`}>
              <p>Page 5</p>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  )
}
