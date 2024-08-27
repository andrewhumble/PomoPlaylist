import React from "react";
import { Box } from "@material-ui/core";

const AppContainer = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: "800px", // Set the maximum width for your content
        margin: "0 auto", // Center the container
      }}
    >
      {children}
    </Box>
  );
};

export default AppContainer;
