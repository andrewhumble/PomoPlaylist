import React from "react";
import { Box } from "@material-ui/core";

const AppContainer = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: "800px", // Set the maximum width for your content
        margin: "0 auto", // Center the container
        padding: "0 20px", // Optional padding for better spacing
      }}
    >
      {children}
    </Box>
  );
};

export default AppContainer;
