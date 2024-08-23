import React, { useState, useEffect } from "react";
import "react-spotify-auth/dist/index.css";
import Header from "./Header";
import { Button, Box, Typography, Grid, CircularProgress, makeStyles } from "@material-ui/core";
import "rsuite/dist/rsuite.min.css";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FadeIn from "./FadeIn";
import Cookies from "js-cookie";
import SpotifyWebApi from "spotify-web-api-js";

const useStyles = makeStyles(() => ({
  alertButton: {
    color: "grey",
    "&:hover": {
      color: "lightgrey",
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
    opacity: (props) => (props.isLoading ? 0.5 : 1),
  },
  loadingText: {
    color: "yellow",
    marginBottom: "1rem",
    fontFamily: "Source Code Pro",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    opacity: "0.8"
  },
  foundDevice: {
    color: "green",
    marginBottom: "1rem",
    fontFamily: "Source Code Pro",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  deviceText: {
    color: "#ffffff",
    marginBottom: "1rem",
    fontFamily: "Source Code Pro",
    fontWeight: "bold",
  },
}));

const Setup = ({ nextStep, logout, values }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeDevice, setActiveDevice] = useState(null);
  const classes = useStyles({ isLoading });

  const getActiveDevices = async () => {
    try {
      const spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(Cookies.get("spotifyAuthToken"));
      const response = await spotifyApi.getMyDevices();
      if (response.devices && response.devices.length > 0) {
        return response.devices;
      }
      return null;
    } catch (error) {
      console.error("Error fetching devices:", error);
      return null;
    }
  };

  useEffect(() => {
    let pollingInterval;

    const fetchDevices = async () => {
      try {
        const devices = await getActiveDevices();
        if (devices) {
          setActiveDevice(devices[0]); // Assuming the first device is the one you want
          setIsLoading(false); // Stop loading when device is found
          clearInterval(pollingInterval); // Stop polling once a device is found
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    // Poll every 3 seconds until a device is found
    if (isLoading) {
      pollingInterval = setInterval(fetchDevices, 3000);
    }

    // Clean up the interval when the component is unmounted
    return () => clearInterval(pollingInterval);
  }, [isLoading]);

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
    if (activeDevice) {
      nextStep();
    } else {
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
          <Typography variant="h4" className={classes.heading}>
            Play a song on your Spotify device, and then press continue.
            <Button
              className={classes.alertButton}
              onClick={handleNotify}
              startIcon={<HelpOutlineIcon />}
            />
          </Typography>
        </Grid>
        <Box mt={2} align="center">
          {isLoading ? (
            <Typography variant="h6" className={classes.loadingText}>
              <CircularProgress size={18} color="yellow" />
              Looking for device...
            </Typography>
          ) : activeDevice ? (
            <Typography variant="h6" className={classes.foundDevice}>
              > {activeDevice.name}
            </Typography>
          ) : (
            <Typography variant="h6" className={classes.loadingText}>
              No active device found.
            </Typography>
          )}
          <FadeIn>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button 
                onClick={handleContinue}
                type="submit"
                variant="contained"
                className={classes.continueButton}>
                  Continue
              </Button>
            </Box>
          </FadeIn>
        </Box>
      </div>
    </div>
  );
};

export default Setup;
