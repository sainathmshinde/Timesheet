import React, { useState, useEffect } from "react";
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
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "../components/icons/EditIcon";

export default function RoleTable() {
  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  const fetchRoles = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:9090/role/v1?pageNo=${
          page + 1
        }&recordsPerPage=${rowsPerPage}`
      );

      if (response.data && response.data.data?.roleListResponseDtos) {
        setRoleData(response.data.data.roleListResponseDtos);
      } else {
        setError("Invalid API response structure.");
      }
    } catch (err) {
      setError("Error fetching roles: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [page, rowsPerPage]);

  const columns = [
    { id: "roleId", label: "Role ID", minWidth: 100 },
    { id: "roleName", label: "Role Name", minWidth: 100 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {loading && (
          <div
            style={{ display: "flex", justifyContent: "center", padding: 20 }}
          >
            <CircularProgress />
          </div>
        )}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && roleData.length > 0 && (
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="role table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roleData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover key={row.roleId}>
                        {columns.map((column) => (
                          <TableCell key={column.id}>
                            {column.id === "action" ? (
                              <Button
                                onClick={() =>
                                  navigate(`/createUpdate/${row.roleId}`)
                                }
                              >
                                <EditIcon />
                              </Button>
                            ) : (
                              row[column.id] || "N/A"
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={roleData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}

        {!loading && !error && roleData.length === 0 && (
          <Alert severity="info" sx={{ margin: 2 }}>
            No roles found.
          </Alert>
        )}
      </Paper>
    </div>
  );
}
