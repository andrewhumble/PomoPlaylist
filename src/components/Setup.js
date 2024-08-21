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
  container: {
    position: "absolute",
    left: "50%",
    top: "48%",
    transform: "translate(-50%, -50%)",
    padding: "50px",
  },
  heading: {
    fontFamily: "Source Code Pro",
    fontWeight: "bold",
    fontSize: "5vh",
    color: "#ffffff",
    textAlign: "left",
  },
  continueButton: {
    backgroundColor: "#1AD760",
    color: "white",
    padding: "1.5vh 3vh",
    fontSize: "2.5vh",
    fontFamily: "Source Code Pro",
    fontWeight: 600,
  },
}));

const Setup = ({ nextStep, getActiveDevices, logout, values }) => {
  const classes = useStyles();

  const showNotification = (title, message, type) => {
    Store.addNotification({
      title,
      message,
      type,
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

  const handleContinue = (e) => {
    e.preventDefault();
    try {
      getActiveDevices();
      if (values.activeDevice) {
        nextStep();
      } else {
        throw new Error("No active device found");
      }
    } catch (error) {
      showNotification(
        "No active device found.",
        "Make sure your device is playing a song and try again. If the problem persists, logout and log back in.",
        "danger"
      );
    }
  };

  const handleNotify = () => {
    showNotification(
      "Why play a song?",
      "Playing a song activates Spotify so pomoplaylist knows which device to connect to.",
      "success"
    );
  };

  return (
    <div>
      <Header logout={logout} values={values} />
      <div className={classes.container}>
        <Grid container alignItems="center" justifyContent="flex-start">
          <Typography component="h1" variant="h4" className={classes.heading}>
            Play a song on your Spotify device, and then press continue.
            <Button
              className={classes.alertButton}
              onClick={handleNotify}
              startIcon={<HelpOutlineIcon />}
            />
          </Typography>
        </Grid>
        <Box mt={4} align="right">
          <FadeIn>
            <Button
              onClick={handleContinue}
              type="submit"
              variant="contained"
              className={classes.continueButton}
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
