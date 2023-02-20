import React, { Component } from "react";
import Chessboard from "chessboardjsx";
import Leaderboard from "../utils/dataTable";
import StockFish from "../utils/Stockfish.js";
import Welcome from "./welcomeModal";
import { VscDebugRestart } from "react-icons/vsc";

class Game extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  // reset the game state
  handleResetGame = (e) => {
    e.preventDefault(); // prevent page reload
    this.child.current.resetGame(); // create a reference to call the reset button
  };

  render() {
    return (
      <section className="chess">
        <div className="container">
          <StockFish ref={this.child}>
            {({ position, onDrop, turns, history }) => (
              <>
                <div className="chess__container">
                  <div className="chess__board">
                    <div className="chess__header">
                      <div className="chess__header__meta">
                        <span className="chess__gm"> GM </span>
                        <span className="chess__stockfish">Impossibot</span>
                        <span className="chess__rating">(3500)</span>
                        <div className="chess__header__turns">
                          <button
                            onClick={(e) => {
                              this.handleResetGame(e);
                            }}
                          >
                            <VscDebugRestart /> Restart Game
                          </button>
                          <span className="silent">Turns: </span>
                          {turns}
                        </div>
                      </div>
                    </div>
                    <Chessboard
                      id="stockfish"
                      position={position}
                      width={600}
                      onDrop={onDrop}
                      boardStyle={boardStyle}
                      orientation="black"
                    />
                  </div>
                  <div className="chess__moves">
                    <div className="chess__moves__header">
                      <h3>Recent moves</h3>
                    </div>
                    <div className="chess__moves__list">
                      <ul>
                        {history.map((el, index) => (
                          <li key={index}>{el}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <Leaderboard />
                <Welcome openStatus={"open"} />
              </>
            )}
          </StockFish>
        </div>
      </section>
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
