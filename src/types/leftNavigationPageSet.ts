import { ReactElement } from 'react';

export type PreProcessPage = {
    default?: boolean,
    forKeywordsAdmin?: boolean,
    forOrgAdmin?: boolean,
    title: string,
    path?: string,
    page: ReactElement,
};

export type Page = {
    default?: boolean,
    forKeywordsAdmin?: boolean,
    forOrgAdmin: boolean,
    title: string,
    path: string,
    element: ReactElement,
    page: any,
};