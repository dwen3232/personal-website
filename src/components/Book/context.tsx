import { createContext } from "react";

interface BookStateInterface {
  numFaces: number;
  numPages: number;
  currentPage: number;
  animationLock: boolean;
  incrementPage(): void;
  decrementPage(): void;
  isFaceVisible(page: number): boolean;
}

const BookStateContext = createContext<BookStateInterface>({
  numFaces: 0,
  numPages: 0,
  currentPage: 0,
  animationLock: false,
  incrementPage: () => {},
  decrementPage: () => {},
  isFaceVisible: (_) => false,
});

export { BookStateContext };
