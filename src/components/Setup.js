import React from "react";

import "react-spotify-auth/dist/index.css";
import Header from "./Header";

import { Button, Box, Typography, Grid, makeStyles } from "@material-ui/core";
import "rsuite/dist/rsuite.min.css";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FadeIn from "./FadeIn";

const useStyles = makeStyles((theme) => ({
  alertButton: {
    color: "#1AD760",
    "&:hover": {
      color: "#139141",
    },
  },
}));

const Setup = ({
  nextStep,
  sameStep,
  handleToken,
  getUserPlaylists,
  homeClick,
  clearToken,
  handleTitleAnimation,
  getActiveDevices,
  logout,
  values,
}) => {
  const classes = useStyles();

  const Continue = (e) => {
    e.preventDefault();
    try {
      getActiveDevices();
      if (values.activeDevice) {
        nextStep();
      } else {
        throw new Error("No active device found");
      }
    } catch (error) {
      Store.addNotification({
        title: "No active device found.",
        message:
          "Make sure your device is playing a song and try again. If the problem persists, logout and log back in.",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  };

  const Notify = (e) => {
    Store.addNotification({
      title: "Why play a song?",
      message:
        "Playing a song activates Spotify so PomoPlaylist knows which device to connect to.",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  return (
    <div>
      <Header logout={logout} values={values} />
      <div
        className="setup"
        style={{
          position: "absolute",
          left: "50%",
          top: "48%",
          transform: "translate(-50%, -50%)",
          padding: "100",
        }}
      >
        <Grid container alignItems="right" justifyContent="right">
          <Typography
            component="h1"
            variant="h4"
            align="left"
            style={{
              fontFamily: "Source Code Pro",
              fontWeight: "bold",
              fontSize: "5vh",
              color: "#ffffff",
              textAlign: "top",
            }}
          >
            Play a song on your Spotify device, and then press continue{""}
            <Button
              className={classes.alertButton}
              onClick={Notify}
              startIcon={<HelpOutlineIcon />}
            ></Button>
          </Typography>
        </Grid>
        <Box mt={4} align="right">
          <FadeIn>
            <Button
              onClick={Continue}
              type="submit"
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "#1AD760",
                color: "white",
                padding: "1.5vh 3vh",
                fontSize: "2.5vh",
                fontFamily: "Source Code Pro",
                fontWeight: "600",
              }}
            >
              continue
            </Button>
          </FadeIn>
        </Box>
      </div>
    </div>
  );
};

export default Setup;
