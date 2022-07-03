import { createContext, useReducer } from "react";
import ErrorReducer from "./ErrorReducer";

const INITIAL_STATE = {
  error: null,
};

export const ErrorContext = createContext();

export const ErrorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ErrorReducer, INITIAL_STATE);

  return (
    <ErrorContext.Provider value={{ error: state.error, dispatch }}>
      {children}
    </ErrorContext.Provider>
  );
};
