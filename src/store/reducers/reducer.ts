import userReducer from "./userReducer";
import playgroundReducer from "./playgroundReducer";
import streamingTextReducer from "./streamingTextReducer";
import apiKeyReducer from "./settingPagesReducer/apiKeyReducer";
import organizationReducer from "./organizationReducer";
import billingsReducer from "./settingPagesReducer/billingsReducer";
import chatbotReducer from "./chatbotReducer";
import integrationReducer from "./settingPagesReducer/integrationReducer";
import notificationReducer from "./notificationReducer";
import themeReducer from "./themeReducer";
import dashboardReducer from "./dashboardReducer";
import onboardingReducer from "./onboardingReducer";
import fallbackReducer from "./settingPagesReducer/fallbackReducer";
import requestLogReducer from "./requestLogReducer";
import { PayloadAction } from "@reduxjs/toolkit";
import cachePageReducer from "./cachePageReducer";
import modelReducer from "./modelReducer";
import usersPageReducer from "./usersPageReducer";
const rootReducer = (state: any = {}, action: PayloadAction<any>) => {
  return {
    user: userReducer(state.user, action),
    playground: playgroundReducer(state.playground, action),
    streamingText: streamingTextReducer(state.streamingText, action),
    apiKey: apiKeyReducer(state.apiKey, action),
    organization: organizationReducer(state.organization, action),
    billings: billingsReducer(state.billings, action),
    chatbot: chatbotReducer(state.chatbot, action),
    integration: integrationReducer(state.integration, action),
    notification: notificationReducer(state.notification, action),
    theme: themeReducer(state.theme, action),
    dashboard: dashboardReducer(state.dashboard, action),
    onboarding: onboardingReducer(state.onboarding, action),
    fallback: fallbackReducer(state.fallback, action),
    requestLogs: requestLogReducer(state.requestLogs, action),
    cachePage: cachePageReducer(state.cachePage, action),
    models: modelReducer(state.models, action),
    usersPage: usersPageReducer(state.usersPage, action),
  };
};

export default rootReducer;
