import { useState } from 'react';

export default function MiningPanel({ onMine, mining, mineTimeMsg }) {
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.trim() && !mining) {
      onMine(data.trim());
      setData('');
    }
  };

  return (
    <form className="mining-panel" onSubmit={handleSubmit}>
      <h3>⛏️ Mine a New Block</h3>
      <div className="mining-input-row">
        <input
          type="text"
          placeholder="Enter block data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          disabled={mining}
          className="mine-input"
        />
        <button className="btn btn-mine" type="submit" disabled={mining || !data.trim()}>
          {mining ? (
            <span className="spinner-text">
              <span className="spinner"></span> Mining...
            </span>
          ) : (
            '⛏️ Mine'
          )}
        </button>
      </div>
      {mineTimeMsg && <span className="mine-time">{mineTimeMsg}</span>}
    </form>
  );
}
