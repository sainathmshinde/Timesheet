import React from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";

const MultiSelectDropdown = ({
  label,
  options,
  selectedValues,
  setSelectedValues,
}) => {
  const handleChange = (event) => {
    setSelectedValues(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selectedValues}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

MultiSelectDropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  setSelectedValues: PropTypes.func.isRequired,
};

MultiSelectDropdown.defaultProps = {
  label: "Select Options",
  options: [],
  selectedValues: [],
};

export default MultiSelectDropdown;
