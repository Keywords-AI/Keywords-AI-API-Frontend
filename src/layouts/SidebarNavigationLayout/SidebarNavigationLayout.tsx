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
        <Outlet />
      </div>
    </div>
  );
}
