import { Outlet } from "react-router-dom";
import { Notifications } from "src/components/Dialogs";
import React from "react";

export function FullScreenLayout() {
  return (
    <div className="flex-col min-h-screen relative">
      <div className="flex-col px-lg sm:px-md py-md gap-xxxl justify-between items-center flex-1 ">
        <Notifications offset={""} />
        <Outlet />
        {/* <Subtract /> */}
      </div>
    </div>
  );
}
