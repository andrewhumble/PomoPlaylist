import React, { useState, useEffect } from "react";
import CountDownTimer from "./CountDownTimer";
import { Typography, Grid, Box } from "@material-ui/core";
import Header from "./Header";

const Work = ({
  values,
  pause,
  nextStep,
  play,
  prevStep,
  logout,
  incrementSessionCount,
  setStep,
}) => {
  const hoursMinSecs = { hours: 0, minutes: values.workTime, seconds: 0 };

  const [state, setState] = useState({
    mobileView: false,
  });

  const { mobileView } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1000
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <div>
        <Header logout={logout} values={values} />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Helvetica",
            fontWeight: "bold",
            fontSize: "14vw",
            color: "#1AD760",
          }}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item>
              <Box mb={-4}>
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  style={{
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    fontSize: "3vw",
                    color: "#ffffff",
                  }}
                >
                  get to work
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <CountDownTimer
                hoursMinSecs={hoursMinSecs}
                setStep={setStep}
                values={values}
                pause={pause}
                play={play}
                incrementSessionCount={incrementSessionCount}
              />
            </Grid>
            <Grid item>
              <Box mt={-4}>
                <Typography
                  component="p"
                  align="center"
                  style={{
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    fontSize: "1.5vw",
                    color: "darkgrey",
                  }}
                >
                  number of Pomodoros completed: {values.sessions - 1}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  const displayMobile = () => {
    return (
      <div>
        <Header logout={logout} values={values} />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Helvetica",
            fontWeight: "bold",
            fontSize: "20vw",
            color: "#1AD760",
          }}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item>
              <Box mb={0}>
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  style={{
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    fontSize: "5vw",
                    color: "#ffffff",
                  }}
                >
                  get to work
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <CountDownTimer
                hoursMinSecs={hoursMinSecs}
                setStep={setStep}
                values={values}
                pause={pause}
                play={play}
                incrementSessionCount={incrementSessionCount}
              />
            </Grid>
            <Grid item>
              <Box mt={0}>
                <Typography
                  component="p"
                  align="center"
                  style={{
                    fontFamily: "Helvetica",
                    fontWeight: "bold",
                    fontSize: "3vw",
                    color: "darkgrey",
                  }}
                >
                  number of Pomodoros completed: {values.sessions - 1}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  return <div>{mobileView ? displayMobile() : displayDesktop()}</div>;
};

export default Work;
