import { Box } from "@mui/material";
import React from "react";

const Feed = ({ children }) => {
  return (
    <Box bgcolor="yellow" flex={4} p={2}>
      {children}
    </Box>
  );
};

export default Feed;
