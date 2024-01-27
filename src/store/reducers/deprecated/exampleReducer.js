const initState = {
  
};

const exampleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PICK_EXAMPLE':
      return action.payload;
    default:
      return state;
  }
}

export default exampleReducer;