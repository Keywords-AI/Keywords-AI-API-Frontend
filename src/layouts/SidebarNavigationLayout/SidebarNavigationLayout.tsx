import { Outlet, useLocation } from "react-router-dom";
import React from "react";
import { Notifications } from "src/components/Dialogs";
import { LeftNavBar } from "src/components/Sections/LeftNavbar";

export function SidebarNavigationLayout() {
  const location = useLocation();
  const isApi = location.pathname.includes("api");
  return (
    <div className="flex w-full min-h-screen items-center">
      {!isApi && <LeftNavBar />}
      <div className="w-full h-screen flex-col  overflow-hidden items-start justify-start ">
        <Notifications />

        <Outlet />
      </div>
    </div>
  );
}
