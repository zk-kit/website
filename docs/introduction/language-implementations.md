---
sidebar_position: 5
title: Language Implementations
description: ZK-Kit is available in multiple programming languages for different use cases
---

# Language Implementations

ZK-Kit provides different repositories for each language, allowing you to use zero-knowledge primitives in your preferred development environment.

## Available Languages

ZK-Kit is available in **5 different languages**, each optimized for specific use cases:

| Language | Repository | Packages/Circuits | Use Case |
|----------|------------|-------------------|----------|
| **TypeScript/JavaScript** | [privacy-scaling-explorations/zk-kit](https://github.com/privacy-scaling-explorations/zk-kit) | 9 packages | Frontend, Node.js, full-stack apps |
| **Circom** | [privacy-scaling-explorations/zk-kit.circom](https://github.com/privacy-scaling-explorations/zk-kit.circom) | 5+ circuits | ZK circuit development |
| **Noir** | [privacy-scaling-explorations/zk-kit.noir](https://github.com/privacy-scaling-explorations/zk-kit.noir) | 4 packages | Aztec protocol, Noir circuits |
| **Solidity** | [privacy-scaling-explorations/zk-kit.solidity](https://github.com/privacy-scaling-explorations/zk-kit.solidity) | 4 contracts | Ethereum smart contracts |
| **Rust** | [privacy-scaling-explorations/zk-kit.rust](https://github.com/privacy-scaling-explorations/zk-kit.rust) | 3 packages | High-performance backends |

---

## 1. TypeScript/JavaScript

**Main repository for web and Node.js development**

### Repository
- 🔗 [github.com/privacy-scaling-explorations/zk-kit](https://github.com/privacy-scaling-explorations/zk-kit)
- 📦 [npmjs.com/org/zk-kit](https://www.npmjs.com/org/zk-kit)
- 📝 This documentation covers this implementation

### Available Packages (9)

**Merkle Trees:**
- `@zk-kit/imt` - Incremental Merkle Tree
- `@zk-kit/lean-imt` - Memory-optimized IMT
- `@zk-kit/smt` - Sparse Merkle Tree

**Cryptography:**
- `@zk-kit/eddsa-poseidon` - EdDSA signatures
- `@zk-kit/poseidon-cipher` - Poseidon encryption
- `@zk-kit/baby-jubjub` - Elliptic curve operations
- `@zk-kit/poseidon-proof` - Poseidon proofs

**Utilities:**
- `@zk-kit/utils` - Field operations
- `@zk-kit/logical-expressions` - Boolean logic

### Installation
```bash
npm install @zk-kit/imt
```
*Check [npm page](https://www.npmjs.com/package/@zk-kit/imt) for peer dependencies*

### Example
```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

const tree = new IMT(poseidon2, 16, 0, 2)
tree.insert(BigInt(1))
const proof = tree.createProof(0)
console.log(tree.verifyProof(proof)) // true
```

### Use Cases
- ✅ Web applications (React, Vue, Angular)
- ✅ Node.js backends
- ✅ Full-stack dApps
- ✅ Browser-based ZK proofs
- ✅ CLI tools

**→ [View all TypeScript packages](/docs/packages/overview)**

---

## 2. Circom

**Circuit library for zkSNARK development**

### Repository
- 🔗 [github.com/privacy-scaling-explorations/zk-kit.circom](https://github.com/privacy-scaling-explorations/zk-kit.circom)

### Available Circuits (5+)
- Binary Merkle Tree circuits
- Poseidon hash circuits
- EdDSA signature verification
- Membership proof circuits
- Custom ZK primitives

### Installation
```bash
git clone https://github.com/privacy-scaling-explorations/zk-kit.circom
```

### Example
```circom
include "node_modules/@zk-kit/binary-merkle-root.circom/src/binary-merkle-root.circom";

component main = BinaryMerkleRoot(20);
```

### Use Cases
- ✅ Custom zkSNARK circuits
- ✅ Groth16/PLONK proof systems
- ✅ Circuit composition
- ✅ Zero-knowledge applications
- ✅ Constraint system development

### Integration with TypeScript
Circom circuits work seamlessly with the TypeScript packages:

```typescript
// Generate proof with TypeScript
import { IMT } from "@zk-kit/imt"
const proof = tree.createProof(0)

// Verify in Circom circuit
// component main = MerkleTreeVerifier(16);
```

**→ [View Circom repository](https://github.com/privacy-scaling-explorations/zk-kit.circom)**

---

## 3. Noir

**Implementation for Aztec and Noir circuits**

### Repository
- 🔗 [github.com/privacy-scaling-explorations/zk-kit.noir](https://github.com/privacy-scaling-explorations/zk-kit.noir)

### Available Packages (4)
- Merkle Tree circuits
- Poseidon hash
- EdDSA signature verification
- Core ZK primitives

### Installation
```toml
[dependencies]
zk-kit = { tag = "v0.1.0", git = "https://github.com/privacy-scaling-explorations/zk-kit.noir" }
```

### Example
```rust
use dep::zk_kit;

fn main() {
    let tree = zk_kit::imt::IMT::new();
    tree.insert(leaf);
}
```

### Use Cases
- ✅ Aztec protocol development
- ✅ Noir circuit development
- ✅ Private smart contracts
- ✅ L2 privacy solutions
- ✅ UltraPlonk-based systems

**→ [View Noir repository](https://github.com/privacy-scaling-explorations/zk-kit.noir)**

---

## 4. Solidity

**Smart contracts for on-chain verification**

### Repository
- 🔗 [github.com/privacy-scaling-explorations/zk-kit.solidity](https://github.com/privacy-scaling-explorations/zk-kit.solidity)

### Available Contracts (4)
- Merkle Tree verifiers
- Poseidon hash (gas-optimized)
- Proof verification
- On-chain primitives

### Installation
```bash
npm install @zk-kit/solidity
```

### Example
```solidity
import "@zk-kit/imt.sol/contracts/IncrementalBinaryTree.sol";

contract MyContract {
    using IncrementalBinaryTree for IncrementalTreeData;
    IncrementalTreeData tree;
    
    function verifyProof(uint256[] calldata proof) public view returns (bool) {
        return tree.verify(proof);
    }
}
```

### Use Cases
- ✅ Ethereum smart contracts
- ✅ On-chain proof verification
- ✅ L1 privacy applications
- ✅ DAO voting systems
- ✅ ZK rollups

### Gas Optimization
The Solidity implementation is optimized for gas efficiency:
- Poseidon hash: ~50k gas
- Merkle proof verification: ~100k gas per depth

**→ [View Solidity repository](https://github.com/privacy-scaling-explorations/zk-kit.solidity)**

---

## 5. Rust

**High-performance implementation for backends**

### Repository
- 🔗 [github.com/privacy-scaling-explorations/zk-kit.rust](https://github.com/privacy-scaling-explorations/zk-kit.rust)

### Available Crates (3)
- Merkle Tree implementations
- Cryptographic primitives
- Performance-optimized algorithms

### Installation
```toml
[dependencies]
zk-kit = "0.1"
```

### Example
```rust
use zk_kit::imt::IMT;

fn main() {
    let mut tree = IMT::new(16);
    tree.insert(1);
    let proof = tree.create_proof(0);
    assert!(tree.verify_proof(&proof));
}
```

### Use Cases
- ✅ High-performance backends
- ✅ Native applications
- ✅ Performance-critical systems
- ✅ WebAssembly compilation
- ✅ Server-side proof generation

### Performance
Rust implementation offers significant performance benefits:
- 10x faster proof generation
- Lower memory usage
- Native compilation

**→ [View Rust repository](https://github.com/privacy-scaling-explorations/zk-kit.rust)**

---

## Choosing the Right Language

### Decision Matrix

| Your Stack | Recommended Implementation | Why |
|------------|---------------------------|-----|
| **React/Vue/Angular** | TypeScript/JavaScript | Native browser support |
| **Node.js backend** | TypeScript or Rust | TS for ease, Rust for performance |
| **zkSNARK circuits** | Circom | Standard for zk circuits |
| **Ethereum contracts** | Solidity | On-chain verification |
| **Aztec protocol** | Noir | Native Aztec support |
| **High-performance** | Rust | Best performance |
| **Full-stack dApp** | TypeScript + Solidity | Frontend + contracts |

### Multi-Language Architecture

Many projects use multiple implementations:

```
┌─────────────────────────────────────┐
│         Frontend (TypeScript)       │
│  - Generate proofs                  │
│  - User interface                   │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│      Smart Contract (Solidity)      │
│  - Verify proofs on-chain           │
│  - Store roots                      │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│         Backend (Rust)              │
│  - Heavy computations               │
│  - Proof generation at scale        │
└─────────────────────────────────────┘
```

### Example: Anonymous Voting System

**1. Circuit (Circom)**
```circom
// Define the voting circuit
include "@zk-kit/binary-merkle-root.circom";
component main = VotingCircuit(20);
```

**2. Frontend (TypeScript)**
```typescript
// Generate proof in browser
import { IMT } from "@zk-kit/imt"
const proof = tree.createProof(voterIndex)
```

**3. Smart Contract (Solidity)**
```solidity
// Verify proof on-chain
function vote(uint256[] calldata proof) public {
    require(verifyProof(proof), "Invalid proof");
    // Record vote
}
```

**4. Backend (Rust)** *(optional for scale)*
```rust
// Generate proofs for many users
use zk_kit::imt::IMT;
let proof = tree.create_proof(index);
```

---

## Cross-Language Compatibility

All ZK-Kit implementations are designed to be **compatible with each other**:

### Same Algorithms
- ✅ Same Poseidon hash parameters
- ✅ Same tree structures
- ✅ Same proof formats
- ✅ Interoperable results

### Example: Generate in TS, Verify in Solidity

**TypeScript (generate proof):**
```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

const tree = new IMT(poseidon2, 16, 0, 2)
tree.insert(BigInt(1))
const proof = tree.createProof(0)
// Send proof to smart contract
```

**Solidity (verify proof):**
```solidity
import "@zk-kit/imt.sol/contracts/IncrementalBinaryTree.sol";

function verifyMembership(uint256[] calldata proof) public view returns (bool) {
    return tree.verify(proof);
}
```

---

## Package Status by Language

| Language | Status | Audited | Production Ready |
|----------|--------|---------|------------------|
| **TypeScript** | ✅ Stable | ✅ Yes (5 packages) | ✅ Yes |
| **Circom** | ✅ Stable | ✅ Yes | ✅ Yes |
| **Noir** | ✅ Stable | ⚠️ Partial | ✅ Yes |
| **Solidity** | ✅ Stable | ✅ Yes | ✅ Yes |
| **Rust** | 🚧 Beta | ❌ Not yet | ⚠️ Testing |

---

## Contributing

Each language implementation welcomes contributions:

- **TypeScript**: [Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- **Circom**: [Issues](https://github.com/privacy-scaling-explorations/zk-kit.circom/issues)
- **Noir**: [Issues](https://github.com/privacy-scaling-explorations/zk-kit.noir/issues)
- **Solidity**: [Issues](https://github.com/privacy-scaling-explorations/zk-kit.solidity/issues)
- **Rust**: [Issues](https://github.com/privacy-scaling-explorations/zk-kit.rust/issues)

---

## Resources

### GitHub Repository
🔗 [github.com/privacy-scaling-explorations/zk-kit](https://github.com/privacy-scaling-explorations/zk-kit)

### Community
- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)

### Documentation
- 📚 TypeScript docs: You're reading them!
- 📚 Each repository has its own README and docs

---

## Next Steps

**Choose your path:**

1. **Building a web app?** → Start with [TypeScript/JavaScript](/docs/getting-started/quick-start)
2. **Writing circuits?** → Check out [Circom](https://github.com/privacy-scaling-explorations/zk-kit.circom)
3. **Smart contracts?** → Explore [Solidity](https://github.com/privacy-scaling-explorations/zk-kit.solidity)
4. **Aztec development?** → Try [Noir](https://github.com/privacy-scaling-explorations/zk-kit.noir)
5. **Performance-critical?** → Use [Rust](https://github.com/privacy-scaling-explorations/zk-kit.rust)

**Want to use multiple languages?** That's common! Start with TypeScript for the frontend, then add Solidity for smart contracts as needed.

