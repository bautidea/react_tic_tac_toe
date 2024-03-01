import { useState } from 'react';

// Defining possible turns.
const TURNS = {
  X: 'x',
  O: 'o',
};

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

  // Function for updating board.
  const updateBoard = (index) => {
    // If there is a element in the index, we just return, so
    // we dont overwrite values.
    if (board[index]) return;

    // Updating Board, getting previous board.
    const newBoard = [...board];
    // Assigning to index the current turn.
    newBoard[index] = turn;
    // Updating board state.
    setBoard((prevBoard) => newBoard);

    // Updating turn state.
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn((prevTurn) => newTurn);
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>

        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
