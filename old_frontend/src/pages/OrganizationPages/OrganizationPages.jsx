import React, { useEffect } from 'react'
import PlatformLeftDrawer from 'src/components/PlatformLeftDrawer/PlatformLeftDrawer'
import DocumentationPage from 'src/components/Document/DocumentationPage';
import { textToLink } from 'src/utilities/utilities';
import { Outlet } from 'react-router-dom';
import UsageParagraph from './UsageParagraph';
import APIKeyParagraph from './APIKeyParagraphs';
import { BillsParagraph, PlanStatusParagraph } from './BillingParagraphs';
import { OrganizationIDParagraph, MemberManagementParagraph } from './OrganizationManagementParagraphs'
import InviteMember from './components/InviteMember';

const pages = [
    {
        title: "Settings",
        // forAdmin: true,
        paragraphs: [
            {
                text: <OrganizationIDParagraph />
            }
        ]
    },
    {
        title: "Usage",
        subscribedOnly: true,
        paragraphs: [
            {
                text: "Below you'll find a summary of API usage for your organization. All dates and times are UTC-based, and data may be delayed up to 5 minutes."
            },
            {
                text: <UsageParagraph />
            },
        ]
    },
    {
        title: "Members",
        // forAdmin: true,
        paragraphs: [
            {
                text: <MemberManagementParagraph />
            },
        ]
    },
    {
        title: "Billing",
        subtitle: <span className="text-md t-medium text-gray4">
            {"Manage your billing information and invoices. For questions about billing, contact "}
            <span className="text-black">
                team@keywordsai.co.
            </span>
        </span>,
        paragraphs: [
            {
                title: "Current Plan",
                text: <PlanStatusParagraph />
            },
            {
                text: <BillsParagraph />
            },
        ]
    },

];

const sections = [
    {
        title: "Organization",
        pages: pages
    },
    {
        title: "User",
        pages: [{
            title: "API Keys",
            paragraphs: [
                {
                    text: <span>
                        <span>
                            {"Your secret API keys are listed below. Please note that we do not display your secret API keys again after you generate them. Do not share your API key with others, or expose it in the browser or other client-side code. "}
                        </span>
                        <a href="/platform/documentation/authentication" className="text-primary">
                            View API Documentation.
                        </a>
                    </span>
                },
                {
                    text: <APIKeyParagraph />
                },
            ]
        },]
    }
]
export function OrganizationPages() {

    const PlatformDrawerMemo = React.memo(PlatformLeftDrawer);
    return (
        <div className="flex-row flex-1  "
        >
            <PlatformDrawerMemo sections={sections} />
            <Outlet />
        </div>
    )
}

export const OrganizationChildren = sections.reduce((allPages, section) => {
    const newPages = section.pages.map((page, index) => {
        if (page.title === "Settings") {
            return {
                path: "settings",
                element: <DocumentationPage key={index} {...page} title="Organization Settings" />
            };
        } else if (page.title === "Members") {
            return {
                path: "members",
                element: <DocumentationPage key={index} {...page} title={
                    <div className="flex-row flex1 justify-between items-center self-stretch">
                        <div className="display-sm">
                            Members
                        </div>
                        <InviteMember />
                    </div>
                }
                />
            };
        }
        return {
            path: textToLink(page.title),
            element: <DocumentationPage key={index} {...page} />
        };
    });

    return [...allPages, ...newPages];
}, []);
