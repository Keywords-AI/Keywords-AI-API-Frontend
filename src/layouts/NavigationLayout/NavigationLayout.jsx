import { Outlet } from "react-router-dom";
import { NavBar } from "src/components/NavBar/NavBar";
import React from "react";

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
