import React from "react";
import CountDownTimer from "./CountDownTimer";
import { Typography } from "@material-ui/core";
import Header from "./Header";

const LongBreak = ({
  values,
  pause,
  nextStep,
  logout,
  play,
  prevStep,
  incrementSessionCount,
  setStep,
}) => {
  const hoursMinSecs = { hours: 0, minutes: values.longBreakTime, seconds: 7 };

  return (
    <div>
      <Header logout={logout} values={values} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Source Code Pro",
          fontWeight: "bold",
          fontSize: "200px",
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
            fontFamily: "Source Code Pro",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#4285F4",
          }}
        >
          take a long break
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
          align="center"
          style={{
            position: "absolute",
            left: "35%",
            top: "70%",
            fontFamily: "Source Code Pro",
            fontWeight: "bold",
            fontSize: "15px",
            color: "darkgrey",
          }}
        >
          Number of Pomodoros completed: {values.sessions - 1}
        </Typography>
      </div>
    </div>
  );
};

export default LongBreak;
