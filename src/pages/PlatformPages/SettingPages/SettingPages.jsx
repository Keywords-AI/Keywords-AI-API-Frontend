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
import { ModelRouterPage } from './ModelRouterPage';
import { UserSettings } from './UserSettingsPage';

const pages = [
    {
        title: "General",
        // forAdmin: true,
        default: true,
        page: <SettingsPage />,
    },
    {
        title: "General",
        page: <SettingsPage />,
    },
    // {
    //     title: "Usage",
    //     // forAdmin: true,
    //     page: <UsagePage />,
    // }, feature replaced by dashboard
    {
        title: "Member",
        forAdmin: true,
        page: <MemberPage />,
    },
    {
        title: "Integrations",
        // forAdmin: true,
        page: <IntegrationsPage />,

    },
    {
        title: "Model Router",
        // forAdmin: true,
        page: <ModelRouterPage />,
    },
    {
        title: "Alerts & Fallback",
        // forAdmin: true,
        page: <AlertsFallbackPage />,
    },
    {
        title: "Billing",
        // forAdmin: true,
        page: <BillingPage />,
    },
];



const userPages = [
    {
        title: "Settings",
        // forAdmin: true,
        page: <UserSettings />,
    },
    {
        title: "API Keys",
        // forAdmin: true,
        page: <ApiKeyPage />,
    },
]


const processedOrgPages = pages.map((page, index) => {
    return generateChild(page);
})

const processedUserPages = userPages.map((page, index) => {
    return generateChild(page);
})

export const sections = [
    {
        title: "Organization",
        pages: processedOrgPages,
        icon: <Building />
    },
    {
        title: "User",
        pages: processedUserPages
    }
]

export const settingChildren = sections.reduce((allPages, section) => {
    const newPages = section.pages;

    return [...allPages, ...newPages];
}, []);
