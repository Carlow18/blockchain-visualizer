# Blockchain Visualizer

An interactive blockchain visualizer built with **React + Vite** that demonstrates how blockchains work — mining, hashing, validation, and tampering detection.

## Features

- **Block Display** — Each block shown as a card with index, timestamp, data, previous hash, nonce, and hash
- **Visual Linking** — Color-coded arrows show valid/broken hash links between blocks
- **Mining** — Enter transaction data and mine blocks with proof-of-work (SHA-256)
- **Validation Indicator** — Real-time chain validity banner (green = valid, red = invalid)
- **Difficulty Selector** — Choose 1–4 leading zeros for mining difficulty
- **Tampering Demo** — Edit any block's data to see the chain break
- **Re-mine** — Fix tampered chains by re-mining from the affected block
- **Auto-Mine** — One-click to mine 5 sample transaction blocks
- **Transaction Ledger** — Chronological list of all block data

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## How It Works

1. **Genesis Block** — Created automatically when the app loads
2. **Mining** — Enter data → click Mine → the app finds a nonce that produces a hash with the required leading zeros
3. **Tampering** — Click "Edit" on any block → change the data → the chain turns invalid (red)
4. **Re-mining** — Click "Re-mine from here" to recalculate hashes from the tampered block onward
5. **Difficulty** — Higher difficulty = more leading zeros = longer mining time
