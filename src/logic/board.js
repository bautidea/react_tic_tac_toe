import { WINNER_COMBOS } from '../data/constants';

// Function to validate winner.
export const checkWinner = (boardToCheck) => {
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

export const checkEndGame = (boardToCheck) => {
  // If there are no free spaces on board then its a tie.
  return boardToCheck.every((square) => square !== null);
};
