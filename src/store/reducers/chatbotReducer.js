const initState = {
    isEditing: false,
};

export default function chatbotReducer(state = initState, action) {
  switch (action.type) {
    case "SET_IS_EDITING":
      return {...state, isEditing: action.payload};
    default:
      return state;
  }
};
