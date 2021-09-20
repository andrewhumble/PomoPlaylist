import React, { Component } from 'react'
import Confirmation from './Confirmation'
import Authentication from './Authentication'
import Choose from './Choose'
import Work from './Work'
import ShortBreak from "./ShortBreak";
import LongBreak from "./LongBreak";


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
    workTime: "",
    shortBreakTime: "",
    longBreakTime: "",
    playing: false,
    sessions: 1,
  };

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
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
    this.setState({ accessToken: [input][0].token });
    //this.setState({ username: [input].token });
    console.log([input]);
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
      });
  };

  play = (choiceId) => {
    console.log(this.state.accessToken);
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(this.state.accessToken);
    spotifyApi
      .play({
        context_uri: "spotify:playlist:" + choiceId,
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
    console.log(this.state.accessToken);
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(this.state.accessToken);
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
    };

    switch (step) {
      case 1:
        return (
          <Authentication
            nextStep={this.nextStep}
            values={values}
            handleToken={this.handleToken}
            getUserPlaylists={this.getUserPlaylists}
          />
        );
      case 2:
        return (
          <Choose
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirmation
            prevStep={this.prevStep}
            nextStep={this.nextStep}
            values={values}
            play={this.play}
            handleChange={this.handleChange}
          />
        );
      case 4:
        return (
          <Work
            values={values}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            pause={this.pause}
            play={this.play}
            setStep={this.setStep}
            incrementSessionCount={this.incrementSessionCount}
          />
        );
      case 5:
        return (
          <ShortBreak
            values={values}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            pause={this.pause}
            play={this.play}
            setStep={this.setStep}
            incrementSessionCount={this.incrementSessionCount}
          />
        );
      case 6:
        return (
          <LongBreak
            values={values}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            pause={this.pause}
            play={this.play}
            setStep={this.setStep}
            incrementSessionCount={this.incrementSessionCount}
          />
        );
      default:
      // do nothing
    }
  }
}
