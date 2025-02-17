import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({
  label,
  variant = "contained",
  color = "primary",
  size = "medium",
  onClick,
  disabled = false,
  startIcon,
  endIcon,
  fullWidth = false,
  sx = {},
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      sx={{ ...sx }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
