import React from 'react'
import Chatbot from "src/pages/Chatbot/Chatbot";
import SQLChatbot from "src/pages/SQLChatbot/SQLChatbot";
import {
    DocumentationPages,
    DocumentationChildren,
} from "src/pages/DocumentPages/DocumentationPages";
import { OrganizationPages, OrganizationChildren } from '../pages/OrganizationPages/OrganizationPages';
import { Navigate } from 'react-router-dom';
import Examples from 'src/pages/Examples/Examples';
import Playground from 'src/pages/Playground/Playground';
import MTBrowser from 'src/pages/MTBrowser/MTBrowser';
import Pricing from 'src/pages/Pricing/Pricing';
import GetStarted from 'src/pages/GetStarted/GetStarted';
import Overview from 'src/pages/Overview/Overview';
import AcceptInvitation from 'src/pages/AcceptInvitation/AcceptInvitation';


export const platformPaths = [
    {
        path: "",
        element: <Navigate to="overview" />,
    },
    {
        path: "playground",
        element: <Playground />,
    },
    {
        path: "mt-browser",
        element: <MTBrowser />,
    },
    {
        path: "chatbot/:mode?",
        element: <Chatbot />,
    },
    {
        path: "sqlbot",
        element: <SQLChatbot />,
    },
    {
        path: "get-started",
        element: <GetStarted />,
    },
    {
        path: "pricing",
        element: <Pricing />,
    },
    {
        path: "accept/:code",
        element: <AcceptInvitation />,
    },
    {
        path: "organization",
        element: <OrganizationPages />,
        children: [
            {
                path: "",
                element: <Navigate to={"billing"} />,
            },
            ...OrganizationChildren,
        ],
    },
    {
        path: "examples",
        element: <Examples />,
    },
    {
        path: "documentation",
        element: <DocumentationPages />,
        children: [
            {
                path: "",
                element: <Navigate to="overview" />,
            },
            ...DocumentationChildren,
        ],
    },
    {
        path: "overview",
        element: <Overview />,
    },
]