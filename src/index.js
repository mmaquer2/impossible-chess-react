import React from "react";
import ReactDOM from "react-dom";
import Game from "./Game";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/style.scss";

ReactDOM.render(<Game />, document.getElementById("root"));
registerServiceWorker();
