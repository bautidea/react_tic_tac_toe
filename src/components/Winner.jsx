import Square from './Square';

const Winner = ({ winner, resetGame }) => {
  if (winner === null) return null;

  const winnerText = winner === false ? 'Tie' : `Winner`;

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

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
  );
};

export default Winner;
