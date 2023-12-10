import React from "react";
import { Outlet } from "react-router-dom";
import PlatformNavBar from "src/components/PlatformNavBar/PlatformNavBar";

export default function PlatformLayout() {
  return (
    <div
      className="flex-col flex-1  "
      style={{
        height: "100vh",
      }}
    >
      <PlatformNavBar />
      <Outlet />
    </div>
  );
}
