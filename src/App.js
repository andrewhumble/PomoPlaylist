import React from "react";
import "./App.css";
import PomoPlay from "./components/PomoPlay";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <style>{"body { background-color: #121212; }"}</style>
      </Helmet>
      <PomoPlay />
    </div>
  );
}

export default App;
