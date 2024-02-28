import { useState } from 'react';

// Defining possible turns.
const TURNS = {
  X: 'x',
  O: 'o',
};

// Individual square of the board
const Square = ({ children, isSelected, updateBoard, index }) => {
  const handleClick = () => {
    updateBoard();
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

  // Function for updating board.
  const updateBoard = () => {};

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <section className="game">
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            ></Square>
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
