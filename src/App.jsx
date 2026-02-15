import { useState, useRef, useCallback } from 'react';
import { Blockchain } from './blockchain.js';
import BlockCard from './components/BlockCard.jsx';
import MiningPanel from './components/MiningPanel.jsx';
import ValidationBanner from './components/ValidationBanner.jsx';
import DifficultySelector from './components/DifficultySelector.jsx';
import TransactionLedger from './components/TransactionLedger.jsx';
import './App.css';

function App() {
  const blockchainRef = useRef(new Blockchain(2));
  const [chain, setChain] = useState(() => blockchainRef.current.toSerializable());
  const [validation, setValidation] = useState(() => blockchainRef.current.isValid());
  const [chainValid, setChainValid] = useState(true);
  const [difficulty, setDifficulty] = useState(2);
  const [mining, setMining] = useState(false);
  const [mineTimeMsg, setMineTimeMsg] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [autoMining, setAutoMining] = useState(false);
  const [autoMineProgress, setAutoMineProgress] = useState('');

  const refresh = useCallback(() => {
    const bc = blockchainRef.current;
    setChain(bc.toSerializable());
    const v = bc.isValid();
    setValidation(v);
    setChainValid(v.every((r) => r.valid));
  }, []);

  const handleMine = useCallback(
    (data) => {
      if (!data.trim()) return;
      setMining(true);
      setMineTimeMsg('');

      setTimeout(() => {
        const bc = blockchainRef.current;
        const { mineTime } = bc.addBlock(data);
        setMining(false);
        setMineTimeMsg(`Mined in ${mineTime.toFixed(1)}ms`);
        refresh();
      }, 50);
    },
    [refresh]
  );

  const handleDifficultyChange = useCallback(
    (d) => {
      setDifficulty(d);
      blockchainRef.current.difficulty = d;
    },
    []
  );

  const handleTamper = useCallback(
    (index) => {
      if (editingIndex === index) {
        // Save tamper
        blockchainRef.current.tamperBlock(index, editValue);
        setEditingIndex(null);
        setEditValue('');
        refresh();
      } else {
        // Start editing
        setEditingIndex(index);
        setEditValue(blockchainRef.current.chain[index].data);
      }
    },
    [editingIndex, editValue, refresh]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingIndex(null);
    setEditValue('');
  }, []);

  const handleRemine = useCallback(
    (index) => {
      setMining(true);
      setMineTimeMsg('');
      setTimeout(() => {
        const times = blockchainRef.current.remineFrom(index);
        const total = times.reduce((a, b) => a + b, 0);
        setMining(false);
        setMineTimeMsg(`Re-mined ${times.length} block(s) in ${total.toFixed(1)}ms`);
        refresh();
      }, 50);
    },
    [refresh]
  );

  const handleAutoMine = useCallback(() => {
    const sampleTxns = [
      'Alice pays Bob 10',
      'Bob pays Charlie 5',
      'Charlie pays Dave 3',
      'Dave pays Eve 7',
      'Eve pays Alice 2',
    ];

    setAutoMining(true);
    setAutoMineProgress('');

    let i = 0;
    const mineNext = () => {
      if (i >= sampleTxns.length) {
        setAutoMining(false);
        setAutoMineProgress(`Auto-mined ${sampleTxns.length} blocks!`);
        return;
      }

      setAutoMineProgress(`Mining block ${blockchainRef.current.chain.length} (${i + 1}/${sampleTxns.length})...`);

      setTimeout(() => {
        blockchainRef.current.addBlock(sampleTxns[i]);
        refresh();
        i++;
        mineNext();
      }, 50);
    };

    mineNext();
  }, [refresh]);

  const handleDelete = useCallback(
    (index) => {
      if (index === 0) return; // Don't allow deleting genesis block

      const bc = blockchainRef.current;
      bc.chain.splice(index, 1);

      // Re-index all blocks after the deleted one
      for (let i = index; i < bc.chain.length; i++) {
        bc.chain[i].index = i;
        if (i > 0) {
          bc.chain[i].previousHash = bc.chain[i - 1].hash;
        }
      }

      refresh();
    },
    [refresh]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Blockchain Visualizer</h1>
       
      </header>

      <ValidationBanner valid={chainValid} />

      <div className="controls-row">
        <MiningPanel
          onMine={handleMine}
          mining={mining}
          mineTimeMsg={mineTimeMsg}
        />
        <DifficultySelector
          difficulty={difficulty}
          onChange={handleDifficultyChange}
        />
        <div className="auto-mine-panel">
          <button
            className="btn btn-auto"
            onClick={handleAutoMine}
            disabled={autoMining || mining}
          >
            {autoMining ? '⏳ Auto-Mining...' : 'Auto-Mine 5 Blocks'}
          </button>
          {autoMineProgress && <span className="auto-mine-status">{autoMineProgress}</span>}
        </div>
      </div>

      <div className="chain-container">
        {chain.map((block, i) => {
          const v = validation[i] || { hashValid: true, linkValid: true, valid: true };
          const prevBlock = i > 0 ? chain[i - 1] : null;
          return (
            <div key={block.index} className="chain-link-wrapper">
              {i > 0 && (
                <div className={`chain-arrow ${v.linkValid ? 'valid' : 'invalid'}`}>
                  <div className="arrow-line" />
                  <div className="arrow-label">
                    {v.linkValid ? '✔ Linked' : '✘ Broken'}
                  </div>
                  <div className="arrow-head">▶</div>
                </div>
              )}
              <BlockCard
                block={block}
                validation={v}
                prevBlock={prevBlock}
                isEditing={editingIndex === i}
                editValue={editValue}
                onEditValueChange={setEditValue}
                onTamper={() => handleTamper(i)}
                onCancelEdit={handleCancelEdit}
                onRemine={() => handleRemine(i)}
                onDelete={() => handleDelete(i)}
                mining={mining}
              />
            </div>
          );
        })}
      </div>

      <TransactionLedger chain={chain} />
    </div>
  );
}

export default App;
