import React from "react";

import "react-spotify-auth/dist/index.css";

import { Button, Box, Typography } from "@material-ui/core";

const Setup = ({ nextStep, logout }) => {
  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const Logout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      <Grid container spacing={6} justifyContent="center">
        <Box mb={1}>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            style={{
              fontFamily: "Helvetica",
              fontWeight: "bold",
              fontSize: "30px",
              color: "#darkgrey",
            }}
          >
            connect your device
          </Typography>
        </Box>
        <Box mt={2} mr={2} align="right">
          <Button
            onClick={Continue}
            type="submit"
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#F2545B",
              padding: "6px 9px",
              fontSize: "15px",
            }}
          >
            logout
          </Button>
        </Box>
      </Grid>
      <div
        className="setup"
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          transform: "translate(-50%, -50%)",
          padding: "100",
        }}
      >
        <Box mb={1}>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            style={{
              fontFamily: "Helvetica",
              fontWeight: "bold",
              fontSize: "30px",
              color: "#darkgrey",
            }}
          >
            connect your device
          </Typography>
        </Box>
        <Box mt={3}>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            style={{
              fontFamily: "Helvetica",
              fontSize: "15px",
              color: "grey",
            }}
          >
            in order for pomoplaylist to know which device to connect to, you
            need to play a song (it can be anything) on your desired device.
            this sends a signal to the program so it knows which device to.
          </Typography>
        </Box>
        <Box mt={3}>
          <Typography
            component="h1"
            variant="p"
            align="left"
            style={{
              fontWeight: "bold",
              fontFamily: "Helvetica",
              fontSize: "20px",
              color: "#1DB954",
            }}
          >
            so, play a song on your desired device, and then press continue!
          </Typography>
        </Box>
        <Box mt={4} align="left">
          <Button
            onClick={Continue}
            type="submit"
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#1DB954",
              padding: "8px 15px",
              fontSize: "18px",
            }}
          >
            continue
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Setup;
