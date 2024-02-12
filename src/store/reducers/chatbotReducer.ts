import {
  SET_IS_EDITING,
  SET_CUSTOM_PROMPT,
  SET_CUSTOM_PROMPT_FILE,
  SET_ENABLE_CUSTOM_PROMPT,
  SET_CONVERSATION,
  SET_CONVERSATIONS,
  RESET_CONVERSATION,
  CREATE_CONVERSATION,
  DELETE_CONVERSATION,
  CREATE_MESSAGE,
  DELETE_MESSAGE,
  SET_MESSAGE_CONTENT,
} from "src/store/actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { REMOVE_LAST_MESSAGE } from "../actions/chatbotAction";

const initState = {
  isEditing: false,
  enableCustomPrompt: false,
  customPrompt: "",
  customPromptFile: { name: "" },
  conversations: [],
  conversation: {
    id: undefined,
    messages: [],
  },
};

export default function chatbotReducer(state = initState, action:PayloadAction<any>) {
  switch (action.type) {
    case SET_IS_EDITING:
      return { ...state, isEditing: action.payload };
    case SET_CUSTOM_PROMPT:
      return { ...state, customPrompt: action.payload };
    case SET_CUSTOM_PROMPT_FILE:
      return { ...state, customPromptFile: { name: action.payload } };
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
        conversation: action.payload,
      };
    case DELETE_CONVERSATION:
      const filteredConversations = state.conversations.filter(
        (conversation) => {
          return conversation?.id !== action.payload;
        }
      );
      return {
        ...state,
        conversations: filteredConversations,
      };
    case RESET_CONVERSATION:
      console.log({
        ...state,
        conversation: {
          id: undefined,
          messages: [],
        }
      })
      return {
        ...state,
        conversation: {
          id: undefined,
          messages: [],
        }
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
            (message) => message?.id !== action.payload.id
          ),
        },
      };
    case REMOVE_LAST_MESSAGE:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: state.conversation.messages?.slice(0, -1),
        },
      };
    case SET_MESSAGE_CONTENT:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          messages: state.conversation.messages.map((message: any) => {
            if (message?.id === action.payload.id) {
              return { ...message, content: action.payload.content };
            }
            return message;
          }),
        },
      };
    default:
      return state;
  }
}
