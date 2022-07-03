import { createContext, useEffect, useReducer } from "react";
import CartReducer from "./CartReducer";

const INITIAL_STATE = {
  cartProducts: JSON.parse(localStorage.getItem("cartproducts")) || [],
};

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("cartproducts", JSON.stringify(state.cartProducts));
  }, [state.cartProducts]);

  return (
    <CartContext.Provider value={{ cartProducts: state.cartProducts, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
