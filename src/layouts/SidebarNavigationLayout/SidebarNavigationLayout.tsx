import { Outlet, useLocation } from "react-router-dom";
import React from "react";
import { Notifications } from "src/components/Dialogs";
import { LeftNavBar } from "src/components/Sections/LeftNavbar";

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
