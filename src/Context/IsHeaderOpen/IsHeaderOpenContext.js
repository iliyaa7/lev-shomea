import { createContext, useReducer } from "react";
import isHeaderOpenReducer from "./IsHeaderOpenReducer";

const INITIAL_STATE = {
  isHeaderOpen: false,
};

export const IsHeaderOpenContext = createContext();

export const IsHeaderOpenProvider = ({ children }) => {
  const [state, dispatchHeader] = useReducer(isHeaderOpenReducer, INITIAL_STATE);
  return (
    <IsHeaderOpenContext.Provider value={{ isHeaderOpen: state.isHeaderOpen, dispatchHeader }}>
      {children}
    </IsHeaderOpenContext.Provider>
  );
};
