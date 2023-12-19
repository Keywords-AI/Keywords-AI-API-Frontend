import React, { useEffect } from 'react'
import { textToLink } from 'src/utilities/stringProcessing';
import {QAButtonPage} from "./QAButtonPage"
import {QAInputPage} from "./QAInputPage"

const pages = [
  {
    title: "Button",
    // forAdmin: true,
    default: true,
    page: <QAButtonPage />
  },
  {
    title: "Button",
    // forAdmin: true,
    page: <QAButtonPage />
  },
  {
    title: "Input Fields",
    // forAdmin: true,
    page: <QAInputPage/>,
  },
  {
    title: "Member",
    // forAdmin: true,
    page: <>HI</>,
  },
  {
    title: "Billing",
    // forAdmin: true,
    page: <>HI</>,
  },
  // {
  //     title: "Usage",
  //     subscribedOnly: true,
  //     paragraphs: [
  //         {
  //             text: "Below you'll find a summary of API usage for your organization. All dates and times are UTC-based, and data may be delayed up to 5 minutes."
  //         },
  //         {
  //             text: <UsageParagraph />
  //         },
  //     ]
  // },
  // {
  //     title: "Members",
  //     // forAdmin: true,
  //     paragraphs: [
  //         {
  //             text: <MemberManagementParagraph />
  //         },
  //     ]
  // },
  // {
  //     title: "Billing",
  //     subtitle: <span className="text-md t-medium text-gray4">
  //         {"Manage your billing information and invoices. For questions about billing, contact "}
  //         <span className="text-black">
  //             team@keywordsai.co.
  //         </span>
  //     </span>,
  //     paragraphs: [
  //         {
  //             title: "Current Plan",
  //             text: <PlanStatusParagraph />
  //         },
  //         {
  //             text: <BillsParagraph />
  //         },
  //     ]
  // },

];



const userPages = [

  {
    title: "API Keys",
    // forAdmin: true,
    page: <>HI</>,
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
    title: "Component",
    pages: processedOrgPages
  },
  {
    title: "User",
    // pages: [{
    //     title: "API Keys",
    //     paragraphs: [
    //         {
    //             text: <span>
    //                 <span>
    //                     {"Your secret API keys are listed below. Please note that we do not display your secret API keys again after you generate them. Do not share your API key with others, or expose it in the browser or other client-side code. "}
    //                 </span>
    //                 <a href="/platform/qa/authentication" className="text-primary">
    //                     View API qa.
    //                 </a>
    //             </span>
    //         },
    //         {
    //             text: <APIKeyParagraph />
    //         },
    //     ]
    // },]
    pages: processedUserPages
  }
]

const generateChild = (page) => {
  let path = textToLink(page.title);
  if (page?.path) {
    path = page.path;
  }
  return {
    title: page.title,
    path: path,
    element: page.page
  };
}
export const qaChildren = sections.reduce((allPages, section) => {
  const newPages = section.pages.map((page, index) => {
    return generateChild(page);
  });

  return [...allPages, ...newPages];
}, []);

