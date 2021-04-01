const selectedLocationReducer = (state = [], action) => {
    switch (action.type) {
      case "setSelectedLocation":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default selectedLocationReducer;
  