import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), latestMoveSquare: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isNext, setIsNext] = useState(stepNumber % 2 === 0);
  const [isAscOrder, setIsAscOrder] = useState(true);

  let current = history[stepNumber];
  const { winner, winningLine, isDraw } = calculateWinner(current.squares);

  const jumpTo = (idx) => {
    setStepNumber(idx);
    setIsNext(idx % 2 === 0);
  };

  const getRowCol = (latestMoveSquare) => {
    const col = 1 + (latestMoveSquare % 3);
    const row = 1 + Math.floor(latestMoveSquare / 3);
    return [row, col];
  };

  const moves = history.map((val, moveNum) => {
    const desc = moveNum ? "Go to move #" + moveNum : "Go to game start";
    const [row, col] = getRowCol(val.latestMoveSquare);

    return (
      <li key={moveNum}>
        {stepNumber === moveNum ? (
          <>
            <button className="bold" onClick={() => jumpTo(moveNum)}>
              {desc}
            </button>
            <p>Location was: {`(${row}, ${col})`}</p>
          </>
        ) : (
          <>
            <button onClick={() => jumpTo(moveNum)}>{desc}</button>
            <p>Location was: {`(${row}, ${col})`}</p>
          </>
        )}
      </li>
    );
  });

  if (!isAscOrder) moves.reverse();

  let status = winner ? "Winner is: " + winner : "Next player is: " + (isNext ? "X" : "O");
  if (isDraw) {
    status = "Draw";
  }

  const handleSquareClick = (i) => {
    const gameHistory = history.slice(0, stepNumber + 1);
    const current = gameHistory[gameHistory.length - 1];
    const squares = [...current.squares];

    const { winner } = calculateWinner(squares);

    if (squares[i] || winner) {
      return;
    }

    squares[i] = isNext ? "X" : "O";
    setIsNext(!isNext);
    setStepNumber(gameHistory.length);
    setHistory(gameHistory.concat({ squares, latestMoveSquare: i }));
  };

  const handleSortToggle = (ev) => {
    setIsAscOrder(!isAscOrder);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          winningLine={winningLine}
          squares={current.squares}
          handleSquareClick={(i) => handleSquareClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => handleSortToggle()}>
          {isAscOrder ? "Ascending" : "Descending"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const checkIsDraw = (squares) => {
  let size = 0;
  squares.forEach((val) => {
    if (val === "X" || val === "O") size++;
  });
  return size === squares.length;
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
      return { winner: squares[a], winningLine: lines[i], isDraw: false };
    }
  }
  return { winner: null, winningLine: null, isDraw: checkIsDraw(squares) };
};

ReactDOM.render(<Game />, document.getElementById("root"));
