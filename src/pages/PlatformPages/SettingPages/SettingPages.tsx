import React, { useEffect } from "react";
import { PreProcessPage, Page } from "src/types";
import SettingsPage from "./SettingsPage";
import ApiKeyPage from "./ApiKeyPage";
import { MemberPage } from "./MemberPage";
import { BillingPage } from "./BillingPage";
import { Building } from "src/components/Icons";
import { IntegrationsPage } from "./IntegrationsPage";
import { generateChild } from "src/utilities/objectProcessing";
import { AlertsFallbackPage } from "./AlertsFallbackPage";
import { ModelRouterPage } from "./ModelRouterPage";
import { UserSettings } from "./UserSettingsPage";
import { Navigate } from "react-router-dom";
import { REDIRECT_URI } from "src/utilities/navigation";
import { PlansPage } from "./PlansPage";


const pages: PreProcessPage[] = [
  {
    title: "General",
    // forAdmin: true,
    default: true, // When default is true, page can be empty, as it will be replaced by React.cloneElement(Navigate, { to: defaultPath })
    page: <Navigate to={`${REDIRECT_URI}/api/general`} />,
  },
  {
    title: "General",
    page: <SettingsPage />,
  },
  {
    title: "Member",
    page: <MemberPage />,
  },
  {
    title: "Integrations",
    forOrgAdmin: true,
    page: <IntegrationsPage />,
  },
  {
    title: "Model Router",
    forOrgAdmin: true,
    page: <ModelRouterPage />,
  },
  {
    title: "Alerts & Fallback",
    forOrgAdmin: true,
    page: <AlertsFallbackPage />,
  },
  {
    title: "Plans",
    forOrgAdmin: true,
    page: <PlansPage />,
  },
  {
    title: "Billing",
    page: <BillingPage />,
  },

  {
    title: "Proxy Keys",
    page: <ApiKeyPage />,
  },
];

const userPages = [
  {
    title: "Settings",
    // forAdmin: true,
    page: <UserSettings />,
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
