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
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export default function SprintTable() {
  const [sprintData, setSprintData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [expandedRows, setExpandedRows] = useState({});

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

  useEffect(() => {
    fetchSprints();
  }, [page, rowsPerPage]);

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
                                    <TableCell>{task.taskName}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell>{task.status}</TableCell>
                                    <TableCell>{task.priority}</TableCell>
                                    <TableCell>{task.epic}</TableCell>
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
