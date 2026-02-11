# Blockchain Visualizer

An interactive web-based blockchain visualizer that demonstrates core blockchain concepts including hash linking, proof-of-work mining, tampering detection, and chain validation.

## Features

### 1. **Hash Linking**
Each block contains the hash of the previous block, creating an immutable chain where any change to a block breaks all subsequent links.

### 2. **Proof-of-Work Mining**
Demonstrates the mining process where the system searches for a nonce value that produces a hash with a specific number of leading zeros (difficulty).

### 3. **Tampering Detection**
Click on any block's data to edit it and see how tampering breaks the chain. The visualization clearly shows which blocks are valid (green border) and invalid (red border).

### 4. **Chain Validation**
Validates the entire blockchain by checking:
- Each block's hash matches its contents
- Each block correctly links to the previous block
- Each block meets the mining difficulty requirement

## How to Use

1. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No server or dependencies required!

2. **Mine New Blocks**
   - Enter data for a new block in the input field
   - Click "⛏️ Mine New Block" to add it to the chain
   - Watch the mining process find a valid nonce

3. **Adjust Difficulty**
   - Change the difficulty level (1-6) to see how it affects mining time
   - Higher difficulty = more leading zeros required = longer mining time

4. **Simulate Tampering**
   - Click on the yellow data field of any block to edit it
   - Observe how the block becomes invalid (red border)
   - See how validation detects the problem

5. **Re-mine Blocks**
   - After tampering, click "⛏️ Re-mine" on the affected block
   - Notice that subsequent blocks remain invalid because they still reference the old hash
   - This demonstrates why blockchain is immutable

6. **Validate Chain**
   - Click "✓ Validate Chain" to check the integrity of the entire blockchain
   - Get detailed feedback on what's wrong if the chain is invalid

## Technical Details

### Block Structure
Each block contains:
- **Index**: Position in the chain
- **Timestamp**: When the block was created
- **Data**: The actual content/transactions
- **Previous Hash**: Hash of the previous block (creates the chain)
- **Nonce**: Number used in proof-of-work
- **Hash**: SHA-256 hash of the entire block

### Mining Algorithm
The proof-of-work algorithm:
1. Takes the block data (index, previous hash, timestamp, data, nonce)
2. Calculates SHA-256 hash
3. Checks if hash has required number of leading zeros
4. If not, increments nonce and tries again
5. Repeats until valid hash is found

### Validation Rules
A chain is valid if:
1. Each block's hash matches its calculated hash (no tampering)
2. Each block's previous hash matches the actual previous block's hash (proper linking)
3. Each block's hash meets the difficulty requirement (properly mined)

## Educational Concepts Demonstrated

- **Immutability**: Once data is in the blockchain, changing it breaks the chain
- **Computational Cost**: Mining requires significant computation (proof-of-work)
- **Security Through Difficulty**: The chain is secure because re-mining all blocks after tampering is computationally expensive
- **Transparency**: All data and hashes are visible and verifiable
- **Consensus Mechanism**: Proof-of-work as a way to agree on the valid chain

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

No external dependencies or build process required!

## License

MIT