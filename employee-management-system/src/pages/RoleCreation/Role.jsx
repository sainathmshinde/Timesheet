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
import CustomButton from "../../components/Button/CustomButton";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export const Role = () => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/createUpdate");
  };

  return (
    <div sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <h1>Roles</h1>
        </Box>
        <Box>
          <CustomButton label="Create Role" onClick={handelClick} />
        </Box>
      </Box>
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
        <RoleTable
          sx={{
            flex: "1 1 auto",
            height: "calc(100vh - 140px)",
            maxHeight: "calc(100vh - 140px)",
            overflow: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default WithLayout(Role);
