import React, { useState } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import Cookies from "js-cookie";
import Header from "./Header";

import { SpotifyAuth } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";

import { Grid, Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  logoStyle: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "900",
    color: "#FFFFFF",
    fontSize: "40px",
  },
  logoStyleSecondary: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "450",
    color: "#FFFFFF",
    fontSize: "40px",
  },
}));

const Authentication = ({
  nextStep,
  values,
  handleToken,
  getUserPlaylists,
  logout,
}) => {
  var [spotifyAuthToken] = useState();

  const { logoStyle, logoStyleSecondary } = useStyles();

  const Login = (token) => {
    handleToken({ token });
    getUserPlaylists({ token });
    nextStep();
  };

  return (
    <div>
      <Header logout={logout} values={values} />
      <div
        className="authentication"
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          padding: "100",
        }}
      >
        <Box>
          <Box mb={4}>
            <Grid
              container
              spacing={6}
              justifyContent="center"
              alignItems="flex-end"
            >
              <Box ml={0.15}>
                <Typography
                  variant="h6"
                  component="h1"
                  className={logoStyleSecondary}
                  style={{
                    color: "#1db954",
                    fontWeight: "600",
                  }}
                >
                  Welcome to
                </Typography>
              </Box>
              <Box ml={1}>
                <Typography variant="h6" component="h1" className={logoStyle}>
                  Pomo
                </Typography>
              </Box>
              <Box ml={0.15}>
                <Typography
                  variant="h6"
                  component="h1"
                  className={logoStyleSecondary}
                  style={{
                    color: "grey",
                    fontWeight: "450",
                  }}
                >
                  Playlist
                </Typography>
              </Box>
            </Grid>
          </Box>
          <Box>
            {Cookies.get("spotifyAuthToken") ? (
              <Box>
                <Typography
                  component="h6"
                  variant="h6"
                  align="center"
                  style={{
                    fontFamily: "Helvetica",
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
                <Box mt={2}>
                  <Typography
                    component="h6"
                    variant="h6"
                    align="center"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: "300",
                      fontSize: "25px",
                      color: "white",
                    }}
                  >
                    sign in to continue
                  </Typography>
                </Box>
                <Box mt={3}>
                  <Grid container justifyContent="center" alignItems="flex-end">
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
                    />
                  </Grid>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Authentication;
