import {
  SET_IS_EDITING,
  SET_CUSTOM_PROMPT,
  SET_CUSTOM_PROMPT_FILE,
  SET_ENABLE_CUSTOM_PROMPT,
  SET_CONVERSATION,
  SET_CONVERSATIONS,
  CREATE_CONVERSATION,
  DELETE_CONVERSATION,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
} from "src/store/actions";

const initState = {
  isEditing: false,
  enableCustomPrompt: false,
  customPrompt: "",
  customPromptFile: "",
  conversations: [],
  conversation: {
    id: 0,
    messages: [],
  },
};

export default function chatbotReducer(state = initState, action) {
  switch (action.type) {
    case SET_IS_EDITING:
      return { ...state, isEditing: action.payload };
    case SET_CUSTOM_PROMPT:
      return { ...state, customPrompt: action.payload };
    case SET_CUSTOM_PROMPT_FILE:
      return { ...state, customPromptFile: action.payload };
    case SET_ENABLE_CUSTOM_PROMPT:
      return { ...state, enableCustomPrompt: action.payload };
    case SET_CONVERSATION:
      return { ...state, conversation: action.payload };
    case SET_CONVERSATIONS:
      return { ...state, conversations: action.payload };
    case CREATE_CONVERSATION:
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
    case DELETE_CONVERSATION:
      const filteredConversations = state.conversations.filter(
        (conversation) => {
          return conversation.id !== action.payload;
        }
      );
      return {
        ...state,
        conversations: filteredConversations
      };
    case CREATE_MESSAGE:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: [...state.conversation.messages, action.payload],
        },
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        conversations: {
          ...state.conversation,
          messages: state.conversation.messages.filter(
            (message) => message.id !== action.payload.id
          ),
        },
      };
    default:
      return state;
  }
}
