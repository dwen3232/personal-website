import { useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { BookStateContext } from "./context";

function Page(props: {
  num: number;
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  const {
    currentPage,
    numFaces,
    releasePageTransitionLock,
  } = useContext(BookStateContext);
  /** If page isFlipped, page is on the left side, front hidden and back showing */
  const isFlipped = props.num < currentPage;

  /** Refs for CSSTransition */
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  // The two CSSTransitions are synchronized, when one is entered, the other is exited
  // TODO: refactor to use TransitionGroup?
  return (
    <>
      <CSSTransition
        nodeRef={frontRef}
        in={isFlipped}
        timeout={1500}
        classNames={"front-page"}
        onEntered={() => {
          releasePageTransitionLock();
          // updateShowAnimation();
        }}
      >
        <div
          ref={frontRef}
          className={`front-page absolute right-0 top-0 h-full w-1/2 rounded-r-md shadow-md`}
          style={{ zIndex: numFaces - props.num }}
        >
          {props.front}
        </div>
      </CSSTransition>
      <CSSTransition
        nodeRef={backRef}
        in={isFlipped}
        timeout={1500}
        classNames={"back-page"}
        onExited={() => {
          releasePageTransitionLock();
          // updateShowAnimation();
        }}
      >
        <div
          ref={backRef}
          className={`back-page absolute left-0 top-0 h-full w-1/2 rounded-l-md shadow-md`}
          style={{ zIndex: props.num }}
        >
          {props.back}
        </div>
      </CSSTransition>
    </>
  );
}

export default Page;
