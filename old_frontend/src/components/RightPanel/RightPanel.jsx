import { Paper, ToggleButtonGroup } from "@mui/material";
import React, { useEffect } from "react";
import { SearchResult } from "./components";
import { theme } from "src/theme";

const drawerWidth = 320;

export default function RightPanel() {
    return (
        <Paper
            square
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                display: "flex",
                height: "100%",
                boxSizing: "border-box",
                alignItems: "flex-start",
                flexDirection: "column",
                p: "8px",
                backgroundColor: "#191919",
            }}
            className='right-drawer'
        >
            <SearchResult />
        </Paper>
    );
}
