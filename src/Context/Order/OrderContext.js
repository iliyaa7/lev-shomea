//Write new

// import { createContext, useEffect, useReducer } from "react";
// import CartReducer from "./CartReducer";

// const INITIAL_STATE = {
//   order: {},
// };

// export const OrderContext = createContext();

// export const OrderContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);

//   useEffect(() => {
//     localStorage.setItem("cartproducts", JSON.stringify(state.cartProducts));
//   }, [state.cartProducts]);

//   return (
//     <OrderContext.Provider value={{ cartProducts: state.cartProducts, dispatch }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };
