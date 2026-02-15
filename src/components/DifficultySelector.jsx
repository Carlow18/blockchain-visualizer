export default function DifficultySelector({ difficulty, onChange }) {
  return (
    <div className="difficulty-panel">
      <h3>🎯 Difficulty</h3>
      <div className="difficulty-buttons">
        {[1, 2, 3, 4].map((d) => (
          <button
            key={d}
            className={`btn btn-diff ${difficulty === d ? 'active' : ''}`}
            onClick={() => onChange(d)}
          >
            {d} {'0'.repeat(d)}...
          </button>
        ))}
      </div>
      <p className="difficulty-hint">
        Hash must start with <strong>{'0'.repeat(difficulty)}</strong> ({difficulty} leading zero{difficulty > 1 ? 's' : ''})
      </p>
    </div>
  );
}
