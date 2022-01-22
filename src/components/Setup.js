import React from "react";

import "react-spotify-auth/dist/index.css";
import Header from "./Header";

import { Button, Box, Typography } from "@material-ui/core";

const Setup = ({ nextStep, logout, values }) => {
  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div>
      <Header logout={logout} values={values} />
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
        <Box mb={1} mt={8}>
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
        <Box mt={8} align="left">
          <Button
            onClick={Continue}
            type="submit"
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#1DB954",
              color: "white",
              padding: "6px 12px",
              fontSize: "18px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "600",
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
