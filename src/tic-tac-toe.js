import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="w-16 h-16 bg-white text-3xl font-bold border-2 border-gray-400 hover:bg-gray-100 flex items-center justify-center"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  onSquareClick: PropTypes.func.isRequired,
};

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <div>
      <div className="text-2xl font-semibold mb-4">{status}</div>
      <div className="grid grid-cols-4 gap-2">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
}

Board.propTypes = {
  xIsNext: PropTypes.bool.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPlay: PropTypes.func.isRequired,
};

export default function Game() {
  const [history, setHistory] = useState([Array(16 /* 4 rows * 4 rows */).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move} className="mb-2">
        <button
          className="text-blue-500 hover:text-blue-700 hover:underline"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-row justify-center items-center p-4 bg-gray-100 min-h-screen space-x-4">
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  // movements for 3 rows
  // const lines = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [2, 4, 6],
  // ];

  // movements for 5 rows
  // const lines = [
  //   // Horizontal lines
  //   [0, 1, 2], [1, 2, 3], [2, 3, 4],
  //   [5, 6, 7], [6, 7, 8], [7, 8, 9],
  //   [10, 11, 12], [11, 12, 13], [12, 13, 14],
  //   [15, 16, 17], [16, 17, 18], [17, 18, 19],
  //   [20, 21, 22], [21, 22, 23], [22, 23, 24],
  
  //   // Vertical lines
  //   [0, 5, 10], [5, 10, 15], [10, 15, 20],
  //   [1, 6, 11], [6, 11, 16], [11, 16, 21],
  //   [2, 7, 12], [7, 12, 17], [12, 17, 22],
  //   [3, 8, 13], [8, 13, 18], [13, 18, 23],
  //   [4, 9, 14], [9, 14, 19], [14, 19, 24],
  
  //   // Diagonal lines
  //   [0, 6, 12], [6, 12, 18], [12, 18, 24],
  //   [1, 7, 13], [7, 13, 19], [2, 8, 14],
  //   [2, 6, 10], [3, 7, 11], [7, 11, 15],
  //   [4, 8, 12], [8, 12, 16], [12, 16, 20],
  //   [3, 9, 15], [8, 12, 16], [13, 17, 21]
  // ];

  // movements for 4 rows
  const lines = [
    // Horizontal lines
    [0, 1, 2],
    [1, 2, 3],
    [4, 5, 6],
    [5, 6, 7],
    [8, 9, 10],
    [9, 10, 11],
    [12, 13, 14],
    [13, 14, 15],

    // Vertical lines
    [0, 4, 8],
    [4, 8, 12],
    [1, 5, 9],
    [5, 9, 13],
    [2, 6, 10],
    [6, 10, 14],
    [3, 7, 11],
    [7, 11, 15],

    // Diagonal lines
    [0, 5, 10],
    [1, 6, 11],
    [1, 6, 11],
    [2, 5, 8],
    [2, 6, 10],
    [3, 6, 9],
    [3, 7, 11],
    [4, 5, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
