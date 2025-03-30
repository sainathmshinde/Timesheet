import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DownloadIcon from "@mui/icons-material/Download";

const fetchUsers = async ({ queryKey }) => {
  const [, page, recordsPerPage] = queryKey;
  const response = await axios.get(
    `http://localhost:9090/user/v1?pageNo=${
      page + 1
    }&recordsPerPage=${recordsPerPage}`
  );
  return response.data;
};

const fetchTimesheet = async (userId) => {
  const response = await axios.get(
    `http://localhost:9090/subtask/v1/timesheet/download?userId=${userId}&sortOrder=desc`,
    {
      responseType: "blob",
    }
  );

  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export default function UserTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page, rowsPerPage],
    queryFn: fetchUsers,
    keepPreviousData: true,
  });

  const handleDownload = (userId) => {
    queryClient.fetchQuery({
      queryKey: ["downloadTimesheet", userId],
      queryFn: () => fetchTimesheet(userId),
    });
  };

  const users = data?.data?.userListResponseDto || [];
  const totalRecords = data?.data?.totalElements || 0;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <CircularProgress />
        </div>
      )}
      {error && <Alert severity="error">Error: {error.message}</Alert>}

      {!isLoading && !error && users.length > 0 && (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="User table">
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <TableRow hover key={row.userId}>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell>{row.userName}</TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit User">
                        <IconButton
                          onClick={() => navigate(`/editUser/${row.userId}`)}
                        >
                          <ModeEditOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Download Timesheet">
                        <IconButton
                          onClick={() => handleDownload(row.userId)}
                          sx={{ mx: 0.5 }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
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
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(+event.target.value);
              setPage(0);
            }}
          />
        </>
      )}

      {!isLoading && !error && users.length === 0 && (
        <Alert severity="info" sx={{ margin: 2 }}>
          No Users found.
        </Alert>
      )}
    </Paper>
  );
}
