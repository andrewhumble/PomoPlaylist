import React, { useState, useEffect } from "react";
import { usePomo } from "./PomoContext";
import SpotifyService from '../services/spotifyService';

const CountDownTimer = ({
  hoursMinSecs
}) => {
  const { state, dispatch } = usePomo();
  const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs;
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

  const setStep = () => {
    const timeForABreak = state.step === 4;
    if (timeForABreak) {
      const timeForALongBreak = state.sessions % 3 === 0 && state.sessions !== 0;
      if (timeForALongBreak) {
        dispatch({ type: "SET_STEP", payload: 6 });
      } else {
        dispatch({ type: "SET_STEP", payload: 5 });
      }
    }
    dispatch({ type: "SET_STEP", payload: 4 });
  };

  const incrementSessionCount = () => {
    dispatch({
      type: "SET_FIELD",
      field: "sessions",
      payload: state.sessions + 1,
    });
  };

  const tick = () => {
    if (parseInt(hrs) === 0 && parseInt(mins) === 0 && parseInt(secs) === 0) {
      if (state.playing === true) {
        if (state.sessions % 3 === 0 && state.sessions !== 0) {
          SpotifyService.pause(state, dispatch);
          setStep(7);
        } else {
          SpotifyService.pause(state, dispatch);
          setStep(6);
        }
      } else if (state.playing === false) {
        incrementSessionCount();
        SpotifyService.play(state, dispatch);
        setStep(5);
      }
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  useEffect(() => {
    let timerId;
    if (state.playing) {
      timerId = setInterval(() => tick(), 1000);
    }
    return () => clearInterval(timerId);
  }, [hrs, mins, secs, state.playing]);

  return (
    <p style={{ fontSize: "160px", margin: 0 }}>
      {`${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}
    </p>
  );
};

export default CountDownTimer;
