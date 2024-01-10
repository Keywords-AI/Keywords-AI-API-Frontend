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
import { Navigate } from 'react-router-dom';
import { REDIRECT_URI } from 'src/utilities/navigation';
import { PlansPage } from './PlansPage';



const pages = [
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
    // {
    //     title: "Plans",
    //     // forAdmin: true,
    //     page: <PlansPage />,
    // }
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
