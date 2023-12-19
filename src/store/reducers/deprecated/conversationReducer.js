const initState = {
  messages: [{ role: "assistant", content: `## My To-Do List

  - [ ] Complete the market analysis report.
  - [ ] Schedule meeting with the design team.
  - [ ] Update project roadmap on Confluence.
  
  **Reminder:** Check emails by 10 AM.
  
  *Useful Link:* [Team Calendar](https://www.companycalendar.com)
  `}],
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
