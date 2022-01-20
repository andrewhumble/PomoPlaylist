import React from "react";
import { SpotifyApiContext } from "react-spotify-api";
import Cookies from "js-cookie";

import { SpotifyAuth, Scopes } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";

import { Button, Grid, Box, Typography } from "@material-ui/core";

const Authentication = ({
  nextStep,
  values,
  handleToken,
  getUserPlaylists,
  logout,
}) => {
  var [token] = React.useState(Cookies.get("spotifyAuthToken"));

  const Login = (e) => {
    console.log(e);
    handleToken({ token });
    getUserPlaylists({ token });
    nextStep();
  };

  const Logout = () => {
    logout();
    //const { step } = this.state;
    //this.setState({ step: step });
  };

  return (
    <div>
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
            <Grid container spacing={6} justifyContent="center">
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
            {values.accessToken ? (
              <Box>
                <Typography
                  component="h6"
                  variant="h6"
                  align="center"
                  style={{
                    fontFamily: "Helvetica",
                    fontWeight: "",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  logged in as
                </Typography>
                <SpotifyApiContext.Provider value={token}>
                  {Login({ token })}
                </SpotifyApiContext.Provider>
                <Box mt={3}>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid>
                      <Button
                        onClick={() => {
                          handleToken({ token });
                          getUserPlaylists({ token });
                          nextStep();
                        }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{
                          backgroundColor: "#191414",
                          padding: "8px 50px",
                          fontSize: "18px",
                          width: "50%",
                        }}
                      >
                        next
                      </Button>
                    </Grid>
                    <Grid>
                      <Button
                        onClick={Logout}
                        type="submits"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{
                          backgroundColor: "#191414",
                          padding: "8px 50px",
                          fontSize: "18px",
                          width: "50%",
                        }}
                      >
                        logout
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
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
                      color: "black",
                    }}
                  >
                    sign in to continue
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Grid container justifyContent="center">
                    <SpotifyAuth
                      redirectUri="http://localhost:3000/pomoplaylist"
                      clientID="4e3911e72862411b8934b3ddc35e9d93"
                      scopes={[
                        Scopes.userModifyPlaybackState,
                        Scopes.playlistReadPrivate,
                        "user-modify-playback-state",
                        "playlist-read-private",
                      ]} // either style will work
                      onAccessToken={(token) => handleToken(token)}
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
