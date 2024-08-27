import React, { useState } from "react";
import { Button, Box, Typography, Grid, CircularProgress, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckIcon from "@mui/icons-material/Check";
import { Store } from "react-notifications-component";
import FadeIn from "./FadeIn";
import { usePomo } from "./PomoContext";
import useDevicePolling from "../hooks/useDevicePolling"; // Custom hook example

const Setup = () => {
  const { nextStep } = usePomo();
  const [isLoading, setIsLoading] = useState(true);
  const [activeDevice, setActiveDevice] = useState(null);

  // Custom hook for device polling
  useDevicePolling(setActiveDevice, setIsLoading);

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
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "48%",
        transform: "translate(-50%, -50%)",
        p: 4,
        textAlign: "left",
        width: { xs: "90%", sm: "60%", md: "40%" },
      }}
    >
      <Grid container alignItems="center" justifyContent="flex-start">
        <Typography variant="h4">
          Play a song on your Spotify device, and then press continue.
          <IconButton
            sx={{ color: "grey", "&:hover": { color: "lightgrey" } }}
            onClick={handleNotify}
          >
            <HelpOutlineIcon />
          </IconButton>
        </Typography>
      </Grid>
      <Box mt={2}>
        {isLoading ? (
          <Typography
            variant="h6"
            sx={{
              color: "yellow",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              opacity: 0.8,
              mb: 2,
            }}
          >
            <CircularProgress size={18} sx={{ color: "yellow" }} />
            Looking for device...
          </Typography>
        ) : activeDevice ? (
          <Typography
            variant="h6"
            sx={{
              color: "green",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              mb: 2,
            }}
          >
            <CheckIcon size={18} sx={{ color: "green" }} /> {activeDevice.name}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{
              color: "yellow",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              opacity: 0.8,
              mb: 2,
            }}
          >
            No active device found.
          </Typography>
        )}
        <FadeIn>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              onClick={handleContinue}
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#1AD760",
                color: "white",
                padding: "1.5vh 3vh",
                fontSize: "2.5vh",
                fontFamily: "Source Code Pro",
                fontWeight: 600,
                opacity: isLoading ? 0.5 : 1,
                alignItems: "flex-end",
                "&:hover": {
                  backgroundColor: "#1AD760",
                  opacity: 0.7,
                },
              }}
            >
              Continue
            </Button>
          </Box>
        </FadeIn>
      </Box>
    </Box>
  );
};

export default Setup;
