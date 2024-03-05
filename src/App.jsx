import { useState } from 'react';
import confetti from 'canvas-confetti';
import Square from './components/Square';
import { TURNS } from './data/constants';
import {
  checkWinner,
  checkEndGame,
  saveToLocalStorage,
  removeFromLocalStorage,
} from './logic/board';
import Winner from './components/Winner';

function App() {
  // State to create board selection.
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');

    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  // State to store turn.
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');

    // Not using parse to transform retrieved value because its already an string.
    // the loaded value is either 'X' or 'O'.
    return turnFromStorage ?? TURNS.X;
  });

  // State to detect if the board is full.
  // null - no winner.
  // false - tie.
  const [winner, setWinner] = useState(null);

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

    // Saving game.
    saveToLocalStorage(newBoard, newTurn);

    // Checking if there is a new winner after updating board.
    const isWinner = checkWinner(newBoard);
    if (isWinner) {
      confetti();
      setWinner((prevVal) => isWinner);
      removeFromLocalStorage();
    } else if (checkEndGame(newBoard)) {
      setWinner((prevVal) => false);
      removeFromLocalStorage();
    }
  };

  const resetGame = () => {
    const boardReset = Array(9).fill(null);
    setBoard((prevBoard) => boardReset);

    const turnReset = TURNS.X;
    setTurn((prevTurn) => turnReset);

    setWinner((prevValue) => null);

    // Deleting saved states.
    removeFromLocalStorage();
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

      <Winner winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
