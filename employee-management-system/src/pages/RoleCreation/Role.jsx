import React, { useEffect, useState } from "react";
import WithLayout from "../../components/layout/WithLayout";
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
import RoleTable from "../../datatables/RoleTable";

export const Role = () => {
  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchRoles = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:9090/role/v1?pageNo=1&recordsPerPage=1000"
      );

      if (response.data && response.data.data.roleListResponseDtos) {
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
  }, []);

  const columns = [
    { id: "roleId", label: "Role ID", minWidth: 100 },
    { id: "roleName", label: "Role Name", minWidth: 200 },
    { id: "description", label: "Description", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
    { id: "status", label: "status", minWidth: 300 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div sx={{ width: "100%", overflow: "hidden" }}>
      <div>
        <h1>Roles</h1>
      </div>
      {/* <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {loading && (
          <div
            style={{ display: "flex", justifyContent: "center", padding: 20 }}
          >
            <CircularProgress />
          </div>
        )}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && (
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
                            {row[column.id] || "N/A"}
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
      </Paper> */}
      <div>
        <RoleTable />
      </div>
    </div>
  );
};

export default WithLayout(Role);
