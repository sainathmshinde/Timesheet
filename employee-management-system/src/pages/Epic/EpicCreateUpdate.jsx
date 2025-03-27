import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import WithLayout from "../../components/layout/WithLayout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../../UI/Notification";
import { MenuItem } from "@mui/material";

const EpicCreateUpdate = () => {
  const [epicData, setEpicData] = useState({
    name: "",
    projectId: "",
  });

  const [projectData, setProjectData] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const navigate = useNavigate();
  const { epicId } = useParams();

  useEffect(() => {
    if (epicId) {
      fetchEpics(epicId);
    }
  }, [epicId]);

  const fetchEpics = async (epicId) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/epic/v1?pageNo=1&recordsPerPage=1000&epicId=${epicId}`
      );
      if (
        response.data.data &&
        response.data.data.epicResponseDtoListList.length > 0
      ) {
        const epic = response.data.data.epicResponseDtoListList[0];
        setEpicData({
          name: epic.epicName || "",
          projectId: epic.projectListResponseDto?.projectId || "",
        });
      }
    } catch (error) {
      console.error("Error fetching Epic data:", error);
      setNotification({
        open: true,
        message: "Failed to fetch Epic details",
        type: "error",
      });
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/project/v1?pageNo=1&recordsPerPage=1000`
      );
      setProjectData(response.data.data.projectResponseDtoList);
    } catch (error) {
      console.error("Error fetching Project data:", error);
      setNotification({
        open: true,
        message: "Failed to fetch Project details",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEpicData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...epicData,
        epicId: epicId || "",
      };

      if (epicId) {
        await axios.put(`http://localhost:9090/epic/v1`, payload);
        setNotification({
          open: true,
          message: "Epic updated successfully!",
          type: "success",
        });
      } else {
        await axios.post(`http://localhost:9090/epic/v1`, payload);
        setNotification({
          open: true,
          message: "Epic created successfully!",
          type: "success",
        });
      }

      setTimeout(() => navigate("/epics"), 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification({
        open: true,
        message: "Error submitting Epic data",
        type: "error",
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        {epicId ? "Edit Epic" : "Create Epic"}
      </Typography>
      <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Epic Name"
            name="name"
            value={epicData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            select
            label="Select Project"
            name="projectId"
            value={epicData.projectId}
            onChange={handleChange}
            margin="normal"
            required
          >
            <MenuItem value="" disabled>
              Select a Project
            </MenuItem>
            {projectData.map((project) => (
              <MenuItem key={project.projectId} value={project.projectId}>
                {project.projectName}
              </MenuItem>
            ))}
          </TextField>
          {/* <FormControl fullWidth>
            <InputLabel>Select a Project</InputLabel>
            <Select
              label="Select Project"
              name="projectId"
              value={epicData.projectId}
              onChange={handleChange}
              margin="normal"
              required
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select a Project
              </MenuItem>
              {projectData.map((project) => (
                <MenuItem key={project.projectId} value={project.projectId}>
                  {project.projectName}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            {epicId ? "Update" : "Create"}
          </Button>
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

export default WithLayout(EpicCreateUpdate);
