import React, { useEffect } from 'react'
import { Bracket } from 'src/components/Icons';
import { Overview } from './Overview';
import { ErrorHandling } from './ErrorHandling';
import { ApiKeys } from './ApiKeys';
import { QuickStart } from './QuickStart';
import { RateLimit } from './RateLimit';
import { Request } from './Request';
import { Response } from './Response';
import { Integrations } from './Integrations';
import { SupportedModels } from './SupportedModels';
import { generateChild } from 'src/utilities/objectProcessing';

const pages = [
    {
        title: "Overview",
        // forAdmin: true,
        path: "", // default path
        default: true,
        page: <Overview />,
    },
    {
        title: "Overview",
        page: <Overview />,
    },
    {
        title: "Error Handling",
        page: <ErrorHandling />,
    },
    {
        title: "API Keys",
        page: <ApiKeys />,
    },
    {
        title: "Quick Start",
        page: <QuickStart />,
    },
    {
        title: "Rate Limit",
        page: <RateLimit />,
    },
    {
        title: "Request",
        page: <Request />,
    },
    {
        title: "Response",
        page: <Response />,
    },
    {
        title: "Integrations",
        page: <Integrations />,
    },
    {
        title: "Supported Models",
        page: <SupportedModels />,
    },
];

const processedOrgPages = pages.map((page, index) => {
    page.page = React.cloneElement(page.page, { title: page.title });
    return generateChild(page)
})

export const sections = [
    {
        title: "Get Started",
        pages: processedOrgPages,
        icon: <Bracket />
    },
]

export const documentationChildren = sections.reduce((allPages, section) => {
    const newPages = section.pages;

    return [...allPages, ...newPages];
}, []);
