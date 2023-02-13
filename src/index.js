import React from "react";
import ReactDOM from "react-dom";
import Game from "./Game";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import {LeaderboardPage} from "./leaderboardPage";
import {About} from "./about";
import {ChangeLog} from "./changelog";

import "./styles/style.scss";


const root = ReactDOM.createRoot(
    document.getElementById("root")
  );


  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/changelog" element={<ChangeLog />} />
      </Routes>
    </BrowserRouter>
  );


registerServiceWorker();
