import "../App.css";
import React, { useState, useEffect } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import Cookies from "js-cookie";
import Header from "./Header";
import { SpotifyAuth } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";
import Typist from "react-typist";
import styles from "/Users/andrewhumble/projects/pomoplaylist/src/authStyle.module.css";
import logoImg from "/Users/andrewhumble/projects/pomoplaylist/src/favicon.ico";
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
  const [spotifyAuthToken] = useState();
  const { logoStyle, logoStyleMobile } = useStyles();
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () =>
      setMobileView(window.innerWidth < 700);

    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);

    return () => {
      window.removeEventListener("resize", setResponsiveness);
    };
  }, []);

  const Login = (token) => {
    handleToken({ token });
    getUserPlaylists({ token });
    nextStep();
  };

  const renderLogoSection = (isMobile) => (
    <Grid container spacing={6} justifyContent="center" alignItems="center">
      <img src={logoImg} alt="Logo" width="45vw" height="45vw" />
      <Box ml={2}>
        <Typography
          variant="h6"
          component="h1"
          className={isMobile ? logoStyleMobile : logoStyle}
        >
          <Typist
            avgTypingDelay={100}
            cursor={{ show: true, blink: true, element: "|", hideWhenDone: true }}
          >
            <Typist.Delay ms={500} />
            pomoplaylist
          </Typist>
        </Typography>
      </Box>
    </Grid>
  );

  const renderSpotifyAuth = (isMobile) => (
    <FadeIn>
      <Box mt={4}>
        <Grid container justifyContent="center" alignItems="flex-end" style={{ fontSize: "2vw", fontFamily: "Source Code Pro" }}>
          <SpotifyAuth
            redirectUri="http://localhost:3000/pomoplaylist"
            clientID="4e3911e72862411b8934b3ddc35e9d93"
            scopes={[
              "playlist-read-collaborative",
              "user-modify-playback-state",
              "user-read-playback-state",
            ]}
            onAccessToken={Login}
            showDialog={true}
            btnClassName={isMobile ? styles.authButtonMobile : styles.authButton}
          />
        </Grid>
      </Box>
    </FadeIn>
  );

  const renderContent = () => (
    <Box>
      <Grid item>
        <Box mb={6}>{renderLogoSection(mobileView)}</Box>
      </Grid>
      <Box>
        {Cookies.get("spotifyAuthToken") ? (
          <SpotifyApiContext.Provider value={spotifyAuthToken}>
            {Login({ spotifyAuthToken })}
          </SpotifyApiContext.Provider>
        ) : (
          renderSpotifyAuth(mobileView)
        )}
      </Box>
    </Box>
  );

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
        {renderContent()}
      </div>
    </div>
  );
};

export default Authentication;
