// Defining possible turns.
export const TURNS = {
  X: 'x',
  O: 'o',
};

//  Defining possible position in order to win.
export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
