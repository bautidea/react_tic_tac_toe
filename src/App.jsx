// Defining possible turns.
const TURNS = {
  X: 'x',
  O: 'o',
};

// This const will draw the board, its a 9-position array
const board = Array(9).fill(null);

// Individual square of the board
const Square = ({ children, updateBoard, index }) => {
  return <div className="square">{children}</div>;
};

function App() {
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index}>
              {index}
            </Square>
          );
        })}
      </section>
    </main>
  );
}

export default App;
