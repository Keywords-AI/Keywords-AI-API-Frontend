import React, { useEffect } from 'react'
import { Bracket } from 'src/components/Icons';
import { Overview } from './Overview';
import { ErrorHandling } from './ErrorHandling';
import { ApiKeys } from './ApiKeys';
import { QuickStart } from './QuickStart';
import { Limits } from './Limits';
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
        title: "Quick Start",
        page: <QuickStart />,
    },
    {
        title: "Supported Models",
        page: <SupportedModels />,
    },
    {
        title: "API Keys",
        page: <ApiKeys />,
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
        title: "Limits",
        page: <Limits />,
    },
    {
        title: "Error Handling",
        page: <ErrorHandling />,
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
