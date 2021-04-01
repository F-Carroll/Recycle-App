const itemsReducer = (state = [], action) => {
    switch (action.type) {
      case "setItems":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default itemsReducer;
  