import React, { Component } from "react";
import PropTypes from "prop-types";
import { Chess } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess not being a constructor
import { ToastContainer, toast } from "react-toastify";

const STOCKFISH = window.STOCKFISH;
const game = new Chess();

//TODO: add ToastContainer and notify when game is in check state

const notify = () =>
  toast.error("King is in Check!", {
    position: "top-right",
    autoClose: 1300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

class Stockfish extends Component {
  moveHistory = [];
  turnCount = 0;
  state = { fen: "start", turnCount: 0, moveHistory: [], isGameOver: false };

  componentDidMount() {
    this.setState({
      fen: game.fen(),
      turnCount: 0,
      moveHistory: [],
      isGameOver: false,
    });
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

      console.log("human: " + sourceSquare + " " + targetSquare);
      let new_move = "You: " + sourceSquare + " " + targetSquare;
      let tempHistory = this.state.moveHistory;
      tempHistory.push(new_move); // update move history and turn counter from player moves
      this.setState({ moveHistory: tempHistory });

      if (this.moveHistory.length % 2 === 0) {
        let newTurns = this.state.turnCount + 1;
        this.setState({ fen: game.fen(), turnCount: newTurns });
        console.log(this.state.turnCount);
      }
      console.log(this.state.moveHistory);

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

    setInterval(function () {
      if (announced_game_over) {
        return;
      }

      if (game.isGameOver()) {
        announced_game_over = true;
        // note the game is over when this is reached
      } else if (game.isCheck()) {
        //notify();
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

          this.setState({ fen: game.fen() });
          console.log("AI: " + match[1] + " " + match[2]);
          let new_move = "AI: " + match[1] + " " + match[2];
          let tempHistory = this.state.moveHistory;
          tempHistory.push(new_move); // update move history and turn counter from player moves
          this.setState({ moveHistory: tempHistory });

          if (this.moveHistory.length % 2 === 0) {
            this.turnCount = this.turnCount + 1;
          }
          //console.log("turn count is: " + this.turnCount);

          if (game.isGameOver()) {
            announced_game_over = true;
            console.log("GAME OVER YOU LOSE"); // when the game is over open the modal to enter the username and post to the leaderboard
            this.setState({ isGameOver: true });
          }

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
    const { fen, turnCount, moveHistory, isGameOver } = this.state;
    return React.cloneElement(
      this.props.children({
        position: fen,
        onDrop: this.onDrop,
        turns: turnCount,
        history: moveHistory,
        gameOverStatus: isGameOver,
      }) // pass game AI data to render to the chessboard component
    );
  }
}

export default Stockfish;
