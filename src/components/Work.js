import React from "react";
import CountDownTimer from "./CountDownTimer";
import {
  Typography,
} from "@material-ui/core";

const Work = ({ values, pause, nextStep, play, prevStep, incrementSessionCount, setStep }) => {
  const hoursMinSecs = { hours: 0, minutes: values.workTime, seconds: 5 };

  return (
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
      <Typography
        component="h1"
        variant="h4"
        align="center"
        style={{
          position: "absolute",
          left: "35%",
          top: "25%",
          fontFamily: "Helvetica",
          fontWeight: "bold",
          fontSize: "30px",
          color: "#191414",
        }}
      >
        GET TO WORK
      </Typography>
      <CountDownTimer
        hoursMinSecs={hoursMinSecs}
        setStep={setStep}
        values={values}
        pause={pause}
        play={play}
        incrementSessionCount={incrementSessionCount}
      />
      <Typography
        component="p"
        variant="p"
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
        Number of Pomodoros completed: {values.sessions - 1}
      </Typography>
    </div>
  );
};

export default Work;
