import { useContext } from "react";
import { BookStateContext } from "./context";

const useBookContext = () => {
  return useContext(BookStateContext);
};

export { useBookContext }
