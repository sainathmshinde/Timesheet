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

export default function EpicTable() {
  const [epicData, setEpicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const navigate = useNavigate();

  const fetchEpic = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:9090/epic/v1?pageNo=
${page + 1}&recordsPerPage=${rowsPerPage}`
      );
      if (response.data && response.data.data?.epicResponseDtoListList) {
        const transformedData = response.data.data.epicResponseDtoListList.map(
          (epic) => ({
            epicId: epic.epicId,
            epicName: epic.epicName,
            projectName: epic.projectListResponseDto?.projectName || "N/A",
          })
        );
        setEpicData(transformedData);
        setTotalRecords(
          response.data.data.totalRecords || transformedData.length
        );
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
    fetchEpic();
  }, [page, rowsPerPage]);

  const columns = [
    { id: "epicId", label: "Epic ID", minWidth: 100 },
    { id: "epicName", label: "Epic Name", minWidth: 100 },
    { id: "projectName", label: "Project Name", minWidth: 100 },
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

        {!loading && !error && epicData.length > 0 && (
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="Epic table">
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
                  {epicData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow hover key={row.epicId}>
                        {columns.map((column) => (
                          <TableCell key={column.id}>
                            {column.id === "action" ? (
                              <Button
                                onClick={() =>
                                  navigate(`/createUpdateEpic/${row.epicId}`)
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
              count={totalRecords}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}

        {!loading && !error && epicData.length === 0 && (
          <Alert severity="info" sx={{ margin: 2 }}>
            No Projects found.
          </Alert>
        )}
      </Paper>
    </div>
  );
}
