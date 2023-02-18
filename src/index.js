import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./utils/registerServiceWorker";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { LeaderboardPage } from "./pages/leaderboard";
import { About } from "./pages/about";
import { Changelog } from "./pages/changelog";
import "./assets/scss/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/changelog" element={<Changelog />} />
    </Routes>
  </BrowserRouter>
);

registerServiceWorker();
