import React, { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  step: 0,
  accessToken: "",
  choice: "",
  choiceId: "",
  playlists: [],
  playlistsHash: {},
  pausePosition: 0,
  workTime: "25",
  shortBreakTime: "5",
  longBreakTime: "10",
  playing: false,
  sessions: 1,
  showLogin: false,
  activeDevice: false,
  mobileView: false,
};

// Reducer function to handle state updates
const pomoReducer = (state, action) => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "SET_FIELD":
      return { ...state, [action.field]: action.payload };
    case "LOGOUT":
      return { ...state, step: 0, accessToken: "" };
    case "SET_PLAYLISTS":
      return { ...state, playlists: action.playlists, playlistsHash: action.playlistsHash };
    default:
      return state;
  }
};

// Create context
const PomoContext = createContext();

// PomoProvider component
export const PomoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pomoReducer, initialState);

  const nextStep = () => dispatch({ type: "NEXT_STEP" });
  const prevStep = () => dispatch({ type: "PREV_STEP" });
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location = "/";
  };

  return (
    <PomoContext.Provider value={{ state, dispatch, nextStep, prevStep, logout }}>
      {children}
    </PomoContext.Provider>
  );
};

// Custom hook to use the PomoContext
export const usePomo = () => useContext(PomoContext);
