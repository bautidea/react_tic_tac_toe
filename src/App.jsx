import { useState } from 'react';
import confetti from 'canvas-confetti';

// Defining possible turns.
const TURNS = {
  X: 'x',
  O: 'o',
};

//  Defining possible position in order to win.
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Individual square of the board
const Square = ({ children, isSelected, updateBoard, index }) => {
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div
      onClick={handleClick}
      className={`square ${isSelected ? 'is-selected' : ''}`}
    >
      {children}
    </div>
  );
};

function App() {
  // State to create board selection.
  const [board, setBoard] = useState(Array(9).fill(null));

  // State to store turn.
  const [turn, setTurn] = useState(TURNS.X);

  // State to detect if the board is full.
  // null - no winner.
  // false - tie.
  const [winner, setWinner] = useState(null);

  // Function to validate winner.
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }

    // If no matches then no winner.
    return null;
  };

  const checkEndGame = (boardToCheck) => {
    // If there are no free spaces on board then its a tie.
    return boardToCheck.every((square) => square !== null);
  };

  // Function for updating board.
  const updateBoard = (index) => {
    // If there is a element in the index or already a winner, we just return, so
    // we dont overwrite values.
    if (board[index] || winner) return;

    // Updating Board, getting previous board.
    const newBoard = [...board];
    // Assigning to index the current turn.
    newBoard[index] = turn;
    // Updating board state.
    setBoard((prevBoard) => newBoard);

    // Updating turn state.
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn((prevTurn) => newTurn);

    // Checking if there is a new winner after updating board.
    const isWinner = checkWinner(newBoard);
    if (isWinner) {
      confetti();
      setWinner((prevVal) => isWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner((prevVal) => false);
    }
  };

  const resetGame = () => {
    setBoard((prevBoard) => Array(9).fill(null));
    setTurn((prevTurn) => TURNS.X);
    setWinner((prevValue) => null);
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Game Restart</button>

      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>

        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? 'Tie' : `Winner`}</h2>

            {winner && (
              <header className="win">
                <Square>{winner}</Square>
              </header>
            )}

            <footer>
              <button onClick={resetGame}>Start Over?</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
