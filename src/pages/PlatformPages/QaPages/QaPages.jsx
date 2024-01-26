import React, { useEffect } from 'react'
import { textToLink } from 'src/utilities/stringProcessing';
import {QaButtonPage} from "./QaButtonPage"
import {QaInputPage} from "./QaInputPage"
import { QaMiscPage } from './QaMisc';
import { QaTablePage } from './QaTablePage';
import TestPage from "src/pages/PlatformPages/TestPage/TestPage";

const pages = [
  {
    title: "Button",
    forAdmin: true,
    default: true,
    page: <QaButtonPage />
  },
  {
    title: "Button",
    forAdmin: true,
    page: <QaButtonPage />
  },
  {
    title: "Input Fields",
    forAdmin: true,
    page: <QaInputPage/>,
  },
  {
    title: "Misc",
    forAdmin: true,
    page: <QaMiscPage/>,
  },
  {
    title: "Table",
    forAdmin: true,
    page: <QaTablePage/>,
  },
  {
    title: "Test",
    forAdmin: true,
    page: <TestPage/>,
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

