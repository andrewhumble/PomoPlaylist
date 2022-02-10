import "../App.css";

import React, { useState, useEffect } from "react";
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
    fontSize: "4vw",
  },
  stepStyle: {
    color: "#1dd760",
  },
  logoStyleMobile: {
    fontFamily: "Menlo",
    fontWeight: "900",
    color: "#FFFFFF",
    fontSize: "12vw",
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

  const { logoStyle, logoStyleMobile } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
  });

  const { mobileView } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 700
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const Login = (token) => {
    handleToken({ token });
    getUserPlaylists({ token });
    nextStep();
  };

  const onHeaderTyped = () => {
    console.log("testing");
  };

  const displayDesktop = () => {
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
                  <img src={logoImg} alt="Logo" width="45vw" height="45vw" />
                  <Box ml={2}>
                    <Typography
                      variant="h6"
                      component="h1"
                      className={logoStyle}
                    >
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
                          fontSize: "2vw",
                          fontFamily: "Source Code Pro",
                        }}
                      >
                        <SpotifyAuth
                          // redirectUri="http://localhost:3000/pomoplaylist"
                          // redirectUri="http://172.20.217.131:3000/pomoplaylist"
                          // redirectUri="http://192.168.1.122:3000/pomoplaylist"
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

  const displayMobile = () => {
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
                  <img src={logoImg} alt="Logo" width="45vw" height="45vw" />
                  <Box ml={2}>
                    <Typography
                      variant="h6"
                      component="h1"
                      className={logoStyleMobile}
                    >
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
                          fontSize: "2vw",
                          fontFamily: "Source Code Pro",
                        }}
                      >
                        <SpotifyAuth
                          redirectUri="http://192.168.1.122:3000/pomoplaylist"
                          // redirectUri="https://andrewhumble.github.io/pomoplaylist"
                          clientID="4e3911e72862411b8934b3ddc35e9d93"
                          scopes={[
                            "playlist-read-collaborative",
                            "user-modify-playback-state",
                            "user-read-playback-state",
                          ]} // either style will work
                          onAccessToken={Login}
                          showDialog={true}
                          btnClassName={styles.authButtonMobile}
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

  return <div>{mobileView ? displayMobile() : displayDesktop()}</div>;
};

export default Authentication;
