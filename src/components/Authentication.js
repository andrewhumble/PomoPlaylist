import "../App.css";
import React from "react";
import { SpotifyAuth } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";
import Typist from "react-typist";
import styles from "../authStyle.module.css";
import { Grid, Box, Typography } from "@material-ui/core";
import FadeIn from "./FadeIn";
import { ReactComponent as TomatoImg } from '../assets/tomato.svg';
import { usePomo } from "./PomoContext";

const Authentication = () => {
  const { nextStep, dispatch } = usePomo();

  const getRedirectUri = () => {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3000";
    } else {
      return "https://pomoplaylist.com";
    }
  }

  const Login = (token) => {
    dispatch({ type: "SET_FIELD", field: "accessToken", payload: token });
    nextStep();
  };

  const renderLogoSection = () => (
    <Grid container spacing={6} pb={5} justifyContent="center" alignItems="center">
      <TomatoImg alt="logo" width="3.5vw" height="3.5vw" />
      <Box ml={2}>
        <Typography
          variant="h3"
        >
          <Typist
            avgTypingDelay={100}
            cursor={{ show: true, blink: true, element: "|", hideWhenDone: true }}
          >
            <Typist.Delay ms={500} />
            pomoPlaylist
          </Typist>
        </Typography>
      </Box>
    </Grid>
  );

  const renderSpotifyAuth = () => (
    <FadeIn>
      <Box mt={4}>
        <Grid container justifyContent="center" alignItems="flex-end" style={{ fontSize: "2vw", fontFamily: "Source Code Pro" }}>
          <SpotifyAuth
            redirectUri={getRedirectUri()}
            clientID="4e3911e72862411b8934b3ddc35e9d93"
            scopes={[
              "playlist-read-collaborative",
              "user-modify-playback-state",
              "user-read-playback-state",
              "streaming",
              "app-remote-control",
              "user-read-email",
              "user-read-private"
            ]}
            onAccessToken={Login}
            showDialog={true}
            btnClassName={styles.authButton}
          />
        </Grid>
      </Box>
    </FadeIn>
  );

  const renderContent = () => (
    <Box>
      <Grid item>
        <Box mb={6}>{renderLogoSection()}</Box>
      </Grid>
      <Box>
        {renderSpotifyAuth()}
      </Box>
    </Box>
  );

  return (
    <div
      className="authentication"
      style={{
        position: "absolute",
        left: "50%",
        top: "43%",
        transform: "translate(-50%, -50%)",
        padding: "100",
      }}
    >
      {renderContent()}
    </div>
  );
};

export default Authentication;
