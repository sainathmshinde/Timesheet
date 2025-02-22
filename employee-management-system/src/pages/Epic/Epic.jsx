import React from "react";
import WithLayout from "../../components/layout/WithLayout";
import EpicTable from "../../datatables/EpicTable";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import CustomButton from "../../UI/Button/CustomButton";

const Epic = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/createUpdateProject");
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
          <h1>Projects</h1>
        </Box>
        <Box>
          <CustomButton label="Create Project" onClick={handelClick} />
        </Box>
      </Box>
      <div>
        <EpicTable />
      </div>
    </div>
  );
};
export default WithLayout(Epic);
