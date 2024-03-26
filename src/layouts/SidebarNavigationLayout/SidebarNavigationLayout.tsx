import {
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Notifications } from "src/components/Dialogs";
import { LeftNavBar } from "src/components/Sections/LeftNavbar";
import { set } from "date-fns";

export function SidebarNavigationLayout() {
  const location = useLocation();
  const isApi = location.pathname.includes("api");

  return (
    <div aria-label="full-screen" className="flex w-full h-screen items-start">
      {!isApi && <LeftNavBar />}
      <div className="flex-col flex-1 self-stretch items-start justify-start overflow-auto">
        <Notifications />
        {/* {isTest && (
          <div className="flex flex-row py-xs px-lg items-center gap-xxs self-stretch bg-primary relative h-[44px]">
            <span className="text-sm-md text-gray-5">Test environment </span>
            <span className="text-sm-regular text-gray-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Requests through Playground and API keys with environment =
              “Test”.
            </span>
          </div>
        )} */}
        <Outlet />
      </div>
    </div>
  );
}
