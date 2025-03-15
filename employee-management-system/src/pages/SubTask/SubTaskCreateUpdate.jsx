import React, { useEffect, useState } from "react";
import WithLayout from "../../components/layout/WithLayout";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../../UI/Notification";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  Grid,
  MenuItem,
} from "@mui/material";

const SubTaskCreateUpdate = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const [subTaskData, setSubTaskData] = useState({
    name: "",
    status: "",
    userId: "",
    reporterId: "",
    budgetedHours: "",
    actualHours: "",
    startDate: "",
    endDate: "",
  });

  const status = ["TO_DO", "IN_PROGRESS", "COMPLETED", "DONE"];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userResponse = await fetch(
        `http://localhost:9090/user/v1?pageNo=1&recordsPerPage=1000`
      ).then((res) => res.json());

      const userList = userResponse?.data?.userListResponseDto || [];
      setUserData(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
      setNotification({
        open: true,
        message: "User API not working",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("subTaskData", subTaskData);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Typography variant="h5" fontSize="20px" fontWeight="bold">
          {taskId ? "Update SubTask" : "Create SubTask"}
        </Typography>
      </Box>

      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          bgcolor: "white",
          mx: "auto",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="SubTask Name"
                name="name"
                value={subTaskData.name}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={subTaskData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={subTaskData.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="status-label">Select Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={subTaskData.status}
                  onChange={handleChange}
                  label="Select Status"
                >
                  <MenuItem value="" disabled>
                    Select Status
                  </MenuItem>
                  {status.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="user-label">Select User</InputLabel>
                <Select
                  labelId="user-label"
                  name="userId"
                  value={subTaskData.userId}
                  onChange={handleChange}
                  label="Select User"
                >
                  <MenuItem value="" disabled>
                    Select User
                  </MenuItem>
                  {userData.map((user) => (
                    <MenuItem key={user.userId} value={user.userId}>
                      {user.userName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="reporter-label">Select Reporter</InputLabel>
                <Select
                  labelId="reporter-label"
                  name="reporterId"
                  value={subTaskData.reporterId}
                  onChange={handleChange}
                  label="Select Reporter"
                >
                  <MenuItem value="" disabled>
                    Select Reporter
                  </MenuItem>
                  {userData.map((user) => (
                    <MenuItem key={user.userId} value={user.userId}>
                      {user.userName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Budgeted Hours"
                name="budgetedHours"
                type="number"
                value={subTaskData.budgetedHours}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Actual Hours"
                name="actualHours"
                type="number"
                value={subTaskData.actualHours}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {taskId ? "Create" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Container>
  );
};

export default WithLayout(SubTaskCreateUpdate);
