import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import WithLayout from "../../components/layout/WithLayout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MultiSelectDropdown from "../../UI/MultiSelect";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const RoleCreateUpdate = () => {
  const [roleData, setRoleData] = useState({
    roleName: "",
    description: "",
    status: "",
    roleId: "",
    statuss: [],
  });
  const [selectedOptions, setSelectedOptions] = useState([]);

  const navigate = useNavigate();
  const { roleId } = useParams();

  useEffect(() => {
    if (roleId) {
      fetchRoles(roleId);
    }
  }, [roleId]);

  const fetchRoles = async (roleId) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/role/v1?pageNo=1&recordsPerPage=1000&role_id=${roleId}`
      );

      if (
        response.data.data &&
        response.data.data.roleListResponseDtos.length > 0
      ) {
        const role = response.data.data.roleListResponseDtos[0];
        setRoleData({
          roleName: role.roleName || "",
          description: role.description || "",
          status: role.status || "",
        });
        console.log("response", response);

        console.log("roleData", roleData);
      }
    } catch (error) {
      console.error("Error fetching role data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (roleId) {
        const updatedRoleData = { ...roleData, roleId: roleId || "" };
        console.log("updatedRoleData", updatedRoleData);
        await axios.put(`http://localhost:9090/role/v1`, updatedRoleData);
      } else {
        await axios.post(`http://localhost:9090/role/v1`, roleData);
      }

      console.log("Form Submitted:", roleData);
      navigate("/roles");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          {roleId ? "Edit Role" : "Create Role"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Role Name"
            name="roleName"
            value={roleData.roleName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={roleData.description}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={roleData.status}
            onChange={handleChange}
            margin="normal"
            required
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
          </TextField>
          <TextField
            fullWidth
            select
            label="Statuss"
            name="statuss"
            value={roleData.statuss}
            onChange={handleChange}
            margin="normal"
            required
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
          </TextField>
          <MultiSelectDropdown
            label="Select Status"
            options={options}
            selectedValues={selectedOptions}
            setSelectedValues={setSelectedOptions}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            {roleId ? "Update" : "Create"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default WithLayout(RoleCreateUpdate);
