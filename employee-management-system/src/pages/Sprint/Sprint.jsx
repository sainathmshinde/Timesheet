import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../UI/Button/CustomButton";
import WithLayout from "../../components/layout/WithLayout";
import RoleTable from "../../datatables/RoleTable";
import SprintTable from "../../datatables/SprintTable";

const Sprint = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/sprintCreateUpdate");
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
          <h1>Sprints</h1>
        </Box>
        <Box>
          <CustomButton label="Create Sprint" onClick={handelClick} />
        </Box>
      </Box>
      <div>
        <SprintTable />
      </div>
    </div>
  );
};

export default WithLayout(Sprint);
