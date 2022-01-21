import React from "react";

import "react-spotify-auth/dist/index.css";
import logo from "/Users/andrewhumble/Documents/GitHub/pomoplaylist/src/favicon.ico";

import {
  Button,
  Box,
  Typography,
  Grid,
  makeStyles,
  classes,
} from "@material-ui/core";

const Setup = ({ nextStep, logout, homeClick }) => {
  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const Logout = (e) => {
    e.preventDefault();
    logout();
  };

  const Home = (e) => {
    e.preventDefault();
    homeClick();
  };

  const useStyles = makeStyles((theme) => ({
    right: {
      marginLeft: "auto",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Box>
        <Box mt={2.5} ml={2.5} mr={2.5}>
          <Grid container alignItems="center">
            <Grid>
              <img src={logo} alt="Logo" width="20" height="20" />
            </Grid>
            <Grid>
              <Box ml={0.75}>
                <Typography
                  component="h1"
                  variant="h4"
                  align="left"
                  style={{
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "#1DB954",
                  }}
                  onClick={Home}
                >
                  pomoplaylist
                </Typography>
              </Box>
            </Grid>
            <Grid className={classes.right}>
              <Button
                onClick={Continue}
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#F2545B",
                  padding: "4px 10px",
                  fontSize: "12px",
                }}
              >
                logout
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
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
