import React from "react";
import "./App.css";
import PomoPlay from "./components/PomoPlay";
import { Helmet } from "react-helmet";
import { ReactNotifications } from "react-notifications-component";

function App() {
  return (
    <div className="App">
      <ReactNotifications />
      <Helmet>
        <style>{"body { background-color: #121212; }"}</style>
      </Helmet>
      <PomoPlay />
    </div>
  );
}

export default App;
