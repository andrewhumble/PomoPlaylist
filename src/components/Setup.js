import React from "react";

import "react-spotify-auth/dist/index.css";
import Header from "./Header";

import { Button, Box, Typography, Grid, Divider } from "@material-ui/core";
import "rsuite/dist/rsuite.min.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Setup = ({ nextStep, logout, values }) => {
  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const [activePage, setActivePage] = React.useState(5);

  return (
    <div>
      <Header logout={logout} values={values} />
      <div
        className="setup"
        style={{
          position: "absolute",
          left: "50%",
          top: "43%",
          transform: "translate(-50%, -50%)",
          padding: "100",
        }}
      >
        <Box mb={1} mt={2}>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            style={{
              fontFamily: "Source Code Pro",
              fontWeight: "bold",
              fontSize: "30px",
              color: "#1AD760",
              textAlign: "top",
            }}
          >
            open Spotify on your device and play a song
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            style={{
              fontFamily: "Source Code Pro",
              fontSize: "17px",
              color: "lightgrey",
            }}
          >
            In order for pomoplaylist to know which device to connect to, you
            need to play a song (it can be anything) on your desired device.
            This sends a signal to the program so it knows which device to
            connect to.
          </Typography>
        </Box>
        <Box mt={3} align="left">
          <Button
            onClick={Continue}
            type="submit"
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#1AD760",
              color: "white",
              padding: "6px 12px",
              fontSize: "18px",
              fontFamily: "Source Code Pro",
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
