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
];

const processedOrgPages = pages.map((page, index) => {
  return {
    ...page,
    path: textToLink(page.title)
  }
})

export const sections = [
  {
    title: "Components",
    pages: processedOrgPages
  },
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

