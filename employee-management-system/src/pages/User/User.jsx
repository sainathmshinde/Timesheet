import React from "react";
import WithLayout from "../../components/layout/WithLayout";
import EpicTable from "../../datatables/EpicTable";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import CustomButton from "../../UI/Button/CustomButton";
import UserTable from "../../datatables/UserTable";

const User = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/createUpdateEpic");
  };
  return (
    <div sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <h1>Users</h1>
        </Box>
        <Box>
          <CustomButton label="Create User" onClick={handelClick} />
        </Box>
      </Box>
      <div>
        <UserTable />
      </div>
    </div>
  );
};
export default WithLayout(User);
