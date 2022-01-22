import React, { useEffect, useState } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import Cookies from "js-cookie";
import Header from "./Header";

import { SpotifyAuth } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";

import { Grid, Box, Typography } from "@material-ui/core";

const Authentication = ({
  nextStep,
  values,
  handleToken,
  getUserPlaylists,
  sameStep,
  clearToken,
  logout,
}) => {
  var [spotifyAuthToken, setSpotifyAuthToken] = useState();

  console.log(spotifyAuthToken);

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
              <Typography
                component="h1"
                variant="h4"
                align="center"
                style={{
                  fontFamily: "Helvetica",
                  fontWeight: "bold",
                  fontSize: "30px",
                  color: "#1DB954",
                }}
              >
                welcome to pomoplaylist
              </Typography>
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
                      fontFamily: "Helvetica",
                      fontWeight: "",
                      fontSize: "20px",
                    }}
                  >
                    sign in to continue
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Grid container justifyContent="center" alignItems="flex-end">
                    <SpotifyAuth
                      redirectUri="http://localhost:3000/pomoplaylist"
                      // redirectUri="https://andrewhumble.github.io/pomoplaylist"
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
