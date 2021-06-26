import React, { Component } from "react";
import Unit from "./unit";

class TicTacToe extends Component {
  state = {
    content: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    player: "X",
    winner: "",
  };

  handleClick = (row, col) => {
    const { content: allContent, player, winner } = this.state;
    if (allContent[row][col]) return;
    if (winner) return;

    const content = [...allContent];
    content[row] = [...content[row]];
    content[row][col] = player;

    this.setState({ content, player: player === "X" ? "O" : "X" });
    this.findWinner();
  };

  handleReset = () => {
    const content = this.state.content.map((row) => row.map(() => ""));
    this.setState({ content, winner: "", player: "X" });
  };

  findWinner = () => {
    const { content } = this.state;
    const getColumn = (i) => content.map((row) => row[i]);
    for (let i = 0; i < 3; i++) {
      if (content[i][0] && content[i].every((e) => content[i][0] === e))
        return this.setState({ winner: content[i][0] });
      if (content[0][i] && getColumn(i).every((e) => content[0][i] === e))
        return this.setState({ winner: content[0][i] });
    }

    const midUnit = content[1][1];
    if (
      midUnit &&
      ((content[0][0] === midUnit && content[2][2] === midUnit) ||
        (content[0][2] === midUnit && content[2][0] === midUnit))
    )
      this.setState({ winner: midUnit });
  };

  render() {
    const { winner, content } = this.state;

    return (
      <React.Fragment>
        <div className="m-2">
          {content.map((row, i) => (
            <div key={i} className="row mb-2">
              {row.map((col, j) => (
                <div key={j} className="ml-2">
                  <Unit content={col} onClick={() => this.handleClick(i, j)} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="btn btn-danger" onClick={this.handleReset}>
          Reset
        </button>
        {winner && (
          <span className="ml-4 badge badge-pill badge-secondary p-2">
            Player {winner} won
          </span>
        )}
      </React.Fragment>
    );
  }
}

export default TicTacToe;
