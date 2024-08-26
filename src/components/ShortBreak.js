import React from "react";
import CountDownTimer from "./CountDownTimer";
import { Typography } from "@material-ui/core";
import { usePomo } from "./PomoContext";

const Success = () => {
  const { state } = usePomo();
  const hoursMinSecs = { hours: 0, minutes: state.shortBreakTime, seconds: 0 };

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
          fontSize: "3vw",
          color: "#4285F4",
        }}
      >
        Take a short break (Get some water, stretch, or walk around a bit)
      </Typography>
      <CountDownTimer
        hoursMinSecs={hoursMinSecs}
      />
    </div>
  );
};

export default Success;
