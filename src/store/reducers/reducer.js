import userReducer from "./userReducer";
import usageReducer from "./usageReducer";
import playgroundReducer from "./playgroundReducer";
import streamingTextReducer from "./streamingTextReducer";
import apiKeyReducer from "./apiKeyReducer";
import organizationReducer from "./organizationReducer";
import billingsReducer from "./billingsReducer";

const rootReducer = (state = {}, action) => {
  return {
    user: userReducer(state.user, action),
    usage: usageReducer(state.usage, action),
    playground: playgroundReducer(state.playground, action),
    streamingText: streamingTextReducer(state.streamingText, action),
    apiKey: apiKeyReducer(state.apiKey, action),
    organization: organizationReducer(state.organization, action),
    billings: billingsReducer(state.billings, action),
  };
};

export default rootReducer;
