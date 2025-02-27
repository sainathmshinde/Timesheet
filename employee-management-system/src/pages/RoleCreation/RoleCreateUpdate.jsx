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

const statusOptions = ["Active", "Inactive", "Pending", "Suspended"];
const courseOptions = ["Math", "Science", "History", "English"];
const departmentOptions = ["HR", "Finance", "Engineering", "Marketing"];

const RoleCreateUpdate = () => {
  const [roleData, setRoleData] = useState({
    roleName: "",
    description: "",
    status: "",
    roleId: "",
    statuss: [],
    courses: [],
    departments: [],
  });

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
          statuss: role.statuss || [],
          courses: role.courses || [],
          departments: role.departments || [],
        });
        console.log("response", response);

        console.log("roleData", roleData);
      }
    } catch (error) {
      console.error("Error fetching role data:", error);
    }
  };

  // Universal Handler for ALL Multi-Select Fields
  const handleMultiSelectChange = (field, selectedValues) => {
    setRoleData((prev) => ({ ...prev, [field]: selectedValues }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...roleData,
        statuss: selectedOptions,
        roleId: roleId || "",
      };
      if (roleId) {
        const updatedRoleData = { ...roleData, roleId: roleId || "" };
        console.log("updatedRoleData", updatedRoleData);
        await axios.put(`http://localhost:9090/role/v1`, payload);
      } else {
        await axios.post(`http://localhost:9090/role/v1`, payload);
      }

      console.log("Form Submitted:", roleData);
      navigate("/roles");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        {roleId ? "Edit Role" : "Create Role"}
      </Typography>
      <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
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
          <MultiSelectDropdown
            label="Select Status"
            options={statusOptions}
            selectedValues={roleData.statuss}
            setSelectedValues={(values) =>
              handleMultiSelectChange("statuss", values)
            }
          />

          <MultiSelectDropdown
            label="Select Courses"
            options={courseOptions}
            selectedValues={roleData.courses}
            setSelectedValues={(values) =>
              handleMultiSelectChange("courses", values)
            }
          />

          <MultiSelectDropdown
            label="Select Departments"
            options={departmentOptions}
            selectedValues={roleData.departments}
            setSelectedValues={(values) =>
              handleMultiSelectChange("departments", values)
            }
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
