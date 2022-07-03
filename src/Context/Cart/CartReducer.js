const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { cartProducts: [...state.cartProducts, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        cartProducts: [...state.cartProducts.filter((product) => product.id !== action.payload)],
      };
    case "UPDATE_QUANTITY":
      return {
        cartProducts: [
          ...state.cartProducts.map((product) => {
            if (product.id === action.payload.id)
              action.payload.isIncrement ? product.quantity++ : product.quantity--;
            return product;
          }),
        ],
      };
    default:
      return state;
  }
};
export default CartReducer;
