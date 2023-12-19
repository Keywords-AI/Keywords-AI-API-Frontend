import React, { useEffect } from 'react'
import { textToLink } from 'src/utilities/stringProcessing';
import SettingsPage from './SettingsPage';
import ApiKeyPage from './ApiKeyPage';
import UsagePage from './UsagePage';
import MemberPage from './MemberPage';
import BillingPage from './BillingPage';
import { Building } from 'src/components/Icons'
import { IntegrationsPage } from './IntegrationsPage';

const pages = [
    {
        title: "Settings",
        // forAdmin: true,
        default: true,
        page: <SettingsPage />,
    },
    {
        title: "Settings",
        // forAdmin: true,
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

];



const userPages = [

    {
        title: "API Keys",
        // forAdmin: true,
        page: <ApiKeyPage />,
    },
]


const processedOrgPages = pages.map((page, index) => {
    return {
        ...page,
        path: textToLink(page.title)
    }
})

const processedUserPages = userPages.map((page, index) => {
    return {
        ...page,
        path: textToLink(page.title)
    }
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

const generateChild = (page) => {
    let path = textToLink(page.title);
    if (page?.path) {
        path = page.path;
    }
    if (page?.default) {
        path = "";
    }
    return {
        title: page.title,
        path: path,
        element: page.page
    };
}

export const settingChildren = sections.reduce((allPages, section) => {
    const newPages = section.pages.map((page, index) => {
        return generateChild(page);
    });

    return [...allPages, ...newPages];
}, []);
