// import { CssBaseline, Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import Rightbar from "../Rightbar";
import Feed from "../Feed";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
// import Sidebar from "../Sidebar/Sidebar";
// import Header from "../Header/Header";

const AppAppLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  return (
    // <Box className="flex">
    //   <Sidebar />
    //   <div className="flex-1">
    //     <Navbar open={open} />
    //     <main className="p-4">{children}</main>
    //   </div>
    // </Box>
    <Box>
      <Navbar open={open} />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar open={open} setOpen={setOpen} />
        <Box bgcolor="yellow" flex={6} p={6}>
          <main> {children}</main>
        </Box>

        {/* <Rightbar /> */}
      </Stack>
    </Box>
  );
};

export default AppAppLayout;
