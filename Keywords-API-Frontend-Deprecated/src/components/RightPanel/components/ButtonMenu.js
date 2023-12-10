import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as ArrowUpIcon } from "src/assets/icons/arrow-uparrowup.svg";
export default function ButtonMenu({ buttonState, handleSelectMethod }) {
  const [menu, setMenu] = React.useState([
    { name: "Matching Score(default)", selected: true },
    { name: "Date Posted", selected: false },
    { name: "Company Name", selected: false },
    { name: "Job Title", selected: false },
  ]);
  const handleSelect = (index) => {
    const newMenu = menu.map((item, i) => {
      if (i === index) {
        return { ...item, selected: true };
      } else {
        return { ...item, selected: false };
      }
    });
    setMenu(newMenu);
    handleSelectMethod(index);
  };
  if (buttonState[1] === true)
    return (
      <Box bgcolor={"background.default"} borderRadius={'4px'}>
        <List
          sx={{
            p: 0,
            px: "12px",
            py: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {menu.map((item, index) => (
            <ListItem key={index} width={"100%"} sx={{ p: 0 }} disablePadding>
              <Box
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                gap={"12px"}
                sx={{ "&:hover": { cursor: "pointer" } }}
                onClick={() => handleSelect(index)}
              >
                <Box width={"8px"} height={"8px"} display={"flex"}>
                  {item.selected && <ArrowUpIcon />}
                </Box>
                <Typography
                  color={item.selected ? "text.primary" : "text.secondary"}
                  fontWeight={item.selected ? 500 : 400}
                  variant="text3"
                >
                  {item.name}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  return null;
}
