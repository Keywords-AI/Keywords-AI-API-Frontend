import React from "react";
import MainPanel from "./MainPanel";
import { Typography } from "@mui/material";
export default function AppliedPanel() {
  let queryLength = 0;
    return (
        <div
            style={{
                color: "white",
                width: "100px",
                height: "500px",
            }}
        >
          {queryLength === 0 ? <></> : <MainPanel />}
          
        </div>
    );
}
