import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import axios from "axios";
import Notification from "../UI/Notification";

export default function CreateTaskModal({
  open,
  handleClose,
  handleTaskAdded,
  sprintValues,
}) {
  const priorityOptions = ["LOW", "MEDIUM", "HIGH"];
  const statusOptions = ["TO_DO", "IN_PROGRESS", "COMPLETED", "DONE"];
  let sprint = sprintValues.selectedSprint;

  console.log("sprint_id", sprint.projectId);
  const [epicData, setEpicData] = useState([]);
  const [taskData, setTaskData] = useState({
    taskId: null,
    name: "",
    description: "",
    sprintId: null,
    projectId: null,
    status: "",
    priority: "",
    taskType: "DEVELOPMENT",
    userId: null,
    epicId: null,
  });

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [userData, setUserData] = useState([]);

  const fetchUsers = async () => {
    try {
      const response =
        await axios.get(`http://localhost:9090/user/v1?pageNo=1&recordsPerPage=1000
`);
      setUserData(response.data.data.userListResponseDto);
    } catch (error) {}
  };

  useEffect(() => {
    if (open && sprint) {
      setTaskData((prev) => ({
        ...prev,
        sprintId: sprint.id,
        projectId: sprint.projectId,
      }));
      fetchEpic(sprint.projectId);
      fetchUsers();
    }
  }, [open]);

  const fetchEpic = async (projectId) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/epic/v1?pageNo=1&recordsPerPage=1000&projectId=${projectId}`
      );
      setEpicData(response.data.data.epicResponseDtoListList || []);
    } catch (error) {
      console.error("Error fetching epics:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9090/task/v1",
        taskData
      );
      setNotification({
        open: true,
        message: "Task created successfully!",
        type: "success",
      });
      handleTaskAdded();
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      setNotification({
        open: true,
        message: "Error creating task!",
        type: "error",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.05)" } }}
      PaperProps={{
        style: {
          borderRadius: "12px",
          boxShadow: "none",
          padding: "10px",
        },
      }}
    >
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Name"
              name="name"
              value={taskData.name}
              onChange={handleChange}
              margin="dense"
              sx={{ mb: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              name="description"
              value={taskData.description}
              onChange={handleChange}
              margin="dense"
              sx={{ mb: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth margin="dense" sx={{ mb: 1 }}>
              <InputLabel id="status-label">Select Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={taskData.status}
                onChange={handleChange}
                label="Select Status"
              >
                {statusOptions.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sprint Name"
              value={sprint?.name || ""}
              placeholder={sprint?.name || ""}
              disabled
              margin="dense"
              sx={{ mb: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project Name"
              value={sprint?.projectName || ""}
              disabled
              margin="dense"
              sx={{ mb: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth margin="dense" sx={{ mb: 1 }}>
              <InputLabel id="priority-label">Select Priority</InputLabel>
              <Select
                labelId="priority-label"
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                label="Select Priority"
              >
                {priorityOptions.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth margin="dense" sx={{ mb: 1 }}>
              <InputLabel id="epic-label">Select Epic</InputLabel>
              <Select
                labelId="epic-label"
                name="epicId"
                value={taskData.epicId}
                onChange={handleChange}
                label="Select Epic"
              >
                {epicData.map((epic) => (
                  <MenuItem key={epic.epicId} value={epic.epicId}>
                    {epic.epicName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth margin="dense" sx={{ mb: 1 }}>
              <InputLabel id="user-label">Select User</InputLabel>
              <Select
                labelId="user-label"
                name="userId"
                value={taskData.userId}
                onChange={handleChange}
                label="Select user"
              >
                {userData.map((user) => (
                  <MenuItem key={user.userId} value={user.userId}>
                    {user.userName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Notification
          open={notification.open}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, open: false })}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
