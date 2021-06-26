import React, { Component } from "react";
import "./App.css";
import TicTacToe from "./components/ticTacToe";

class App extends Component {
  render() {
    return (
      <div className="container">
        <TicTacToe />
      </div>
    );
  }
}

export default App;
