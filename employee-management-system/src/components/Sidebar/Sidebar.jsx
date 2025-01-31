import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import {
  ChevronRight,
  ExpandMore,
  Dashboard,
  People,
  Settings,
  Person,
  Group,
  Security,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { produce } from "immer";

const Sidebar = ({ open, setOpen }) => {
  const [submenuStates, setSubmenuStates] = useState({});

  const toggleSubmenu = (id) => {
    setSubmenuStates(
      produce((draft) => {
        draft[id] = !draft[id];
      })
    );
  };

  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <Dashboard />,
    },
    {
      id: "users",
      title: "Users",
      icon: <People />,
      subItems: [
        {
          id: "profile",
          title: "Profile",
          icon: <Person />,
        },
        {
          id: "groups",
          title: "Groups",
          icon: <Group />,
        },
      ],
    },
    {
      id: "settings",
      title: "Settings",
      icon: <Settings />,
      subItems: [
        {
          id: "security",
          title: "Security",
          icon: <Security />,
        },
      ],
    },
  ];

  const renderMenuItem = (item) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => hasSubItems && toggleSubmenu(item.id)}
            sx={{
              minHeight: 48,
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
            {hasSubItems &&
              (submenuStates[item.id] ? <ExpandMore /> : <ChevronRight />)}
          </ListItemButton>
        </ListItem>

        {hasSubItems && (
          <Collapse in={submenuStates[item.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem) => (
                <ListItemButton
                  key={subItem.id}
                  sx={{
                    pl: 4,
                  }}
                >
                  <ListItemIcon>{subItem.icon}</ListItemIcon>
                  <ListItemText primary={subItem.title} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 70,
          boxSizing: "border-box",
          whiteSpace: "nowrap",
          overflowX: "hidden",
          transition: "width 0.2s ease-in-out",
        },
      }}
    >
      {/* Sidebar top: Menu Icon Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          p: 3,
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(!open)}
          edge="start"
        >
          <MenuIcon />
        </IconButton>

        {open && (
          <Typography
            variant="h4"
            sx={{
              ml: 4,
              fontWeight: 700,
              color: "black",
            }}
          >
            JIRA
          </Typography>
        )}
      </Box>

      {/* Menu Items */}
      <Box sx={{ overflow: "auto" }}>
        <List>{menuItems.map(renderMenuItem)}</List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
