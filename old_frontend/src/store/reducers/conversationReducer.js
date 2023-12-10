const initState = {
  messages: [],
};

const conversationReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_MESSAGE":
      const oldMessages = state.messages || [];
      return {
        ...state,
        messages: [...oldMessages, action.payload],
      };
    case "SET_CONVERSATION":
      return action.payload;
    case "CREATE_MESSAGE_ERROR":
      return state;
    default:
      return state;
  }
};

export default conversationReducer;
