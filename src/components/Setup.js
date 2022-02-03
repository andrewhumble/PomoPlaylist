import React from "react";

import "react-spotify-auth/dist/index.css";
import Header from "./Header";

import { Button, Box, Typography, Grid, makeStyles } from "@material-ui/core";
import "rsuite/dist/rsuite.min.css";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

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
  logout,
  values,
}) => {
  const classes = useStyles();

  const Continue = (e) => {
    e.preventDefault();
    nextStep();
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
              fontSize: "40px",
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
          <Button
            onClick={Continue}
            type="submit"
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#1AD760",
              color: "white",
              padding: "6px 12px",
              fontSize: "20px",
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
