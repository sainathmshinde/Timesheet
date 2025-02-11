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
  Switch,
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
  ModeNight,
} from "@mui/icons-material";
import { produce } from "immer";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const [submenuStates, setSubmenuStates] = useState({});
  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

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
      path: "/",
    },
    {
      id: "users",
      title: "Users",
      icon: <People />,
      // path: "/user",
      subItems: [
        {
          id: "profile",
          title: "Profile",
          path: "/user",

          icon: <Person />,
        },
        {
          id: "groups",
          title: "Groups",
          icon: <Group />,
          path: "/about",
        },
      ],
    },
    {
      id: "settings",
      title: "Settings",
      icon: <Settings />,
      path: "/about",

      // subItems: [
      //   {
      //     id: "security",
      //     title: "Security",
      //     path: "/about",

      //     icon: <Security />,
      //   },
      // ],
    },
    {
      id: "mode",
      icon: <ModeNight />,
      title: <Switch />,
    },
  ];

  const renderMenuItem = (item) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              if (hasSubItems) {
                toggleSubmenu(item.id); // Toggle submenu visibility
              }
              handleMenuItemClick(item.path); // Handle the navigation
            }}
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
                  onClick={() => handleMenuItemClick(subItem.path)} // This is where we fix it
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
    <Box flex={1} p={2}>
      {/* Sidebar top: Menu Icon Button */}

      {/* Menu Items */}
      <Box sx={{ overflow: "auto" }}>
        <List>{menuItems.map(renderMenuItem)}</List>
      </Box>
    </Box>
  );
};

export default Sidebar;
