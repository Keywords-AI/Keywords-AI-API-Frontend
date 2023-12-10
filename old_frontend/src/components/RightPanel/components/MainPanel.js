import { Box, Container, Typography } from "@mui/material";
import React from "react";
import ExtensionIcon from "@mui/icons-material/Extension";
export default function MainPanel() {
  const showJobs = true;
  return (
    <Box display={'flex'} flexDirection={'column'} flex={1} width={'100%'}>
      {showJobs ? <></> : (<Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ExtensionIcon />
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Start a query to streamline your job search experience
        </Typography>
      </Box>)}
    </Box>

  );
}
