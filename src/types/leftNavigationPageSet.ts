import { ReactElement } from "react";

export type PreProcessPage = {
  default?: boolean;
  forKeywordsAdmin?: boolean;
  forOrgAdmin?: boolean;
  title: string;
  path?: string;
  page: ReactElement;
  icon?: any;
};

export type Page = {
  default?: boolean;
  forKeywordsAdmin?: boolean;
  forOrgAdmin: boolean;
  title: string;
  path: string;
  element: ReactElement;
  page: any;
  icon?: any;
};
