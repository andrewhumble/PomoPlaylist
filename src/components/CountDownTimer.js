import React from "react";

const CountDownTimer = ({ hoursMinSecs, values, pause, play, incrementSessionCount, setStep }) => {
  const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs;
  const [[hrs, mins, secs], setTime] = React.useState([
    hours,
    minutes,
    seconds,
  ]);

  const tick = () => {
    if (hrs === 0 && parseInt(mins) === 0 && secs === 0) {
      if (values.playing === true) {
        console.log(values);
        if (values.sessions % 3 === 0 && values.sessions !== 0) {
          pause(values.choiceId);
          setStep(6);
        } else {
          pause(values.choiceId);
          setStep(5);
        }
      } else if (values.playing === false) {
        incrementSessionCount();
        play(values.choiceId);
        setStep(4);
      }
    }
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  //const reset = () =>
  //  setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div>
      <p>{`${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountDownTimer;
