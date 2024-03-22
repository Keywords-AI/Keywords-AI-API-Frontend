import { Outlet } from "react-router-dom";
import { NavBar } from "src/components/Sections";
import React from "react";
import { Notifications } from "src/components/Dialogs";
import { LeftNavBar } from "src/components/Sections/LeftNavBar";

export function SidebarNavigationLayout() {
  return (
    <div className="flex w-full min-h-screen items-center">
      {/* <NavBar /> */}
      {<LeftNavBar />}
      <div className="w-full h-screen flex-col  overflow-hidden items-start justify-start ">
        <Notifications />
        <Outlet />
      </div>
    </div>
  );
}
