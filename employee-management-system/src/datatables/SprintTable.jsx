import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Alert,
  Button,
  Collapse,
  IconButton,
  Select,
  MenuItem,
  Tooltip, // Moved Tooltip here to avoid duplicate import
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CreateTaskPopup from "../components/CreateTaskPopup";
import EditIcon from "../components/icons/EditIcon";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TaskPopup from "../components/TaskPopup";

export default function SprintTable() {
  const [sprintData, setSprintData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [expandedRows, setExpandedRows] = useState({});
  const [epicData, setEpicData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openTask, setOpenTask] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [selectedSprint, setSelectedSprint] = useState({
    id: null,
    name: "",
    projectId: null,
    projectName: "",
  });

  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleEditClick = (taskId) => {
    setSelectedTaskId(taskId);
    setOpenTask(true);
  };

  const handleClose = () => {
    setOpenTask(false);
    setSelectedTaskId(null);
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchSprints();
  }, [page, rowsPerPage]);
  useEffect(() => {
    fetchEpic();
  }, []);

  const fetchSprints = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:9090/sprint/v1?pageNo=${
          page + 1
        }&recordsPerPage=${rowsPerPage}`
      );
      if (response.data && response.data.data?.sprintResponseListList) {
        setSprintData(response.data.data.sprintResponseListList);
        setTotalRecords(response.data.data.totalElements || 0);
      } else {
        setError("Invalid API response structure.");
      }
    } catch (err) {
      setError("Error fetching sprints: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  const taskStatusOptions = [
    "TO_DO",
    "IN_PROGRESS",
    "DEV_COMPLETED",
    "UAT_COMPLETED",
    "DEPLOYED",
    "CLOSED",
  ];

  const priority = ["LOW", "MEDIUM", "HIGH"];

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:9090/task/v1`, {
        taskId,
        status: newStatus,
      });

      setSprintData((prevData) =>
        prevData.map((sprint) => ({
          ...sprint,
          taskList: sprint.taskList.map((task) =>
            task.taskId === taskId ? { ...task, status: newStatus } : task
          ),
        }))
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  const handlePriorityChange = async (taskId, newPriority) => {
    try {
      await axios.put(`http://localhost:9090/task/v1`, {
        taskId,
        priority: newPriority,
      });

      setSprintData((prevData) =>
        prevData.map((sprint) => ({
          ...sprint,
          taskList: sprint.taskList.map((task) =>
            task.taskId === taskId ? { ...task, priority: newPriority } : task
          ),
        }))
      );
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const handleEpicChange = async (taskId, newEpicId) => {
    try {
      await axios.put(`http://localhost:9090/task/v1`, {
        taskId,
        epicId: newEpicId,
      });

      const selectedEpic = epicData.find((epic) => epic.epicId === newEpicId);
      const newEpicName = selectedEpic ? selectedEpic.epicName : "Unknown";
      console.log("epicName", newEpicName);
      setSprintData((prevData) =>
        prevData.map((sprint) => ({
          ...sprint,
          taskList: sprint.taskList.map((task) =>
            task.taskId === taskId
              ? { ...task, epicId: newEpicId, epic: newEpicName }
              : task
          ),
        }))
      );
    } catch (error) {
      console.error("Error updating epic:", error);
    }
  };

  const fetchEpic = async () => {
    try {
      const response =
        await axios.get(`http://localhost:9090/epic/v1?pageNo=1&recordsPerPage=1000
`);
      setEpicData(response.data.data.epicResponseDtoListList);
    } catch (error) {
    } finally {
    }
  };

  const handleExpandRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleTaskClick = (taskId) => {
    console.log("taskId", taskId);
    navigate(`/subTask/${taskId}`);
  };

  const handlePopup = (id, name, projectId, projectName) => {
    // e.preventDefault();
    setSelectedSprint({ id, name, projectId, projectName });
    setOpen(true);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {loading && (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <CircularProgress />
        </div>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && sprintData.length > 0 && (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>ID</TableCell>
                  <TableCell>Sprint Name</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Project Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sprintData.map((sprint) => (
                  <React.Fragment key={sprint.id}>
                    <TableRow>
                      <TableCell>
                        <IconButton onClick={() => handleExpandRow(sprint.id)}>
                          {expandedRows[sprint.id] ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{sprint.id}</TableCell>
                      <TableCell>{sprint.name}</TableCell>
                      <TableCell>{sprint.startDate}</TableCell>
                      <TableCell>{sprint.endDate}</TableCell>
                      <TableCell>{sprint.sprintStatus}</TableCell>
                      <TableCell>{sprint.projectName}</TableCell>
                      <TableCell>
                        <Tooltip title="Add Task" arrow>
                          <IconButton
                            sx={{
                              backgroundColor: "#1976d2",
                              color: "#fff",
                              borderRadius: "50%",
                              width: 40,
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: 2,
                              "&:hover": {
                                backgroundColor: "#1565c0",
                                transform: "scale(1.1)",
                                transition: "0.2s ease-in-out",
                              },
                            }}
                            onClick={(e) =>
                              handlePopup(
                                sprint.id,
                                sprint.name,
                                sprint.projectId,
                                sprint.projectName
                              )
                            }
                          >
                            <AddTaskIcon fontSize="medium" />
                          </IconButton>
                        </Tooltip>
                        <CreateTaskPopup
                          open={open}
                          handleClose={() => setOpen(false)}
                          handleTaskAdded={handleTaskAdded}
                          sprintValues={{
                            selectedSprint,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={7} style={{ padding: 0 }}>
                        <Collapse
                          in={expandedRows[sprint.id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Task ID</TableCell>
                                <TableCell>Task Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Priority</TableCell>
                                <TableCell>Epic</TableCell>
                                <TableCell>Task Type</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {sprint.taskList.length > 0 ? (
                                sprint.taskList.map((task) => (
                                  <TableRow key={task.taskId}>
                                    <TableCell>{task.taskId}</TableCell>
                                    <TableCell
                                      onClick={() =>
                                        handleTaskClick(task.taskId)
                                      }
                                      sx={{
                                        cursor: "pointer",
                                        color: blue,
                                        "&:hover": {
                                          color: "darkblue",
                                          backgroundColor: "white",
                                        },
                                      }}
                                    >
                                      {task.taskName}
                                      <IconButton
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleEditClick(task.taskId);
                                        }}
                                        sx={{ marginLeft: 1 }}
                                      >
                                        <EditOutlinedIcon fontSize="small" />
                                      </IconButton>
                                    </TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell>
                                      <Select
                                        value={task.status}
                                        onChange={(e) =>
                                          handleStatusChange(
                                            task.taskId,
                                            e.target.value
                                          )
                                        }
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                          minWidth: 120,
                                          fontSize: "0.875rem",
                                          backgroundColor: "white",
                                          "& .MuiSelect-select": {
                                            padding: "4px",
                                          },
                                        }}
                                      >
                                        {taskStatusOptions.map((status) => (
                                          <MenuItem
                                            key={status}
                                            value={status}
                                            sx={{ textAlign: "center" }}
                                          >
                                            {status}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </TableCell>
                                    <TableCell>
                                      <Select
                                        value={task.priority}
                                        onChange={(e) =>
                                          handlePriorityChange(
                                            task.taskId,
                                            e.target.value
                                          )
                                        }
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                          minWidth: 120,
                                          fontSize: "0.875rem",
                                          backgroundColor: "white",
                                          "& .MuiSelect-select": {
                                            padding: "4px",
                                          },
                                        }}
                                      >
                                        {priority.map((pri) => (
                                          <MenuItem
                                            key={pri}
                                            value={pri}
                                            sx={{ textAlign: "center" }}
                                          >
                                            {pri}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </TableCell>
                                    <TableCell>
                                      <Select
                                        value={task.epicId}
                                        onChange={(e) =>
                                          handleEpicChange(
                                            task.taskId,
                                            Number(e.target.value)
                                          )
                                        }
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                          minWidth: 120,
                                          fontSize: "0.875rem",
                                          backgroundColor: "white",
                                          "& .MuiSelect-select": {
                                            padding: "4px",
                                          },
                                        }}
                                      >
                                        {epicData.map((epic) => (
                                          <MenuItem
                                            key={epic.epicId}
                                            value={epic.epicId}
                                          >
                                            {epic.epicName}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </TableCell>
                                    <TableCell>{task.taskType}</TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={7} align="center">
                                    No tasks available.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TaskPopup
            open={openTask}
            handleClose={handleClose}
            taskId={selectedTaskId}
          />

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      {!loading && !error && sprintData.length === 0 && (
        <Alert severity="info" sx={{ margin: 2 }}>
          No Sprints found.
        </Alert>
      )}
    </Paper>
  );
}
