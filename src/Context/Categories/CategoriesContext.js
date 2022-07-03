import { createContext, useReducer } from "react";
import CategoriesReducer from "./CategoriesReducer";

const INITIAL_STATE = {
  categories: ["הכל"],
};

export const CategoriesContext = createContext();

export const CategoriesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CategoriesReducer, INITIAL_STATE);
  return (
    <CategoriesContext.Provider value={{ categories: state.categories, dispatch }}>
      {children}
    </CategoriesContext.Provider>
  );
};
