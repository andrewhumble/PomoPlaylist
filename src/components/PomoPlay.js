import React, { Component } from "react";
import Confirmation from "./Confirmation";
import Authentication from "./Authentication";
import Choose from "./Choose";
import Work from "./Work";
import ShortBreak from "./ShortBreak";
import LongBreak from "./LongBreak";
import Setup from "./Setup";
import Cookies from "js-cookie";

import "react-spotify-auth/dist/index.css";
import SpotifyWebApi from "spotify-web-api-js";

export default class PomoPlay extends Component {
  state = {
    step: 1,
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
  };

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  logout = () => {
    Cookies.remove("spotifyAuthToken", {
      path: "react-spotify-auth",
    });
    window.location = "/pomoplaylist";
  };

  // Goes home
  homeClick = () => {
    this.setState({ step: 1 });
  };

  // set current step
  setStep = (input) => {
    this.setState({ step: input });
  };

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  // stay on the same page
  sameStep = () => {
    const { step } = this.state;
    this.setState({ step: step });
  };

  handleTitleAnimation = () => {
    this.setState({ showLogin: true });
  };

  // handle field change
  handleChange = (input) => (e) => {
    if (Array.isArray([input])) {
      this.setState({ [input]: e.target.value });
      if ([input][0] === "choice") {
        this.setState({ choiceId: this.state.playlistsHash[e.target.value] });
      }
    } else {
      this.setState({ [input]: e.target.value });
    }
  };

  incrementSessionCount = () => {
    const { sessions } = this.state;
    this.setState({ sessions: sessions + 1 });
  };

  // handle token change
  handleToken = (input) => {
    this.setState({ accessToken: [input] });
  };

  clearToken = () => {
    this.setState({ accessToken: "FLAG" });
    console.log(this.state);
  };

  getUserPlaylists = (accessToken) => {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken.token);
    spotifyApi
      .getUserPlaylists()
      .then((response) => {
        var tempArr = [];
        var tempHash = {};
        for (var i = 0; i < response.items.length; i++) {
          tempHash[response.items[i].name] = response.items[i].id;
          var tempObj = [];
          tempObj.push(response.items[i].name);
          tempObj.push(response.items[i].id);
          tempArr.push(tempObj);
        }
        this.setState({ playlistsHash: tempHash });
        this.setState({ playlists: tempArr });
      })
      .catch((e) => {
        console.log(e);
        Cookies.remove("spotifyAuthToken", {
          path: "react-spotify-auth",
        });
        window.location = "/pomoplaylist";
      });
  };

  play = (choiceId) => {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(Cookies.get("spotifyAuthToken"));
    spotifyApi
      .play({
        context_uri: "spotify:playlist:" + choiceId,
        position_ms: this.state.pausePosition,
      })
      .then((response) => {
        console.log(response);
        this.setState({ playing: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  pause = (choiceId) => {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(Cookies.get("spotifyAuthToken"));
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      this.setState({ pausePosition: response.progress_ms });
    });
    spotifyApi
      .pause({
        context_uri: "spotify:playlist:" + choiceId,
      })
      .then((response) => {
        console.log(response);
        this.setState({ playing: false });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { step } = this.state;
    const {
      accessToken,
      choice,
      choiceId,
      playlistsHash,
      playlists,
      workTime,
      shortBreakTime,
      longBreakTime,
      playing,
      sessions,
      pausePosition,
      showLogin,
    } = this.state;
    const values = {
      accessToken,
      choice,
      playlists,
      playlistsHash,
      choiceId,
      workTime,
      shortBreakTime,
      longBreakTime,
      playing,
      sessions,
      pausePosition,
      showLogin,
    };

    switch (step) {
      case 1:
        return (
          <Authentication
            nextStep={this.nextStep}
            sameStep={this.sameStep}
            values={values}
            handleToken={this.handleToken}
            getUserPlaylists={this.getUserPlaylists}
            logout={this.logout}
            homeClick={this.homeClick}
            clearToken={this.clearToken}
            handleTitleAnimation={this.handleTitleAnimation}
          />
        );
      case 2:
        return (
          <Setup
            nextStep={this.nextStep}
            sameStep={this.sameStep}
            prevStep={this.prevStep}
            values={values}
            handleToken={this.handleToken}
            getUserPlaylists={this.getUserPlaylists}
            logout={this.logout}
            homeClick={this.homeClick}
            clearToken={this.clearToken}
            handleTitleAnimation={this.handleTitleAnimation}
          />
        );
      case 3:
        return (
          <Choose
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            logout={this.logout}
            homeClick={this.homeClick}
          />
        );
      case 4:
        return (
          <Confirmation
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
            play={this.play}
            handleChange={this.handleChange}
            logout={this.logout}
            homeClick={this.homeClick}
          />
        );
      case 5:
        return (
          <Work
            values={values}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            pause={this.pause}
            play={this.play}
            setStep={this.setStep}
            incrementSessionCount={this.incrementSessionCount}
            logout={this.logout}
            homeClick={this.homeClick}
          />
        );
      case 6:
        return (
          <ShortBreak
            values={values}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            pause={this.pause}
            play={this.play}
            setStep={this.setStep}
            incrementSessionCount={this.incrementSessionCount}
            logout={this.logout}
            homeClick={this.homeClick}
          />
        );
      case 7:
        return (
          <LongBreak
            values={values}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            pause={this.pause}
            play={this.play}
            setStep={this.setStep}
            incrementSessionCount={this.incrementSessionCount}
            logout={this.logout}
            homeClick={this.homeClick}
          />
        );
      default:
      // do nothing
    }
  }
}
