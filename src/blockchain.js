import SHA256 from 'crypto-js/sha256';

export class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mine(difficulty) {
    const target = '0'.repeat(difficulty);
    const start = performance.now();

    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    const elapsed = performance.now() - start;
    return elapsed;
  }
}

export class Blockchain {
  constructor(difficulty = 2) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
  }

  createGenesisBlock() {
    const genesis = new Block(0, new Date().toISOString(), 'Genesis Block', '0');
    genesis.mine(2);
    return genesis;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const newBlock = new Block(
      this.chain.length,
      new Date().toISOString(),
      data,
      this.getLatestBlock().hash
    );
    const mineTime = newBlock.mine(this.difficulty);
    this.chain.push(newBlock);
    return { block: newBlock, mineTime };
  }

  isValid() {
    const results = [];

    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      const recalculatedHash = current.calculateHash();
      const hashValid = current.hash === recalculatedHash;
      const linkValid = current.previousHash === previous.hash;

      results.push({
        index: i,
        hashValid,
        linkValid,
        valid: hashValid && linkValid,
      });
    }

    // Genesis block check
    const genesis = this.chain[0];
    const genesisValid = genesis.hash === genesis.calculateHash();
    results.unshift({ index: 0, hashValid: genesisValid, linkValid: true, valid: genesisValid });

    return results;
  }

  isChainValid() {
    return this.isValid().every((r) => r.valid);
  }

  tamperBlock(index, newData) {
    if (index >= 0 && index < this.chain.length) {
      this.chain[index].data = newData;
    }
  }

  remineFrom(index) {
    const times = [];
    for (let i = index; i < this.chain.length; i++) {
      if (i > 0) {
        this.chain[i].previousHash = this.chain[i - 1].hash;
      }
      this.chain[i].nonce = 0;
      this.chain[i].hash = this.chain[i].calculateHash();
      const t = this.chain[i].mine(this.difficulty);
      times.push(t);
    }
    return times;
  }

  toSerializable() {
    return this.chain.map((block) => ({
      index: block.index,
      timestamp: block.timestamp,
      data: block.data,
      previousHash: block.previousHash,
      nonce: block.nonce,
      hash: block.hash,
    }));
  }
}
