import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Square({ value, onSquareClick, highlight }) {
  return (
    <button
      className={classNames(
        "w-16 h-16 bg-white text-3xl font-bold border-2 border-gray-400 flex items-center justify-center",
        { "bg-yellow-300": highlight }
      )}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  onSquareClick: PropTypes.func.isRequired,
  highlight: PropTypes.bool,
};

function Board({ xIsNext, squares, onPlay, winningLine }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);

  const status = winner
    ? "Winner: " + winner.winner
    : "Next player: " + (xIsNext ? "X" : "O");

  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        highlight={winningLine && winningLine.includes(i)}
      />
    );
  };

  const boardSize = 4;
  let board = [];
  for (let row = 0; row < boardSize; row++) {
    let rowSquares = [];
    for (let col = 0; col < boardSize; col++) {
      rowSquares.push(renderSquare(row * boardSize + col));
    }
    board.push(
      <div key={row} className="flex">
        {rowSquares}
      </div>
    );
  }

  return (
    <div>
      <div className="text-2xl font-semibold mb-4">{status}</div>
      {board}
    </div>
  );
}

Board.propTypes = {
  xIsNext: PropTypes.bool.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  onPlay: PropTypes.func.isRequired,
  winningLine: PropTypes.arrayOf(PropTypes.number),
};

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(16).fill(null), location: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const winner = calculateWinner(currentSquares);

  function handlePlay(nextSquares, i) {
    const nextHistory = history.slice(0, currentMove + 1);
    const location = { row: Math.floor(i / 4), col: i % 4 };
    setHistory([...nextHistory, { squares: nextSquares, location }]);
    setCurrentMove(nextHistory.length);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function toggleSortOrder() {
    setAscending(!ascending);
  }

  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${step.location.row}, ${step.location.col})`
      : "Go to game start";
    return (
      <li key={move} className="mb-2">
        {move === currentMove ? (
          <span className="text-green-500">You are at move #{move}</span>
        ) : (
          <button
            className="text-blue-500 hover:text-blue-700 hover:underline"
            onClick={() => jumpTo(move)}
          >
            {desc}
          </button>
        )}
      </li>
    );
  });

  const sortedMoves = ascending ? moves : moves.reverse();

  return (
    <div className="flex flex-row items-center justify-center p-4 bg-gray-100 min-h-screen space-x-4">
      <div className="flex">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            winningLine={winner && winner.line}
          />
        </div>
        <div className="ml-4">
          <button
            className="mb-2 p-2 bg-blue-500 text-white rounded"
            onClick={toggleSortOrder}
          >
            Toggle Sort Order
          </button>
          <ol>{sortedMoves}</ol>
        </div>
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
    [2, 5, 8],
    [3, 6, 9],
    [3, 6, 9],
    [4, 8, 12],
    [4, 8, 12],
    [5, 9, 13],
    [6, 9, 12],
    [7, 10, 13],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}
