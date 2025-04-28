import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import WithLayout from "../../components/layout/WithLayout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../../UI/Notification";

const SprintCreateUpdate = () => {
  const navigate = useNavigate();
  const { sprintId } = useParams();
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const status = ["ACTIVE", "COMPLETED", "INPROGRESS"];

  const [sprintData, setSprintData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    sprintStatus: "ACTIVE",
    projectId: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedStartDate = `${sprintData.startDate}T00:00:00.000Z`;
    const formattedEndDate = `${sprintData.endDate}T23:59:59.999Z`;
    const payload = {
      name: sprintData.name,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      sprintStatus: sprintData.sprintStatus,
      projectId: sprintData.projectId || "",
    };
    try {
      setLoading(true);

      if (sprintId) {
        await axios.put(`http://localhost:9090/sprint/v1`, payload);
        setNotification({
          open: true,
          message: "Project updated successfully!",
          type: "success",
        });
      } else {
        await axios.post(`http://localhost:9090/sprint/v1`, payload);
        setNotification({
          open: true,
          message: "Sprint created successfully!",
          type: "success",
        });
      }

      setTimeout(() => navigate("/projects"), 2000);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response.data.apiStatus.status
      );
      setNotification({
        open: true,
        message: error.response.data.apiStatus.status,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSprint = async () => {
    try {
      const response = axios.get(``);
    } catch (error) {}
  };

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:9090/project/v1?pageNo=1&recordsPerPage=1000`
      );
      setProjectData(response.data.data.projectResponseDtoList);
    } catch (error) {
      console.log("error", error);
      setNotification({
        open: true,
        message: "Error while fetching project data",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSprintData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (sprintId) {
      fetchSprint();
      fetchProject();
    } else {
      fetchProject();
    }
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            fontSize="20px"
            fontWeight="bold"
          >
            {sprintId ? "Edit Sprint" : "Create Sprint"}
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
            <TextField
              fullWidth
              label="Sprint Name"
              name="name"
              value={sprintData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Start Date"
              name="startDate"
              type="date"
              value={sprintData.startDate}
              onChange={handleChange}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />{" "}
            <TextField
              fullWidth
              label="End Date"
              name="endDate"
              type="date"
              value={sprintData.endDate}
              onChange={handleChange}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <Select
              name="sprintStatus"
              label="Sprint Status"
              value={sprintData.sprintStatus}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              sx={{
                height: 56,
                width: "100%",
              }}
            >
              {status.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select a project</InputLabel>
              <Select
                name="projectId"
                label="Select a project"
                value={sprintData.projectId || ""}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                sx={{ height: 56, width: "100%" }}
              >
                {projectData?.map((project) => (
                  <MenuItem key={project.projectId} value={project.projectId}>
                    {project.projectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {sprintId ? "Update" : "Create"}
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
    </>
  );
};
export default WithLayout(SprintCreateUpdate);
