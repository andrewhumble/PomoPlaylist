import SpotifyWebApi from "spotify-web-api-js";
import Cookies from "js-cookie";

const spotifyApi = new SpotifyWebApi();

const SpotifyService = {
    pause: (state, dispatch) => {
        spotifyApi.setAccessToken(state.accessToken);
        spotifyApi.getMyCurrentPlaybackState().then((response) => {
            dispatch({
                type: "SET_FIELD",
                field: "pausePosition",
                payload: response.progress_ms,
            });
        }).then(() => {
            spotifyApi.pause().then(() => {
                dispatch({ type: "SET_FIELD", field: "playing", payload: false });
            }).catch((e) => console.log(e));
        }).catch((e) => console.log(e));
    },
    
    resume: (state, dispatch) => {
        spotifyApi.setAccessToken(state.accessToken);
        spotifyApi.play().then(() => {
            dispatch({ type: "SET_FIELD", field: "playing", payload: true });
        }).catch((e) => console.log(e));
    },

    play: (state, dispatch) => {
        spotifyApi.setAccessToken(state.accessToken);
        spotifyApi.play({
            context_uri: "spotify:playlist:" + state.choiceId,
            position_ms: state.pausePosition,
        }).then(() => {
            dispatch({ type: "SET_FIELD", field: "playing", payload: true });
        }).catch((e) => console.log(e));
    },

    getNowPlayingItem: async (state) => {
        spotifyApi.setAccessToken(state.accessToken);
        const response = await spotifyApi.getMyCurrentPlayingTrack();
        if (response && response.is_playing) {
            const item = response.item;
            return {
                isPlaying: response.is_playing,
                title: item.name,
                artist: item.artists.map((artist) => artist.name).join(", "),
                albumImageUrl: item.album.images[0].url,
                songUrl: item.external_urls.spotify,
            };
        } else {
            return { isPlaying: false };
        }
    },

    getUserPlaylists: (state, dispatch) => {
        spotifyApi.setAccessToken(state.accessToken);
        spotifyApi.getUserPlaylists().then((response) => {
            const tempArr = response.items.map((item) => [item.name, item.id]);
            const tempHash = response.items.reduce((acc, item) => {
                acc[item.name] = {
                    id: item.id,
                    imageUrl: item.images[0]?.url,
                    length: item.tracks?.total,
                    link: item.external_urls?.spotify,
                };
                return acc;
            }, {});
            dispatch({
                type: "SET_PLAYLISTS",
                playlists: tempArr,
                playlistsHash: tempHash,
            });
        }).catch((e) => {
            console.log(e);
        });
    },

    getActiveDevices: async () => {
        try {
          spotifyApi.setAccessToken(Cookies.get("spotifyAuthToken"));
          const response = await spotifyApi.getMyDevices();
          if (response.devices && response.devices.length > 0) {
            return response.devices;
          }
          return null;
        } catch (error) {
          console.error("Error fetching devices:", error);
          return null;
        }
    }
};

export default SpotifyService;
