import React, { Component } from "react";
import PropTypes from "prop-types";
import { Chess } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess not being a constructor
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../firebase-config";
import { DateTime } from "luxon";

const STOCKFISH = window.STOCKFISH;
const game = new Chess();

class Stockfish extends Component {
  static propTypes = { children: PropTypes.func };

  moveHistory = [];
  turnCount = 0;

  state = { fen: "start", c_history: this.moveHistory, turnCount: 0 };

  componentDidMount() {
    this.setState({ fen: game.fen(), moveHistory: [], turnCount: 0 });
    this.engineGame().prepareMove();
  }

  onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      // see if the move is legal
      game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

    
      console.log("human: " + sourceSquare + " " + targetSquare)
      
      let new_move = "Human: " + sourceSquare + " " + targetSquare
      this.moveHistory.push(new_move);
      
      if (this.moveHistory.length % 2 === 0) {
        this.turnCount = this.turnCount + 1;
      }
      console.log("turn count is: " + this.turnCount);
      // update move history and turn counter from player moves

      return new Promise((resolve) => {
        this.setState({ fen: game.fen() });
        resolve();
      }).then(() => this.engineGame().prepareMove());
    } catch (error) {
      console.log(error);
      if (game.isGameOver()) {
        console.log("king in checkmate the game is over, you have lost!");
      } else if (game.isCheck()) {
        console.log("A player cannot move: a king is in check state");
      } else if (game.turn() !== "b") {
        console.log("you cannot move because its not your turn");
      } else {
        console.log("you have an attempted an invalid move");
      }
      return;
    }
  };

  engineGame = (options) => {
    options = options || {};

    /// initialize the stockfish engine
    let engine =
      typeof STOCKFISH === "function"
        ? STOCKFISH()
        : new Worker(options.stockfishjs || "stockfish.js");
    let evaler =
      typeof STOCKFISH === "function"
        ? STOCKFISH()
        : new Worker(options.stockfishjs || "stockfish.js");
    let engineStatus = {};
    let time = { wtime: 3000, btime: 3000, winc: 1500, binc: 1500 };
    let playerColor = "black";
    let clockTimeoutID = null;
    let announced_game_over;


    async function postResult() {
      const app = initializeApp(firebaseConfig); // Initialize Firebase
      const db = getFirestore(app);
      const dt = DateTime.now();
      let today = dt.toLocaleString();
      
      let turns = this.turnCount;

      const new_record = {
        user_name: "lazyday2",
        score: this.turnCount,
        turns_played: this.turns,
        didWin: false,
        game_date: today,
      };
  
      // get the latest version of the leaderboard data
      const leaderboardDocRef = doc(db, "leaderboard", "scores"); // get Reference to the leaderboard collection
      const docSnap = await getDoc(leaderboardDocRef);
      const leaderboardData = docSnap.data();
      leaderboardData["data"].push(new_record); // add the user socre to the list of scores
      console.log(leaderboardData);
  
      // update the document in the firebase database
  
      await setDoc(doc(db, "leaderboard", "data"), {
        leaderboardData,
      })
        .then(() => {
          console.log("updated leaderboard db successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setInterval(function () {
      if (announced_game_over) {
        return;
      }

      if (game.isGameOver()) {
        announced_game_over = true;
        console.log("GAME OVER YOU LOSE"); // when the game is over open the modal to enter the username and post to the leaderboard
        postResult();
      } else if (game.isCheck()) {
        console.log("king is in check");
      }
    }, 500);

    function uciCmd(cmd, which) {
      (which || engine).postMessage(cmd);
    }
    uciCmd("uci");

    function clockTick() {
      let t =
        (time.clockColor === "white" ? time.wtime : time.btime) +
        time.startTime -
        Date.now();
      let timeToNextSecond = (t % 1000) + 1;
      clockTimeoutID = setTimeout(clockTick, timeToNextSecond);
    }

    function stopClock() {
      if (clockTimeoutID !== null) {
        clearTimeout(clockTimeoutID);
        clockTimeoutID = null;
      }
      if (time.startTime > 0) {
        let elapsed = Date.now() - time.startTime;
        time.startTime = null;
        if (time.clockColor === "white") {
          time.wtime = Math.max(0, time.wtime - elapsed);
        } else {
          time.btime = Math.max(0, time.btime - elapsed);
        }
      }
    }

    function startClock() {
      if (game.turn() === "w") {
        time.wtime += time.winc;
        time.clockColor = "white";
      } else {
        time.btime += time.binc;
        time.clockColor = "black";
      }
      time.startTime = Date.now();
      clockTick();
    }

    function get_moves() {
      let moves = "";
      let history = game.history({ verbose: true });

      for (let i = 0; i < history.length; ++i) {
        let move = history[i];
        moves +=
          " " + move.from + move.to + (move.promotion ? move.promotion : "");
      }

      return moves;
    }

    const prepareMove = () => {
      stopClock();
      // this.setState({ fen: game.fen() });
      let turn = game.turn() === "w" ? "white" : "black";
      if (!game.isGameOver()) {
        // if (turn === playerColor) {
        if (turn !== playerColor) {
          // playerColor = playerColor === 'white' ? 'black' : 'white';
          uciCmd("position startpos moves" + get_moves());
          uciCmd("position startpos moves" + get_moves(), evaler);
          uciCmd("eval", evaler);

          if (time && time.wtime) {
            uciCmd(
              "go " +
                (time.depth ? "depth " + time.depth : "") +
                " wtime " +
                time.wtime +
                " winc " +
                time.winc +
                " btime " +
                time.btime +
                " binc " +
                time.binc
            );
          } else {
            uciCmd("go " + (time.depth ? "depth " + time.depth : ""));
          }
          // isEngineRunning = true;
        }
        if (game.history().length >= 2 && !time.depth && !time.nodes) {
          startClock();
        }
      }
    };

    evaler.onmessage = function (event) {
      let line;

      if (event && typeof event === "object") {
        line = event.data;
      } else {
        line = event;
      }

      // console.log('evaler: ' + line);

      /// Ignore some output.
      if (
        line === "uciok" ||
        line === "readyok" ||
        line.substr(0, 11) === "option name"
      ) {
        return;
      }
    };

    engine.onmessage = (event) => {
      let line;

      if (event && typeof event === "object") {
        line = event.data;
      } else {
        line = event;
      }
      // console.log('Reply: ' + line);
      if (line === "uciok") {
        engineStatus.engineLoaded = true;
      } else if (line === "readyok") {
        engineStatus.engineReady = true;
      } else {
        let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
        /// Did the AI move?
        if (match) {
          // isEngineRunning = false;
          game.move({ from: match[1], to: match[2], promotion: match[3] });
          
          // AI Makes Move Here
          console.log("AI: " + match[1] + " " + match[2]);
          
          this.setState({ fen: game.fen() });
      

          let new_move = "AI: " + match[1] + " " + match[2]
          this.moveHistory.push(new_move);
          
          if (this.moveHistory.length % 2 === 0) {
            this.turnCount = this.turnCount + 1;
          }
          console.log("turn count is: " + this.turnCount);
          
          //postResult()

          prepareMove();
          uciCmd("eval", evaler);
          //uciCmd("eval");
          /// Is it sending feedback?
        } else if (
          (match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))
        ) {
          engineStatus.search = "Depth: " + match[1] + " Nps: " + match[2];
        }

        /// Is it sending feed back with a score?
        if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
          let score = parseInt(match[2], 10) * (game.turn() === "w" ? 1 : -1);
          /// Is it measuring in centipawns?
          if (match[1] === "cp") {
            engineStatus.score = (score / 100.0).toFixed(2);
            /// Did it find a mate?
          } else if (match[1] === "mate") {
            engineStatus.score = "Mate in " + Math.abs(score);
          }

          /// Is the score bounded?
          if ((match = line.match(/\b(upper|lower)bound\b/))) {
            engineStatus.score =
              ((match[1] === "upper") === (game.turn() === "w")
                ? "<= "
                : ">= ") + engineStatus.score;
          }
        }
      }
      // displayStatus();
    };

    return {
      start: function () {
        uciCmd("ucinewgame");
        uciCmd("isready");
        engineStatus.engineReady = false;
        engineStatus.search = null;
        prepareMove();
        announced_game_over = false;
      },
      prepareMove: function () {
        prepareMove();
      },
    };
  };
  render() {
    const { fen } = this.state;
    return React.cloneElement(
      this.props.children({ position: fen, onDrop: this.onDrop }) // pass game AI data to render to the chessboard component
    );
  }
}

export default Stockfish;
