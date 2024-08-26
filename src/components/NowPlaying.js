import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Link,
  CircularProgress,
  Avatar,
  Stack,
  Card,
  IconButton,
} from "@mui/material";
import { PlayArrow, Pause, SkipPrevious, SkipNext } from "@mui/icons-material";
import SpotifyLogo from "./SpotifyLogo";
import PlayingAnimation from "./PlayingAnimation";
import { usePomo } from "./PomoContext";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

const NowPlaying = () => {
  const { state, dispatch } = usePomo();
  const loading = false;
  const result = { isPlaying: true };
  const [player, setPlayer] = useState(undefined);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [position, setPosition] = useState(0); // Track the current position
  const [duration, setDuration] = useState(0); // Track the track's duration

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(state.accessToken);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        // Transfer playback to this device
        transferPlaybackToDevice(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (player_state) => {
        if (!player_state) {
          return;
        }

        setTrack(player_state.track_window.current_track);
        setPaused(player_state.paused);
        setPosition(player_state.position); // Set the current position
        setDuration(player_state.duration); // Set the duration of the track

        player.getCurrentState().then((player_state) => {
          !player_state ? setActive(false) : setActive(true);
        });
      });

      player.connect().then((success) => {
        if (success) {
          console.log("The Web Playback SDK successfully connected to Spotify!");
        } else {
          console.log("The Web Playback SDK failed to connect.");
        }
      });
    };
  }, [state.accessToken]);

  useEffect(() => {
    let interval;
    if (is_active && !is_paused) {
      interval = setInterval(() => {
        setPosition((prevPosition) => prevPosition + 1000); // Increment position every second
      }, 1000);
    }

    return () => clearInterval(interval); // Clean up interval on component unmount or pause
  }, [is_active, is_paused]);

  // Helper function to format time in mm:ss
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Function to transfer playback to a specific device
  const transferPlaybackToDevice = (device_id) => {
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.accessToken}`,
      },
      body: JSON.stringify({
        device_ids: [device_id],
        play: true, // Optional: Automatically start playing on the device
      }),
    }).then((response) => {
      if (!response.ok) {
        console.error("Failed to transfer playback", response.statusText);
      }
    });
  };

  const togglePlay = () => {
    player.togglePlay().then(() => {
      dispatch({ type: "SET_FIELD", field: "playing", payload: !state.playing });
    });
  };

  return (
    <Card
      sx={{
        width: { xs: "90%", sm: "700px" },
        bgcolor: "#575757",
        borderRadius: "40px",
        p: 2,
        boxShadow: 3,
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {loading ? (
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Stack direction="row" alignItems="center" spacing={2} sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SpotifyLogo />
          </Box>
          {result.isPlaying ? (
            <>
              <IconButton onClick={() => player.previousTrack()}>
                <SkipPrevious sx={{ fontSize: 32 }} />
              </IconButton>
              <Avatar
                src={current_track.album.images[0].url}
                alt={`${current_track.name} album art`}
                sx={{ width: 56, height: 56, borderRadius: "50%" }}
              />
              <Box sx={{ flex: 1, overflow: "hidden" }}>
                <Link href={current_track.album.images[0].url} target="_blank" underline="none">
                  <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {current_track.name}
                  </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {current_track.artists[0].name}
                </Typography>
                {/* Display the track position and duration */}
                <Typography variant="body2" color="text.secondary">
                  {`${formatTime(position)} / ${formatTime(duration)}`}
                </Typography>
              </Box>
              <IconButton onClick={togglePlay}>
                {is_paused ? <PlayArrow sx={{ fontSize: 32 }} /> : <Pause sx={{ fontSize: 32 }} />}
              </IconButton>
              <IconButton onClick={() => player.nextTrack()}>
                <SkipNext sx={{ fontSize: 32 }} />
              </IconButton>
              <PlayingAnimation hidden={is_paused} />
            </>
          ) : (
            <Typography variant="body2" color="text.secondary" fontWeight="medium">
              Currently Offline
            </Typography>
          )}
        </Stack>
      )}
    </Card>
  );
};

export default NowPlaying;
