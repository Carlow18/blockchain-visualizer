import { useState } from 'react';

export default function BlockCard({
  block,
  validation,
  prevBlock,
  isEditing,
  editValue,
  onEditValueChange,
  onTamper,
  onCancelEdit,
  onRemine,
  onDelete,
  mining,
}) {
  const truncate = (hash) => (hash ? hash.substring(0, 10) + '...' : '—');
  const isGenesis = block.index === 0;

  const borderClass = validation.valid ? 'block-card valid' : 'block-card invalid';

  const matchesLink =
    prevBlock && block.previousHash === prevBlock.hash;

  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString();
  };

  return (
    <div className={borderClass}>
      <div className="block-header">
        <span className="block-number">Block #{block.index}</span>
        {isGenesis && <span className="genesis-badge">Genesis</span>}
        {!validation.valid && <span className="tampered-badge">⚠ Tampered</span>}
      </div>

      <div className="block-field">
        <label>Timestamp</label>
        <span>{formatTime(block.timestamp)}</span>
      </div>

      <div className="block-field">
        <label>Data</label>
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editValue}
            onChange={(e) => onEditValueChange(e.target.value)}
            autoFocus
          />
        ) : (
          <span className="data-value">{block.data}</span>
        )}
      </div>

      <div className="block-field">
        <label>Nonce</label>
        <span className="mono">{block.nonce}</span>
      </div>

      <div className="block-field">
        <label>Previous Hash</label>
        <span
          className={`mono hash-value ${
            !isGenesis && matchesLink
              ? 'hash-match'
              : !isGenesis
              ? 'hash-mismatch'
              : ''
          }`}
          title={block.previousHash}
        >
          {truncate(block.previousHash)}
        </span>
      </div>

      <div className="block-field">
        <label>Hash</label>
        <span
          className={`mono hash-value ${validation.hashValid ? 'hash-match' : 'hash-mismatch'}`}
          title={block.hash}
        >
          {truncate(block.hash)}
        </span>
      </div>

      <div className="block-actions">
        {isEditing ? (
          <>
            <button className="btn btn-tamper" onClick={onTamper}>
              💾 Save Tamper
            </button>
            <button className="btn btn-cancel" onClick={onCancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-edit"
              onClick={onTamper}
              disabled={mining}
              title="Edit this block's data without re-mining (simulates tampering)"
            >
              ✏️ Edit
            </button>
            {!validation.valid && (
              <button
                className="btn btn-remine"
                onClick={onRemine}
                disabled={mining}
                title="Re-mine this block and all blocks after it to fix the chain"
              >
                ⛏️ Re-mine from here
              </button>
            )}
            {!isGenesis && (
              <button
                className="btn btn-delete"
                onClick={onDelete}
                disabled={mining}
                title="Delete this block from the chain"
              >
                🗑️ Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
