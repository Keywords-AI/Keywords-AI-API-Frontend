import userReducer from "./userReducer";
import usageDataReducer from "./usageDataReducer";
import conversationReducer from "./conversationReducer";
import conversationsReducer from "./conversationsReducer";
import streamingReducer from "./streamingReducer";
import fileUplaodReducer from "./fileUploadReducer";
import exampleReducer from "./exampleReducer";
import playgroundReducer from "./playgroundReducer";
import streamingTextReducer from "./streamingTextReducer";
const rootReducer = (state = {}, action) => {
  return {
    user: userReducer(state.user, action),
    usageData: usageDataReducer(state.usageData, action),
    conversation: conversationReducer(state.conversation, action),
    conversations: conversationsReducer(state.conversations, action),
    streaming: streamingReducer(state.streaming, action),
    uploading: fileUplaodReducer(state.uploading, action),
    example: exampleReducer(state.example, action),
    playground: playgroundReducer(state.playground, action),
    streamingText: streamingTextReducer(state.streamingText, action),
  };
};

export default rootReducer;
