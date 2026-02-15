export default function TransactionLedger({ chain }) {
  return (
    <div className="ledger-panel">
      <h3>📒 Transaction Ledger</h3>
      <ul className="ledger-list">
        {chain.map((block) => (
          <li key={block.index} className="ledger-item">
            <span className="ledger-index">Block {block.index}:</span>
            <span className="ledger-data">{block.data}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
