import { ReactElement } from 'react';

export type PreProcessPage = {
    default?: boolean,
    forAdmin?: boolean,
    title: string,
    path?: string,
    page: ReactElement,
};

export type Page = {
    default?: boolean,
    forAdmin?: boolean,
    title: string,
    path: string,
    element: ReactElement,
    page: any,
};