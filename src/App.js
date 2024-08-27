import React from "react";
import "./App.css";
import PomoPlay from "./components/PomoPlay";
import { Helmet } from "react-helmet";
import { ReactNotifications } from "react-notifications-component";
import { PomoProvider } from "./components/PomoContext";
import About from './components/About';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AppContainer from "./components/AppContainer";

function App() {
  return (
    <PomoProvider>
      <div className="App">
        <ReactNotifications />
        <Helmet>
          <style>{"body { background-color: #121212; }"}</style>
        </Helmet>
        {/* Set up routing */}
        <AppContainer>
          <Header />
          <Routes>
            <Route path="/" element={<PomoPlay />} />
            <Route path="/about" element={<About />} />  
          </Routes>
        </AppContainer>
      </div>
    </PomoProvider>
  );
}

export default App;
