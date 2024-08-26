import React from "react";
import CountDownTimer from "./CountDownTimer";
import { Typography } from "@material-ui/core";
import { usePomo } from "./PomoContext";

const LongBreak = () => {
  const { state } = usePomo();
  const hoursMinSecs = { hours: 0, minutes: state.longBreakTime, seconds: 0 };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: "translate(-50%, -50%)",
        fontFamily: "Source Code Pro",
        fontWeight: "bold",
        fontSize: "14vw",
        color: "#DB4437",
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
          fontSize: "3vw",
          color: "#4285F4",
        }}
      >
        Take a long break (Go for a walk, grab a snack, or meditate)
      </Typography>
      <CountDownTimer
        hoursMinSecs={hoursMinSecs}
      />
    </div>
  );
};

export default LongBreak;
