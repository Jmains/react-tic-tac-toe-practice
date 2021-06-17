import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = (props) => {
  return (
    <button onClick={() => props.onClick()} className="square">
      {props.square}
    </button>
  );
};

const Board = (props) => {
  const renderSquare = (i) => {
    return <Square square={props.squares[i]} onClick={() => props.handleSquareClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), latestMoveSquare: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isNext, setIsNext] = useState(stepNumber % 2 === 0);

  let current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const jumpTo = (idx) => {
    setStepNumber(idx);
    setIsNext(idx % 2 === 0);
  };

  const getRowCol = (latestMoveSquare) => {
    console.log(latestMoveSquare);
    const col = 1 + (latestMoveSquare % 3);
    const row = 1 + Math.floor(latestMoveSquare / 3);
    return [row, col];
  };

  const moves = history.map((val, idx) => {
    const desc = idx ? "Go to move #" + idx : "Go to game start";
    const [row, col] = getRowCol(val.latestMoveSquare);
    return (
      <li key={idx}>
        <button onClick={() => jumpTo(idx)}>{desc}</button>
        <p>Location was: {`(${row}, ${col})`}</p>
      </li>
    );
  });

  let status = winner ? "Winner is: " + winner : "Next player is: " + (isNext ? "X" : "O");

  const handleSquareClick = (i) => {
    const gameHistory = history.slice(0, stepNumber + 1);
    const current = gameHistory[gameHistory.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = isNext ? "X" : "O";
    setIsNext(!isNext);
    setStepNumber(gameHistory.length);

    setHistory(gameHistory.concat({ squares, latestMoveSquare: i }));
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} handleSquareClick={(i) => handleSquareClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

ReactDOM.render(<Game />, document.getElementById("root"));
