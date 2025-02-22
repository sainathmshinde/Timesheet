import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import WithLayout from "../../components/layout/WithLayout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../../UI/Notification";

const ProjectCreateUpdate = () => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    description: "",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      fetchProjects(projectId);
    }
  }, [projectId]);

  const fetchProjects = async (projectId) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/role/v1?pageNo=1&recordsPerPage=1000&role_id=${projectId}`
      );

      if (
        response.data.data &&
        response.data.data.projectResponseDtoList.length > 0
      ) {
        const project = response.data.data.projectResponseDtoList[0];
        setProjectData({
          projectName: project.roleName || "",
          description: project.description || "",
        });
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
      setNotification({
        open: true,
        message: "Failed to fetch project details",
        type: "error",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectData,
        projectId: projectId || "",
      };

      if (projectId) {
        await axios.put(`http://localhost:9090/project/v1`, payload);
        setNotification({
          open: true,
          message: "Project updated successfully!",
          type: "success",
        });
      } else {
        await axios.post(`http://localhost:9090/project/v1`, payload);
        setNotification({
          open: true,
          message: "Project created successfully!",
          type: "success",
        });
      }

      setTimeout(() => navigate("/projects"), 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification({
        open: true,
        message: "Error submitting project data",
        type: "error",
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        {projectId ? "Edit Project" : "Create Project"}
      </Typography>
      <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Project Name"
            name="projectName"
            value={projectData.projectName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            {projectId ? "Update" : "Create"}
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

export default WithLayout(ProjectCreateUpdate);
