const IsHeaderOpenReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_ISHEADEROPEN":
      
      return { isHeaderOpen: !state.isHeaderOpen}
    default:
      return state;
  }
  };
  export default IsHeaderOpenReducer;
  