import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Notification = ({ open, message, type, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ marginTop: 5 }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{
          bgcolor:
            type === "success"
              ? "#4CAF50"
              : type === "error"
              ? "#F44336"
              : "#2196F3",
          color: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
