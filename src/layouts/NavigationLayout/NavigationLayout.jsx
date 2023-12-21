import { Outlet } from "react-router-dom";
import { NavBar } from "src/components/Sections";
import React from "react";
import { Notifications } from "src/components/Dialogs";

export function NavigationLayout() {
  return (
    <div className="flex-col w-full min-h-screen items-center">
      <NavBar />
      <div className="w-full h-full flex-col flex-1 overflow-hidden items-start justify-start">
        <Outlet />
      </div>
    </div>
  );
}
