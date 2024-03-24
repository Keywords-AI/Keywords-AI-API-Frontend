import React, { useEffect } from "react";
import { PreProcessPage, Page } from "src/types";
import SettingsPage from "./SettingsPage";
import ApiKeyPage from "./ApiKeyPage/ApiKeyPage";
import { MemberPage } from "./MemberPage";
import { BillingPage } from "./BillingPage";
import {
  BillingIcon,
  Building,
  EvaluationsIcon,
  GernalIcon,
  IconNotification,
  KeysIcon,
  Logo,
  ModelsIcon,
  PlansIcon,
  SettingsIcon,
  UserIcon,
  WebhooksIcon,
} from "src/components/Icons";
import { IntegrationsPage } from "./IntegrationsPage";
import { generateChild } from "src/utilities/objectProcessing";
import { AlertsFallbackPage } from "./AlertsFallbackPage";
import { ModelRouterPage } from "./ModelRouterPage";
import { Navigate } from "react-router-dom";
import { REDIRECT_URI } from "src/utilities/navigation";
import { PlansPage } from "./PlansPage";
import ModelsPage from "./Modelspage";
import Admin from "./AdminPage";
import { UserSettings } from "./UserSettingsPage";
import { WebhookPage } from "./WebhookPage";
import store from "src/store/store";
import Evaluations from "./Evaluations/Evaluations";

const pages: PreProcessPage[] = [
  {
    title: "General",
    // forAdmin: true,
    default: true, // When default is true, page can be empty, as it will be replaced by React.cloneElement(Navigate, { to: defaultPath })
    page: <Navigate to={`${REDIRECT_URI}/api/general`} />,
    icon: GernalIcon,
  },
  {
    title: "General",
    page: <SettingsPage />,
    icon: GernalIcon,
  },
  {
    title: "Members",
    page: <MemberPage />,
    icon: UserIcon,
  },
  // {
  //   title: "Integrations",
  //   forOrgAdmin: true,
  //   page: <IntegrationsPage />,
  // },
  // {
  //   title: "Model Router"
  //   forOrgAdmin: true,
  //   page: <ModelRouterPage />,
  // },
  {
    title: "Plans",
    forOrgAdmin: true,
    page: <PlansPage />,
    icon: PlansIcon,
  },
  {
    title: "Billing",
    page: <BillingPage />,
    icon: BillingIcon,
  },

  {
    title: "API Keys",
    page: <ApiKeyPage />,
    icon: KeysIcon,
  },
  {
    title: "Webhooks",
    page: <WebhookPage />,
    icon: WebhooksIcon,
  },
  {
    title: "Alerts & Fallback",
    forOrgAdmin: true,
    page: <AlertsFallbackPage />,
    icon: IconNotification,
  },
  {
    title: "Evaluations",
    page: <Evaluations />,
    icon: EvaluationsIcon,
  },
  {
    title: "Models",
    page: <ModelsPage />,
    icon: ModelsIcon,
  },
];

const userPages: PreProcessPage[] = [
  {
    title: "Settings",
    page: <UserSettings />,
    icon: SettingsIcon,
  },

  {
    title: "Admin",
    forKeywordsAdmin: true,
    page: <Admin />,
    icon: Logo,
  },
];

const processedOrgPages = pages.map((page, index) => {
  return generateChild(page);
});

const processedUserPages: Page[] = userPages.map((page, index) => {
  return generateChild(page);
});

export const sections = [
  {
    title: "Organization",
    pages: processedOrgPages,
    icon: <Building />,
  },
  {
    title: "User",
    pages: processedUserPages,
  },
];

export const settingChildren = sections.reduce((allPages: Page[], section) => {
  const newPages = section.pages;

  return [...allPages, ...newPages];
}, []);
