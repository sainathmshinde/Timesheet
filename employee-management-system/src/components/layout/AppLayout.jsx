// import { CssBaseline, Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const AppAppLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  return (
    <Box>
      <Navbar open={open} />
      <Stack direction="row" spacing={0} justifyContent="space-between">
        <Sidebar open={open} setOpen={setOpen} />
        <Box
          bgcolor=""
          flex={6}
          p={6}
          sx={{ width: "100%", overflow: "hidden" }}
        >
          <main> {children}</main>
        </Box>

        {/* <Rightbar /> */}
      </Stack>
    </Box>
  );
};

export default AppAppLayout;
