import React from "react";
import CountDownTimer from "./CountDownTimer";
import {
  Typography,
} from "@material-ui/core";

const Success = ({ values, pause, nextStep, play, prevStep, incrementSessionCount, setStep }) => {
  const hoursMinSecs = { hours: 0, minutes: values.shortBreakTime, seconds: 6 };

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
        color: "#F4B400",
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
          color: "#4285F4",
        }}
      >
        take a short break
      </Typography>
      <CountDownTimer
        hoursMinSecs={hoursMinSecs}
        nextStep={nextStep}
        prevStep={prevStep}
        values={values}
        pause={pause}
        play={play}
        setStep={setStep}
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

export default Success;
