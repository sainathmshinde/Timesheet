import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../UI/Button/CustomButton";
import WithLayout from "../../components/layout/WithLayout";
import RoleTable from "../../datatables/RoleTable";
import SprintTable from "../../datatables/SprintTable";
import { SubTaskTable } from "../../datatables/SubTaskTable";
import { useParams } from "react-router-dom";

const SubTask = () => {
  const navigate = useNavigate();
  //const { taskId } = useParams();

  const handelClick = () => {
    // navigate("/subTask");
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
          <h1>SubTask</h1>
        </Box>
        <Box>
          <CustomButton label="Create SubTask" onClick={handelClick} />
        </Box>
      </Box>
      <div>
        <SubTaskTable />
      </div>
    </div>
  );
};

export default WithLayout(SubTask);
