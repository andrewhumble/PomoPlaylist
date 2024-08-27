import React, { useEffect } from "react";
import { usePomo } from "./PomoContext";
import Authentication from "./Authentication";
import Setup from "./Setup";
import Choose from "./Choose";
import Confirmation from "./Confirmation";
import Work from "./Work";
import ShortBreak from "./ShortBreak";
import LongBreak from "./LongBreak";
import SpotifyService from '../services/spotifyService';

const PomoPlay = () => {
  const { state, dispatch, logout } = usePomo();

  useEffect(() => {
    if (state.accessToken) {
      SpotifyService.getUserPlaylists(state, dispatch);
    }
  }, [state.accessToken]);

  const steps = [
    <Authentication />,
    <Setup />,
    <Choose />,
    <Confirmation />,
    <Work />,
    <ShortBreak />,
    <LongBreak />,
  ];

  return (
    <div>
      {steps[state.step] || null}
    </div>
  );
};

export default PomoPlay;
