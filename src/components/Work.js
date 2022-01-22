import React from "react";
import CountDownTimer from "./CountDownTimer";
import { Typography, Grid } from "@material-ui/core";
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
  const hoursMinSecs = { hours: 0, minutes: values.workTime, seconds: 5 };

  return (
    <div>
      <Header logout={logout} values={values} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Helvetica",
          fontWeight: "bold",
          fontSize: "200px",
          color: "#1DB954",
        }}
      >
        <Grid direction="column" alignItems="center" justifyContent="center">
          <Grid>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              style={{
                position: "absolute",
                left: "40%",
                top: "25%",
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: "30px",
                color: "#191414",
              }}
            >
              get to work
            </Typography>
          </Grid>
          <Grid>
            <CountDownTimer
              hoursMinSecs={hoursMinSecs}
              setStep={setStep}
              values={values}
              pause={pause}
              play={play}
              incrementSessionCount={incrementSessionCount}
            />
          </Grid>
          <Grid>
            <Typography
              component="p"
              align="center"
              style={{
                position: "absolute",
                left: "35%",
                top: "70%",
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: "15px",
                color: "darkgrey",
              }}
            >
              number of Pomodoros completed: {values.sessions - 1}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Work;
