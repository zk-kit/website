---
sidebar_position: 1
title: Solidity Overview
---

# Solidity Contracts

Smart contracts for on-chain verification of zero-knowledge proofs generated with ZK-Kit.

## Overview

The ZK-Kit Solidity package provides contracts for:
- Verifying Merkle tree proofs on-chain
- Verifying zk-SNARK proofs (Groth16, PLONK)
- Managing Merkle trees in smart contracts
- Implementing privacy-preserving applications on Ethereum

## Repository

- **GitHub**: [zk-kit.solidity](https://github.com/privacy-scaling-explorations/zk-kit.solidity)
- **License**: MIT

## Installation

### Using npm/yarn

```bash
npm install @zk-kit/incremental-merkle-tree.sol

# Or with yarn
yarn add @zk-kit/incremental-merkle-tree.sol
```

### Using Foundry

```bash
forge install privacy-scaling-explorations/zk-kit.solidity
```

### Using Hardhat

```bash
npm install @zk-kit/incremental-merkle-tree.sol
```

Add to `hardhat.config.js`:

```javascript
module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
}
```

## Available Contracts

### Incremental Merkle Tree

On-chain Incremental Merkle Tree implementation.

**Package**: `@zk-kit/incremental-merkle-tree.sol`

**Features**:
- Gas-optimized insertions
- On-chain root verification
- Event emission for indexing
- Configurable depth

**Usage**:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@zk-kit/incremental-merkle-tree.sol/IncrementalBinaryTree.sol";

contract MyContract {
    using IncrementalBinaryTree for IncrementalBinaryTree.Data;
    
    IncrementalBinaryTree.Data internal tree;
    
    constructor() {
        tree.init(20, 0); // depth=20, zeroValue=0
    }
    
    function addMember(uint256 commitment) external {
        tree.insert(commitment);
    }
    
    function getRoot() public view returns (uint256) {
        return tree.root;
    }
}
```

### Proof Verifiers

#### Groth16 Verifier

Verifies Groth16 zk-SNARK proofs.

**Generated from circuits using**:

```bash
snarkjs zkey export solidityverifier circuit.zkey verifier.sol
```

**Usage**:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Groth16Verifier.sol";

contract MyZKApp {
    Groth16Verifier public verifier;
    
    constructor(address _verifier) {
        verifier = Groth16Verifier(_verifier);
    }
    
    function verifyProof(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[] memory input
    ) public view returns (bool) {
        return verifier.verifyProof(a, b, c, input);
    }
}
```

#### PLONK Verifier

Verifies PLONK proofs (no per-circuit trusted setup).

**Generated from circuits**:

```bash
snarkjs zkey export solidityverifier circuit.zkey verifier.sol
```

### Poseidon Hash

On-chain Poseidon hash implementation.

**Package**: `@zk-kit/poseidon.sol`

**Usage**:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@zk-kit/poseidon.sol/Poseidon.sol";

contract MyContract {
    function hashTwo(uint256 left, uint256 right) public pure returns (uint256) {
        return Poseidon.hash([left, right]);
    }
    
    function hashMany(uint256[] memory inputs) public pure returns (uint256) {
        return Poseidon.hash(inputs);
    }
}
```

## Quick Start Example

### Anonymous Voting Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@zk-kit/incremental-merkle-tree.sol/IncrementalBinaryTree.sol";
import "./Groth16Verifier.sol";

contract AnonymousVoting {
    using IncrementalBinaryTree for IncrementalBinaryTree.Data;
    
    // Merkle tree of registered voters
    IncrementalBinaryTree.Data internal voters;
    
    // Proof verifier
    Groth16Verifier public verifier;
    
    // Track used nullifiers to prevent double-voting
    mapping(uint256 => bool) public nullifiers;
    
    // Vote counts
    mapping(uint256 => uint256) public votes;
    
    event VoterRegistered(uint256 commitment);
    event VoteCast(uint256 nullifier, uint256 candidate);
    
    constructor(address _verifier) {
        voters.init(20, 0);
        verifier = Groth16Verifier(_verifier);
    }
    
    function register(uint256 commitment) external {
        voters.insert(commitment);
        emit VoterRegistered(commitment);
    }
    
    function vote(
        uint256 candidate,
        uint256 nullifier,
        uint256 root,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c
    ) external {
        // Verify root is current or recent
        require(root == voters.root, "Invalid root");
        
        // Verify nullifier hasn't been used
        require(!nullifiers[nullifier], "Already voted");
        
        // Verify proof
        uint[] memory publicInputs = new uint[](3);
        publicInputs[0] = root;
        publicInputs[1] = nullifier;
        publicInputs[2] = candidate;
        
        require(
            verifier.verifyProof(a, b, c, publicInputs),
            "Invalid proof"
        );
        
        // Record vote
        nullifiers[nullifier] = true;
        votes[candidate]++;
        
        emit VoteCast(nullifier, candidate);
    }
    
    function getVoterRoot() public view returns (uint256) {
        return voters.root;
    }
}
```

### Deploy and Use

```javascript
// deploy.js
const { ethers } = require("hardhat")

async function main() {
    // Deploy verifier
    const Verifier = await ethers.getContractFactory("Groth16Verifier")
    const verifier = await Verifier.deploy()
    await verifier.deployed()
    
    // Deploy voting contract
    const Voting = await ethers.getContractFactory("AnonymousVoting")
    const voting = await Voting.deploy(verifier.address)
    await voting.deployed()
    
    console.log("Voting deployed to:", voting.address)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
```

## API Reference

### IncrementalBinaryTree

#### `init`

```solidity
function init(
    Data storage self,
    uint256 depth,
    uint256 zero
) internal
```

Initializes the tree.

**Parameters**:
- `self`: Tree storage reference
- `depth`: Maximum depth
- `zero`: Value for empty leaves

**Example**:

```solidity
tree.init(20, 0);
```

#### `insert`

```solidity
function insert(
    Data storage self,
    uint256 leaf
) internal
```

Inserts a leaf into the tree.

**Parameters**:
- `self`: Tree storage reference
- `leaf`: Value to insert

**Example**:

```solidity
tree.insert(commitment);
```

#### `root`

```solidity
Data storage self.root returns (uint256)
```

Gets the current root.

**Returns**: Current Merkle root

**Example**:

```solidity
uint256 currentRoot = tree.root;
```

#### `numberOfLeaves`

```solidity
Data storage self.numberOfLeaves returns (uint256)
```

Gets the number of leaves in the tree.

**Returns**: Leaf count

**Example**:

```solidity
uint256 count = tree.numberOfLeaves;
```

### Groth16Verifier

#### `verifyProof`

```solidity
function verifyProof(
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[] memory input
) public view returns (bool)
```

Verifies a Groth16 proof.

**Parameters**:
- `a`: Proof point A
- `b`: Proof point B
- `c`: Proof point C
- `input`: Public inputs

**Returns**: `true` if proof is valid

**Example**:

```solidity
bool isValid = verifier.verifyProof(a, b, c, publicInputs);
```

## Advanced Usage

### Batch Verification

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Groth16Verifier.sol";

contract BatchVerifier {
    Groth16Verifier public verifier;
    
    struct Proof {
        uint[2] a;
        uint[2][2] b;
        uint[2] c;
        uint[] input;
    }
    
    constructor(address _verifier) {
        verifier = Groth16Verifier(_verifier);
    }
    
    function verifyBatch(Proof[] memory proofs) public view returns (bool) {
        for (uint i = 0; i < proofs.length; i++) {
            if (!verifier.verifyProof(
                proofs[i].a,
                proofs[i].b,
                proofs[i].c,
                proofs[i].input
            )) {
                return false;
            }
        }
        return true;
    }
}
```

### Event-Based Indexing

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@zk-kit/incremental-merkle-tree.sol/IncrementalBinaryTree.sol";

contract IndexedTree {
    using IncrementalBinaryTree for IncrementalBinaryTree.Data;
    
    IncrementalBinaryTree.Data internal tree;
    
    event LeafInserted(uint256 indexed index, uint256 leaf, uint256 root);
    
    constructor() {
        tree.init(20, 0);
    }
    
    function insert(uint256 leaf) external {
        uint256 index = tree.numberOfLeaves;
        tree.insert(leaf);
        emit LeafInserted(index, leaf, tree.root);
    }
}
```

### Root History

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@zk-kit/incremental-merkle-tree.sol/IncrementalBinaryTree.sol";

contract TreeWithHistory {
    using IncrementalBinaryTree for IncrementalBinaryTree.Data;
    
    IncrementalBinaryTree.Data internal tree;
    
    uint256 public constant ROOT_HISTORY_SIZE = 30;
    uint256[ROOT_HISTORY_SIZE] public rootHistory;
    uint256 public currentRootIndex;
    
    constructor() {
        tree.init(20, 0);
    }
    
    function insert(uint256 leaf) external {
        tree.insert(leaf);
        
        // Store root in history
        rootHistory[currentRootIndex] = tree.root;
        currentRootIndex = (currentRootIndex + 1) % ROOT_HISTORY_SIZE;
    }
    
    function isKnownRoot(uint256 root) public view returns (bool) {
        if (root == tree.root) return true;
        
        for (uint256 i = 0; i < ROOT_HISTORY_SIZE; i++) {
            if (root == rootHistory[i]) return true;
        }
        
        return false;
    }
}
```

## Gas Optimization

### Tree Insertion Costs

| Depth | Gas per Insert | Notes |
|-------|---------------|-------|
| 10 | ~50,000 | Small tree |
| 16 | ~80,000 | Medium tree |
| 20 | ~100,000 | Large tree |
| 32 | ~150,000 | Very large tree |

### Optimization Tips

```solidity
// ✅ Good: Use events for off-chain indexing
emit LeafInserted(index, leaf);

// ✅ Good: Batch operations
function insertBatch(uint256[] memory leaves) external {
    for (uint i = 0; i < leaves.length; i++) {
        tree.insert(leaves[i]);
    }
}

// ✅ Good: Use assembly for critical paths
assembly {
    // Gas-optimized operations
}
```

## Testing Contracts

### Using Hardhat

```javascript
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("AnonymousVoting", function() {
    let voting, verifier
    
    beforeEach(async function() {
        const Verifier = await ethers.getContractFactory("Groth16Verifier")
        verifier = await Verifier.deploy()
        
        const Voting = await ethers.getContractFactory("AnonymousVoting")
        voting = await Voting.deploy(verifier.address)
    })
    
    it("should register voter", async function() {
        await voting.register(123)
        expect(await voting.getVoterRoot()).to.not.equal(0)
    })
    
    it("should cast vote with valid proof", async function() {
        // Generate proof off-chain
        const proof = await generateProof(/* ... */)
        
        await voting.vote(
            candidate,
            nullifier,
            root,
            proof.a,
            proof.b,
            proof.c
        )
        
        expect(await voting.votes(candidate)).to.equal(1)
    })
})
```

### Using Foundry

```solidity
// test/AnonymousVoting.t.sol
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AnonymousVoting.sol";

contract AnonymousVotingTest is Test {
    AnonymousVoting public voting;
    
    function setUp() public {
        Groth16Verifier verifier = new Groth16Verifier();
        voting = new AnonymousVoting(address(verifier));
    }
    
    function testRegister() public {
        voting.register(123);
        assertTrue(voting.getVoterRoot() != 0);
    }
}
```

```bash
# Run tests
forge test
```

## Best Practices

### Security

```solidity
// ✅ Good: Validate inputs
require(leaf != 0, "Invalid leaf");

// ✅ Good: Check root validity
require(isKnownRoot(root), "Unknown root");

// ✅ Good: Prevent replay attacks
require(!nullifiers[nullifier], "Used nullifier");

// ✅ Good: Use latest Solidity version
pragma solidity ^0.8.20;
```

### Gas Efficiency

```solidity
// ✅ Good: Use calldata for read-only arrays
function verify(uint[] calldata input) external {
    // ...
}

// ✅ Good: Cache storage reads
uint256 currentRoot = tree.root;
if (currentRoot == expectedRoot) {
    // Use currentRoot instead of tree.root
}

// ✅ Good: Use unchecked for safe math
unchecked {
    i++;
}
```

## Deployment

### Mainnet Deployment Checklist

- [ ] Audit smart contracts
- [ ] Test on testnet (Sepolia, Goerli)
- [ ] Verify contracts on Etherscan
- [ ] Set up monitoring and alerts
- [ ] Document contract addresses
- [ ] Implement upgrade mechanism (if needed)

### Example Deployment Script

```javascript
// scripts/deploy-production.js
const { ethers } = require("hardhat")

async function main() {
    // Deploy with create2 for deterministic addresses
    const factory = await ethers.getContractFactory("AnonymousVoting")
    
    const salt = ethers.utils.id("v1.0.0")
    const voting = await factory.deploy(verifierAddress, { 
        gasLimit: 5000000 
    })
    
    await voting.deployed()
    
    // Verify on Etherscan
    await run("verify:verify", {
        address: voting.address,
        constructorArguments: [verifierAddress]
    })
}
```

## Related Documentation

- [Circom Circuits](/docs/packages/circom/overview) - Generate proofs
- [JavaScript Packages](/docs/packages/javascript/imt) - Create proofs off-chain
- [Getting Started](/docs/getting-started/first-proof) - Build your first proof
- [Development Setup](/docs/getting-started/development-setup) - Setup guide

## Common Use Cases

- ✅ Anonymous voting
- ✅ Private airdrops
- ✅ Credential verification
- ✅ Privacy-preserving DeFi
- ✅ ZK rollups
- ✅ Identity systems

## Source

- **GitHub**: [zk-kit.solidity](https://github.com/privacy-scaling-explorations/zk-kit.solidity)
- **License**: MIT

## Community

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Contract Examples](https://github.com/privacy-scaling-explorations/zk-kit.solidity/tree/main/examples)

