import { Box, Button, Typography } from "@mui/material";
import { ReactComponent as ShareIcon } from "src/assets/icons/Share.svg";
import React from "react";

//add the link in onClick{} to the share page
function Referral() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      padding={"12px 16px"}
      borderRadius={"4px"}
      bgcolor={"primary.contrast"}
    //   position={"absolute"}
    //   bottom={"0"}
    //   left={"0"}
      width={"100%"}
    >
      <Typography variant="text2" color={"text.contrast"}>
        Get free chat credits!
      </Typography>
      <Typography variant="text4" color={"text.contrast"}>
        Introduce CareersGPT to your friends.
      </Typography>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "4px 8px",
          bgcolor: "primary.main",
          borderRadius: "4px",
          gap: "8px",
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0.60) 100%), #AAD1FF",
        }}
      >
        <ShareIcon />
        <Typography
          variant="text2"
          textTransform={"none"}
          color={"text.contrast"}
        >
          Share and Earn Credits
        </Typography>
      </Button>
    </Box>
  );
}

export default Referral;
