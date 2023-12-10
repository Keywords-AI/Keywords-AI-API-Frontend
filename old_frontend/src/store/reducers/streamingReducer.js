const initState = false;

const streamingReducer = (state = initState, action) => {
  switch (action.type) {
    case "STREAMING":
      return true;
    case "NOT_STREAMING":
      return false;
    default:
      return state;
  }
};

export default streamingReducer;
