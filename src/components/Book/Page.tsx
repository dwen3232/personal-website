import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

function Page(props: {
  num: number;
  numFaces: number;
  numPages: number;
  front: React.ReactNode;
  back: React.ReactNode;
  currentPage: number;
  incrementPage: { (): void };
  decrementPage: { (): void };
  releaseAnimationLock: { (): void };
  updateShowAnimation: { (): void };
}) {
  /** If page isFlipped, page is on the left side, front hidden and back showing */
  const isFlipped = props.num < props.currentPage;

  /** Refs for CSSTransition */
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  // TODO: refactor this
  const [
    incrementPage,
    decrementPage,
    releaseAnimationLock,
    updateShowAnimation,
  ] = [
    props.incrementPage,
    props.decrementPage,
    props.releaseAnimationLock,
    props.updateShowAnimation,
  ];

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
          releaseAnimationLock();
          updateShowAnimation();
        }}
      >
        <div
          ref={frontRef}
          className={`front-page absolute right-0 top-0 h-full w-1/2 rounded-r-md shadow-md`}
          style={{ zIndex: props.numFaces - props.num }}
          onClick={incrementPage}
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
          releaseAnimationLock();
          updateShowAnimation();
        }}
      >
        <div
          ref={backRef}
          className={`back-page absolute left-0 top-0 h-full w-1/2 rounded-l-md shadow-md`}
          style={{ zIndex: props.num }}
          onClick={decrementPage}
        >
          {props.back}
        </div>
      </CSSTransition>
    </>
  );
}

export default Page
