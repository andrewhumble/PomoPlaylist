import React from "react";

import "react-spotify-auth/dist/index.css";
import Header from "./Header";

import {
  Button,
  Box,
  Typography,
  Grid,
  Divider,
  makeStyles,
} from "@material-ui/core";
import "rsuite/dist/rsuite.min.css";
import { ReactNotifications, Store } from "react-notifications-component";
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

const Setup = ({ nextStep, logout, values }) => {
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

  const classes = useStyles();

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
        <Typography
          component="h1"
          variant="h4"
          align="center"
          style={{
            fontFamily: "Source Code Pro",
            fontWeight: "bold",
            fontSize: "50px",
            color: "#ffffff",
            textAlign: "top",
          }}
        >
          Play a song on your Spotify device{""}
          <Button
            className={classes.alertButton}
            onClick={Notify}
            startIcon={<HelpOutlineIcon />}
          ></Button>
        </Typography>
        <Box mt={4} align="center">
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
