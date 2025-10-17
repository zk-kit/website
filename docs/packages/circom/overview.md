---
sidebar_position: 1
title: Circom Overview
---

# Circom Circuits

Reusable Circom circuit templates for implementing ZK-Kit components in zero-knowledge proofs.

## Overview

The ZK-Kit Circom package provides circuit templates that correspond to the JavaScript implementations, allowing you to:
- Verify Merkle tree proofs in-circuit
- Perform EdDSA signature verification
- Use Poseidon hash function
- Implement privacy-preserving applications

## Repository

- **GitHub**: [zk-kit.circom](https://github.com/privacy-scaling-explorations/zk-kit.circom)
- **License**: MIT

## Prerequisites

Before using ZK-Kit circuits, you need:

```bash
# Install Circom compiler
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install circom

# Or use pre-built binaries
# See: https://docs.circom.io/getting-started/installation/
```

For detailed setup, see [Development Setup](/docs/getting-started/development-setup).

## Installation

```bash
# Clone the repository
git clone https://github.com/privacy-scaling-explorations/zk-kit.circom.git

# Or add as a submodule to your project
git submodule add https://github.com/privacy-scaling-explorations/zk-kit.circom circuits/zk-kit
```

## Available Circuits

### Merkle Tree Circuits

#### Binary Merkle Tree Verifier
Verifies membership proofs for binary Merkle trees.

**Location**: `circuits/merkle-tree/binary-tree-verifier.circom`

**Usage**:
```circom
include "zk-kit/merkle-tree/binary-tree-verifier.circom"

component main {public [root]} = BinaryTreeVerifier(20);
```

#### LeanIMT Verifier
Verifies proofs for Lean Incremental Merkle Trees.

**Location**: `circuits/merkle-tree/lean-imt-verifier.circom`

**Usage**:
```circom
include "zk-kit/merkle-tree/lean-imt-verifier.circom"

component main {public [root]} = LeanIMTVerifier(20);
```

### Cryptography Circuits

#### EdDSA Poseidon Verifier
Verifies EdDSA signatures using Poseidon hash.

**Location**: `circuits/eddsa-poseidon/eddsa-poseidon-verifier.circom`

**Usage**:
```circom
include "zk-kit/eddsa-poseidon/eddsa-poseidon-verifier.circom"

component main {public [publicKeyX, publicKeyY]} = EdDSAPoseidonVerifier();
```

#### Poseidon Hash
Poseidon hash function implementation.

**Location**: `circuits/poseidon/poseidon.circom`

**Usage**:
```circom
include "zk-kit/poseidon/poseidon.circom"

component main = Poseidon(2); // 2 inputs
```

### Baby JubJub Circuits

#### Point Addition
Baby JubJub elliptic curve point addition.

**Location**: `circuits/baby-jubjub/point-add.circom`

**Usage**:
```circom
include "zk-kit/baby-jubjub/point-add.circom"

component main = BabyJubJubAdd();
```

#### Scalar Multiplication
Baby JubJub scalar multiplication.

**Location**: `circuits/baby-jubjub/scalar-mul.circom`

**Usage**:
```circom
include "zk-kit/baby-jubjub/scalar-mul.circom"

component main = BabyJubJubScalarMul();
```

## Quick Start Example

### Simple Merkle Proof Verification

```circom
pragma circom 2.0.0;

include "zk-kit/merkle-tree/binary-tree-verifier.circom";

// Verify membership in a Merkle tree of depth 20
template MembershipProof() {
    // Public inputs
    signal input root;
    
    // Private inputs
    signal input leaf;
    signal input siblings[20];
    signal input pathIndices[20];
    
    // Verify the proof
    component verifier = BinaryTreeVerifier(20);
    verifier.root <== root;
    verifier.leaf <== leaf;
    
    for (var i = 0; i < 20; i++) {
        verifier.siblings[i] <== siblings[i];
        verifier.pathIndices[i] <== pathIndices[i];
    }
}

component main {public [root]} = MembershipProof();
```

### Compile and Generate Proof

```bash
# Compile circuit
circom membership-proof.circom --r1cs --wasm --sym

# Generate witness
node membership-proof_js/generate_witness.js \
  membership-proof_js/membership-proof.wasm \
  input.json \
  witness.wtns

# Generate proof (using snarkjs)
snarkjs groth16 prove \
  membership-proof.zkey \
  witness.wtns \
  proof.json \
  public.json

# Verify proof
snarkjs groth16 verify \
  verification_key.json \
  public.json \
  proof.json
```

## Circuit Templates

### Binary Tree Verifier

```circom
template BinaryTreeVerifier(depth) {
    signal input root;
    signal input leaf;
    signal input siblings[depth];
    signal input pathIndices[depth];
    
    // Implementation verifies:
    // - Hash path from leaf to root
    // - Path matches provided root
}
```

**Parameters**:
- `depth`: Maximum depth of the tree (e.g., 20 for 2^20 leaves)

**Inputs**:
- `root`: Expected Merkle root (public)
- `leaf`: Leaf value to prove (private)
- `siblings`: Sibling hashes along the path (private)
- `pathIndices`: Left/right indicators (0 or 1) for each level (private)

**Constraints**: ~depth * 3 constraints

### EdDSA Poseidon Verifier

```circom
template EdDSAPoseidonVerifier() {
    signal input message;
    signal input R8x;
    signal input R8y;
    signal input S;
    signal input publicKeyX;
    signal input publicKeyY;
    
    // Implementation verifies EdDSA signature
}
```

**Inputs**:
- `message`: Message that was signed (private)
- `R8x`, `R8y`: Signature R point coordinates (private)
- `S`: Signature scalar (private)
- `publicKeyX`, `publicKeyY`: Public key coordinates (public)

**Constraints**: ~2000 constraints

### Poseidon Hash

```circom
template Poseidon(nInputs) {
    signal input inputs[nInputs];
    signal output out;
    
    // Implementation of Poseidon hash
}
```

**Parameters**:
- `nInputs`: Number of inputs to hash (typically 2-16)

**Inputs**:
- `inputs`: Array of field elements to hash

**Outputs**:
- `out`: Hash digest

**Constraints**: ~nInputs * 50 constraints (approximate)

## Integration with JavaScript

Use the JavaScript packages to generate inputs for circuits:

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"
import fs from "fs"

// Create tree
const tree = new IMT(poseidon2, 20, 0, 2)
tree.insert(BigInt(123))
tree.insert(BigInt(456))
tree.insert(BigInt(789))

// Generate proof
const proof = tree.createProof(1) // Prove index 1

// Create circuit input
const input = {
    root: proof.root.toString(),
    leaf: proof.leaf.toString(),
    siblings: proof.siblings.map(s => s.toString()),
    pathIndices: proof.pathIndices
}

// Save for circuit
fs.writeFileSync("input.json", JSON.stringify(input))
```

## Best Practices

### 1. Circuit Design

```circom
// ✅ Good: Clear template parameters
template MyCircuit(depth, width) {
    // ...
}

// ❌ Bad: Magic numbers
template MyCircuit() {
    signal siblings[20]; // Why 20?
}
```

### 2. Public vs Private Signals

```circom
// ✅ Good: Minimal public inputs
component main {public [root, nullifier]} = MyCircuit();

// ❌ Bad: Exposing private data
component main {public [root, leaf, siblings]} = MyCircuit();
```

### 3. Constraint Optimization

```circom
// ✅ Good: Reuse components
component hasher = Poseidon(2);
for (var i = 0; i < n; i++) {
    hasher.inputs[0] <== values[i];
    hasher.inputs[1] <== salts[i];
    hashes[i] <== hasher.out;
}

// ❌ Bad: Create multiple instances unnecessarily
for (var i = 0; i < n; i++) {
    component hasher = Poseidon(2); // Creates n instances!
}
```

## Proof Systems

ZK-Kit circuits work with multiple proof systems:

### Groth16
```bash
# Fast verification, trusted setup
snarkjs groth16 setup circuit.r1cs pot.ptau circuit.zkey
```

### PLONK
```bash
# No trusted setup per-circuit
snarkjs plonk setup circuit.r1cs pot.ptau circuit.zkey
```

### FFLONK
```bash
# Smaller proofs than PLONK
snarkjs fflonk setup circuit.r1cs pot.ptau circuit.zkey
```

## Performance Considerations

| Circuit | Constraints | Proof Time | Verification Time |
|---------|-------------|------------|-------------------|
| BinaryTreeVerifier(20) | ~60,000 | ~2s | ~5ms |
| EdDSAPoseidonVerifier | ~2,000 | ~500ms | ~5ms |
| Poseidon(2) | ~100 | &lt;100ms | ~2ms |

*Times are approximate and depend on hardware*

## Testing Circuits

```bash
# Install circom tester
npm install --save-dev circom_tester

# Create test file
# tests/merkle-tree.test.js
```

```javascript
const { wasm } = require("circom_tester")
const path = require("path")

describe("Merkle Tree Circuit", function() {
    let circuit
    
    before(async function() {
        circuit = await wasm(
            path.join(__dirname, "circuits", "merkle-tree.circom")
        )
    })
    
    it("should verify valid proof", async function() {
        const input = {
            root: "123",
            leaf: "456",
            siblings: [/* ... */],
            pathIndices: [/* ... */]
        }
        
        const witness = await circuit.calculateWitness(input)
        await circuit.checkConstraints(witness)
    })
})
```

```bash
# Run tests
npx mocha tests/
```

## Related Documentation

- [Development Setup](/docs/getting-started/development-setup) - Setup Circom
- [JavaScript Packages](/docs/packages/javascript/imt) - Generate circuit inputs
- [Solidity Packages](/docs/packages/solidity/overview) - On-chain verification

## Common Use Cases

- ✅ Anonymous voting systems
- ✅ Private membership proofs
- ✅ Credential verification
- ✅ Privacy-preserving authentication
- ✅ ZK rollups
- ✅ Private transactions

## Troubleshooting

### Circuit Won't Compile

```bash
# Check Circom version
circom --version

# Use correct pragma
pragma circom 2.0.0;

# Check include paths
include "node_modules/circomlib/circuits/...";
```

### Constraint Failures

```javascript
// Add debug signals
signal debug;
debug <== intermediate_value;
log(debug);
```

### Performance Issues

- Reduce circuit depth where possible
- Use batch operations
- Consider circuit splitting
- Profile with `circom --inspect`

## Source

- **GitHub**: [zk-kit.circom](https://github.com/privacy-scaling-explorations/zk-kit.circom)
- **Circom Docs**: [docs.circom.io](https://docs.circom.io)
- **License**: MIT

## Community

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Circuit Examples](https://github.com/privacy-scaling-explorations/zk-kit.circom/tree/main/examples)

## Next Steps

- [Solidity Verification](/docs/packages/solidity/overview) - Verify proofs on-chain
- [Getting Started](/docs/getting-started/first-proof) - Build your first ZK proof

