import {
  AppBar,
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Input,
  Menu,
  MenuItem,
  styled,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Mail, Notifications } from "@mui/icons-material";
import React, { useState } from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));
const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const records = [
  {
    id: 1,
    title: "Record 1",
    description: "This is the description for record 1.",
  },
  {
    id: 2,
    title: "Record 2",
    description: "This is the description for record 2.",
  },
  {
    id: 3,
    title: "Record 3",
    description: "This is the description for record 3.",
  },
  {
    id: 4,
    title: "Record 4",
    description: "This is the description for record 4.",
  },
  {
    id: 5,
    title: "Record 5",
    description: "This is the description for record 5.",
  },
];

const Navbar = ({ sidebar }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <AppBar
      position="sticky"
      sx={
        {
          // marginRight: -30,
        }
      }
    >
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Navbar
        </Typography>
        <DehazeIcon sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search"
            type="text" // Specify input type (text, email, number, etc.)
            fullWidth
          />
          {/* <Autocomplete
            freeSolo
            //   id="free-solo-2-demo"
            disableClearable
            options={records.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ border: "none" }}
                {...params}
                label="Search.."
                slotProps={{
                  input: {
                    ...params.InputProps,
                    type: "search",
                  },
                }}
              />
            )}
          /> */}
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
