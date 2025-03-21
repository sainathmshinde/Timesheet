import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

const TaskPopup = ({ open, handleClose, taskId }) => {
  const [taskName, setTaskName] = useState("");
  const [taskData, setTaskData] = useState([]);

  const fetchTask = async (taskId) => {
    const response = await fetch(
      `http://localhost:9090/task/v1?pageNo=1&recordsPerPage=1000&task_id=${taskId}`
    );

    const data = await response.json();
    setTaskData(data.data.taskListResponseDto[0]);
    setTaskName(data.data.taskListResponseDto[0].taskName);
  };

  useEffect(() => {
    if (taskId) {
      fetchTask(taskId);
      setTaskName("");
    }
  }, [taskId]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:9090/task/v1`, {
        name: taskName,
        taskId: taskId,
      });

      console.log("Task updated:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "500px",
          padding: "20px",
          borderRadius: "12px",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Update Task
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          margin="dense"
          variant="outlined"
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "16px",
              padding: "12px",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              width: "100%",
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskPopup;
