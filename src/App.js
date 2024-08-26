import React from "react";
import "./App.css";
import PomoPlay from "./components/PomoPlay";
import { Helmet } from "react-helmet";
import { ReactNotifications } from "react-notifications-component";
import { PomoProvider } from "./components/PomoContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <PomoProvider>
      <div className="App">
        <ReactNotifications />
        <Helmet>
          <style>{"body { background-color: #121212; }"}</style>
        </Helmet>
        {/* Set up routing */}
        <Routes>
          <Route path="/" element={<PomoPlay />} />
          {/* Add other routes here if needed */}
        </Routes>
      </div>
    </PomoProvider>
  );
}

export default App;
