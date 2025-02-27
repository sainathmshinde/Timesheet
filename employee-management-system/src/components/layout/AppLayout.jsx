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
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar at the Top */}
      <Navbar open={open} />

      {/* Main Content with Sidebar and Content */}
      <Stack direction="row" sx={{ flexGrow: 1, height: "100%" }}>
        {/* Sidebar (Fixed Width) */}
        <Box sx={{ width: 240, flexShrink: 0 }}>
          <Sidebar open={open} setOpen={setOpen} />
        </Box>

        {/* Main Content (Takes Remaining Space) */}
        <Box sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
          <main>{children}</main>
        </Box>
      </Stack>
    </Box>
  );
};

export default AppAppLayout;
