import React, { useState } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import Cookies from "js-cookie";
import Header from "./Header";
import { SpotifyAuth } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";
import Typist from "react-typist";
import styles from "/Users/andrewhumble/Documents/GitHub/pomoplaylist/src/authStyle.module.css";
import logoImg from "/Users/andrewhumble/Documents/GitHub/pomoplaylist/src/favicon.ico";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import FadeIn from "./FadeIn";

const useStyles = makeStyles(() => ({
  logoStyle: {
    fontFamily: "Source Code Pro",
    fontWeight: "900",
    color: "#FFFFFF",
    fontSize: "60px",
  },
  stepStyle: {
    color: "#1dd760",
  },
}));

const Authentication = ({
  nextStep,
  values,
  handleToken,
  getUserPlaylists,
  logout,
  handleTitleAnimation,
}) => {
  var [spotifyAuthToken] = useState();

  const { logoStyle } = useStyles();

  const Login = (token) => {
    handleToken({ token });
    getUserPlaylists({ token });
    nextStep();
  };

  const onHeaderTyped = () => {
    console.log("testing");
  };

  return (
    <div>
      <Header logout={logout} values={values} />
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
        <Box>
          <Grid item>
            <Box mb={6}>
              <Grid
                container
                spacing={6}
                justifyContent="center"
                alignItems="center"
              >
                <img src={logoImg} alt="Logo" width="50" height="50" />
                <Box ml={2}>
                  <Typography variant="h6" component="h1" className={logoStyle}>
                    <Typist
                      avgTypingDelay={100}
                      cursor={{
                        show: true,
                        blink: true,
                        element: "|",
                        hideWhenDone: true,
                        onTypingDone: onHeaderTyped,
                      }}
                    >
                      <Typist.Delay ms={500} />
                      PomoPlaylist
                    </Typist>
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Box>
            {Cookies.get("spotifyAuthToken") ? (
              <Box>
                <Typography
                  component="h6"
                  variant="h6"
                  align="center"
                  style={{
                    fontFamily: "Source Code Pro",
                    fontWeight: "",
                    fontSize: "20px",
                  }}
                >
                  logged in as
                </Typography>
                <SpotifyApiContext.Provider value={spotifyAuthToken}>
                  {Login({ spotifyAuthToken })}
                </SpotifyApiContext.Provider>
              </Box>
            ) : (
              // Display the login page
              <Box>
                <FadeIn>
                  <Box mt={4}>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="flex-end"
                      style={{
                        fontSize: "25px",
                        fontFamily: "Source Code Pro",
                      }}
                    >
                      <SpotifyAuth
                        // redirectUri="http://localhost:3000/pomoplaylist"
                        redirectUri="https://andrewhumble.github.io/pomoplaylist"
                        clientID="4e3911e72862411b8934b3ddc35e9d93"
                        scopes={[
                          "playlist-read-collaborative",
                          "user-modify-playback-state",
                          "user-read-playback-state",
                        ]} // either style will work
                        onAccessToken={Login}
                        showDialog={true}
                        btnClassName={styles.authButton}
                      />
                    </Grid>
                  </Box>
                </FadeIn>
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Authentication;
