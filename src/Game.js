import React, { Component } from "react";
import Chessboard from "chessboardjsx";

// import Header from "./Header";
// import Footer from "/components/Footer";

import Leaderboard from "./Leaderboard";
import StockFish from "./integrations/Stockfish.js";

class Game extends Component {
  render() {
    return (
      <>
        <section className="chess">
          <div className="container">
            <div className="chess__container">
              <div className="chess__board">
                <div className="chess__header">
                  <div className="chess__header__meta">
                    <span className="chess__gm"> GM </span>
                    <span className="chess__stockfish">Stockfish</span>
                    <span className="chess__rating">(3532)</span>
                  </div>
                  <div className="chess__header__turns">
                    <span className="silent">Turns: </span>13
                  </div>
                </div>
                <div style={boardsContainer}>
                  <StockFish>
                    {({ position, onDrop }) => (
                      <Chessboard
                        id="stockfish"
                        position={position}
                        width={500}
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
          </div>
        </section>
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
