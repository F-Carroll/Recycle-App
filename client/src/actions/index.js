export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const setQuery = (value) => {
  return {
    type: "setQuery",
    payload: value,
  };
};
export const setItems = (value) => {
  return {
    type: "setItems",
    payload: value,
  };
};
export const setSelectedLocation = (value) => {
  return {
    type: "setSelectedLocation",
    payload: value,
  };
};
