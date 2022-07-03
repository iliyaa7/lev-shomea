const ErrorReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        error: action.payload,
      };
    case "CLEAR":
      return {
        error: null,
      };
    default:
      return state;
  }
};
export default ErrorReducer;
