import React, { Component } from "react";
import Chessboard from "chessboardjsx";
import Header from "./Header";
import Footer from "./Footer";
import Leaderboard from "./Leaderboard";
import StockFish from "./integrations/Stockfish.js";
import { Chess } from "chess.js";
import { VscDebugRestart } from "react-icons/vsc";
import Modal from "./postGameModal";
import Welcome from "./welcome";

class Game extends Component {
  //turnCount = 0;
  //moveHistory = []
  //game = new Chess();

  reset_game() {
    console.log("game has been reset");
  }

  render() {
    return (
      <>
        <Header />
        <section className="chess">
          <div className="container">
            <div className="chess__container">
              <div className="chess__board">
                <div className="chess__header">
                  <div className="chess__header__meta">
                    <span className="chess__gm"> GM </span>
                    <span className="chess__stockfish">🤖 Impossiblebot</span>
                    <span className="chess__rating">(3500)</span>
                  </div>
                  <div className="chess__header__turns">
                    <button>
                      <VscDebugRestart onClick={this.reset_game} /> Restart Game
                    </button>
                    <span className="silent">Turns: </span>13
                  </div>
                </div>
                <div style={boardsContainer}>
                  <StockFish>
                    {({ position, onDrop }) => (
                      <Chessboard
                        id="stockfish"
                        position={position}
                        width={600}
                        onDrop={onDrop}
                        boardStyle={boardStyle}
                        orientation="black"
                      />
                    )}
                  </StockFish>
                </div>
              </div>
              <div className="chess__moves">
                <div className="chess__moves__header">
                  <h3>Recent moves</h3>
                </div>
                <div className="chess__moves__list">
                  <ul>
                    <li>e4</li>
                  </ul>
                </div>
              </div>
            </div>
            <Leaderboard />
            <Modal />
            <Welcome />
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default Game;

const boardsContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};
const boardStyle = {
  borderRadius: "5px",
  boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
};
