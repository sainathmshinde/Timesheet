// Header.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const Header = ({ onDrawerToggle, open }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <AppBar
      sx={{
        position: "sticky",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "margin-left 0.3s", // Smooth transition when sidebar is toggled
        marginLeft: open ? 30 : 9, // Shift header based on sidebar state

        padding: isMobile ? "0 16px" : "0 32px", // Adjust padding for mobile
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          JIRA
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
