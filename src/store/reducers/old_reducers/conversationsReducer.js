const initState = [
  // {
  //   id: -1,
  //   user: "user",
  //   name: "Hello there",
  //   created_at: new Date().getTime().toString(),
  // },
];

const conversationsReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_CONVERSATION":
      return [action.payload, ...state];
    case "GET_CONVERSATIONS":
      return action.payload;
    case "DELETE_CONVERSATION":
      return state.filter((conversation) => conversation.id !== action.payload);
    case "RENAME_CONVERSATION":
      return state.map((conversation) => {
        if (conversation.id === action.payload.id) {
          return {
            ...conversation,
            name: action.payload.name,
          };
        } else {
          return conversation;
        }
      });
    default:
      return state;
  }
};

export default conversationsReducer;
