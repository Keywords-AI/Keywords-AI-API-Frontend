import userReducer from "./userReducer";
import usageReducer from "./usageReducer";
import playgroundReducer from "./playgroundReducer";
import streamingTextReducer from "./streamingTextReducer";
import apiKeyReducer from "./settingPagesReducer/apiKeyReducer";
import organizationReducer from "./deprecated/organizationReducer";
import billingsReducer from "./settingPagesReducer/billingsReducer";
import chatbotReducer from "./settingPagesReducer/chatbotReducer";
import integrationReducer from "./settingPagesReducer/integrationReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = (state = {}, action) => {
  return {
    user: userReducer(state.user, action),
    usage: usageReducer(state.usage, action),
    playground: playgroundReducer(state.playground, action),
    streamingText: streamingTextReducer(state.streamingText, action),
    apiKey: apiKeyReducer(state.apiKey, action),
    organization: organizationReducer(state.organization, action),
    billings: billingsReducer(state.billings, action),
    chatbot: chatbotReducer(state.chatbot, action),
    integration: integrationReducer(state.integration, action),
    notification: notificationReducer(state.notification, action),
  };
};

export default rootReducer;
