import React, { useEffect } from 'react'
import { textToLink } from 'src/utilities/stringProcessing';
import SettingsPage from './SettingsPage';
import ApiKeyPage from './ApiKeyPage';
import UsagePage from './UsagePage';
import MemberPage from './MemberPage';
import BillingPage from './BillingPage';
import { Building } from 'src/components/Icons'
import { IntegrationsPage } from './IntegrationsPage';
import { generateChild } from 'src/utilities/objectProcessing';
import { AlertsFallbackPage } from './AlertsFallbackPage';
import UserSettings from './UserSettings';

const pages = [
  {
    title: "Settings",
    // forAdmin: true,
    default: true,
    page: <SettingsPage />,
  },

  {
    title: "Usage",
    // forAdmin: true,
    page: <UsagePage />,
  },
  {
    title: "Member",
    forAdmin: true,
    page: <MemberPage />,
  },
  {
    title: "Billing",
    // forAdmin: true,
    page: <BillingPage />,
  },
    {
        title: "Integrations",
        // forAdmin: true,
        page: <IntegrationsPage />,
    },
    {
        title: "Alerts & Fallback",
        // forAdmin: true,
        page: <AlertsFallbackPage />,
    },

  {
    title: "Integrations",
    // forAdmin: true,
    page: <IntegrationsPage />,
  },
];

const userPages = [
  {
    title: "Settings",
    page: <UserSettings />,
  },

  {
    title: "API Keys",
    // forAdmin: true,
    page: <ApiKeyPage />,
  },
];

const processedOrgPages = pages.map((page, index) => {
  return generateChild(page);
});

const processedUserPages = userPages.map((page, index) => {
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

export const settingChildren = sections.reduce((allPages, section) => {
  const newPages = section.pages;

  return [...allPages, ...newPages];
}, []);
