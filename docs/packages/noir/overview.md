---
sidebar_position: 1
title: Noir Overview
---

# Noir Libraries

ZK-Kit implementations in Noir, a domain-specific language for writing zero-knowledge circuits.

## Overview

The ZK-Kit Noir package provides libraries for building zero-knowledge applications using the Noir language, which offers:
- **Modern syntax**: Rust-like syntax for ZK circuits
- **Type safety**: Strong typing for circuit development
- **PLONK-based**: No trusted setup per-circuit
- **Easy integration**: Works with Ethereum and other chains

## Repository

- **GitHub**: [zk-kit.noir](https://github.com/privacy-scaling-explorations/zk-kit.noir)
- **License**: MIT

## Prerequisites

Install Noir and its tooling:

```bash
# Install noirup (Noir version manager)
curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash

# Install latest Noir
noirup

# Verify installation
nargo --version
```

For detailed setup, see [Development Setup](/docs/getting-started/development-setup).

## Installation

Add to your `Nargo.toml`:

```toml
[dependencies]
zk_kit = { tag = "v0.1.0", git = "https://github.com/privacy-scaling-explorations/zk-kit.noir" }
```

Or clone directly:

```bash
git clone https://github.com/privacy-scaling-explorations/zk-kit.noir
```

## Available Libraries

### Merkle Trees

Incremental Merkle Tree implementation in Noir.

**Usage**:

```rust
use dep::zk_kit::merkle_tree::verify_proof;

fn main(
    root: Field,
    leaf: Field,
    path_indices: [u1; 20],
    siblings: [Field; 20]
) {
    let is_valid = verify_proof(root, leaf, path_indices, siblings);
    assert(is_valid);
}
```

### Poseidon Hash

Poseidon hash function for Noir circuits.

**Usage**:

```rust
use dep::zk_kit::poseidon::poseidon2;

fn main(left: Field, right: Field) -> pub Field {
    poseidon2([left, right])
}
```

### EdDSA Signatures

EdDSA signature verification in Noir.

**Usage**:

```rust
use dep::zk_kit::eddsa::verify_signature;

fn main(
    message: Field,
    signature_r: Field,
    signature_s: Field,
    public_key_x: Field,
    public_key_y: Field
) {
    let is_valid = verify_signature(
        message,
        signature_r,
        signature_s,
        public_key_x,
        public_key_y
    );
    assert(is_valid);
}
```

## Quick Start Example

### Simple Membership Proof

```rust
// src/main.nr
use dep::std;
use dep::zk_kit::merkle_tree::verify_proof;
use dep::zk_kit::poseidon::poseidon2;

fn main(
    // Public inputs
    root: pub Field,
    nullifier: pub Field,
    
    // Private inputs
    secret: Field,
    path_indices: [u1; 20],
    siblings: [Field; 20]
) {
    // Compute leaf from secret
    let leaf = poseidon2([secret, nullifier]);
    
    // Verify membership
    let is_member = verify_proof(root, leaf, path_indices, siblings);
    assert(is_member);
}
```

### Project Structure

```
my-project/
├── Nargo.toml
├── Prover.toml
├── Verifier.toml
└── src/
    └── main.nr
```

### Nargo.toml

```toml
[package]
name = "my_zk_app"
type = "bin"
authors = [""]
compiler_version = ">=0.19.0"

[dependencies]
zk_kit = { tag = "v0.1.0", git = "https://github.com/privacy-scaling-explorations/zk-kit.noir" }
```

### Prover.toml (Input)

```toml
root = "0x123..."
nullifier = "0x456..."
secret = "0x789..."
path_indices = [0, 1, 0, 1, ...]
siblings = ["0xabc...", "0xdef...", ...]
```

## Build and Prove

```bash
# Compile circuit
nargo compile

# Check circuit
nargo check

# Generate proof
nargo prove

# Verify proof
nargo verify

# Generate Solidity verifier
nargo codegen-verifier
```

## Integration with JavaScript

Generate inputs using ZK-Kit JavaScript packages:

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"
import fs from "fs"

// Create tree
const tree = new IMT(poseidon2, 20, 0, 2)
tree.insert(BigInt(123))
tree.insert(BigInt(456))

// Generate proof
const proof = tree.createProof(0)

// Create Prover.toml
const proverToml = `
root = "${proof.root}"
leaf = "${proof.leaf}"
path_indices = [${proof.pathIndices.join(", ")}]
siblings = [${proof.siblings.map(s => `"${s}"`).join(", ")}]
`

fs.writeFileSync("Prover.toml", proverToml)
```

```bash
# Generate proof with the inputs
nargo prove
```

## API Reference

### Merkle Tree Functions

#### `verify_proof`

```rust
fn verify_proof<N>(
    root: Field,
    leaf: Field,
    path_indices: [u1; N],
    siblings: [Field; N]
) -> bool
```

Verifies a Merkle tree membership proof.

**Parameters**:
- `root`: Expected Merkle root
- `leaf`: Leaf to verify
- `path_indices`: Path through tree (0=left, 1=right)
- `siblings`: Sibling hashes at each level
- `N`: Tree depth (generic parameter)

**Returns**: `true` if proof is valid

**Example**:

```rust
use dep::zk_kit::merkle_tree::verify_proof;

let is_valid = verify_proof(root, leaf, path_indices, siblings);
assert(is_valid);
```

### Poseidon Functions

#### `poseidon2`

```rust
fn poseidon2(inputs: [Field; 2]) -> Field
```

Hashes two field elements.

**Parameters**:
- `inputs`: Array of 2 field elements

**Returns**: Hash digest

**Example**:

```rust
use dep::zk_kit::poseidon::poseidon2;

let hash = poseidon2([left, right]);
```

#### `poseidon`

```rust
fn poseidon<N>(inputs: [Field; N]) -> Field
```

Hashes multiple field elements.

**Parameters**:
- `inputs`: Array of N field elements
- `N`: Number of inputs (generic parameter)

**Returns**: Hash digest

**Example**:

```rust
use dep::zk_kit::poseidon::poseidon;

let hash = poseidon([a, b, c, d]);
```

### EdDSA Functions

#### `verify_signature`

```rust
fn verify_signature(
    message: Field,
    signature_r: Field,
    signature_s: Field,
    public_key_x: Field,
    public_key_y: Field
) -> bool
```

Verifies an EdDSA signature.

**Parameters**:
- `message`: Message that was signed
- `signature_r`: R component of signature
- `signature_s`: S component of signature
- `public_key_x`: X coordinate of public key
- `public_key_y`: Y coordinate of public key

**Returns**: `true` if signature is valid

**Example**:

```rust
use dep::zk_kit::eddsa::verify_signature;

let is_valid = verify_signature(
    message,
    sig_r,
    sig_s,
    pub_x,
    pub_y
);
assert(is_valid);
```

## Advanced Usage

### Custom Circuit with ZK-Kit

```rust
use dep::std;
use dep::zk_kit::merkle_tree::verify_proof;
use dep::zk_kit::poseidon::{poseidon2, poseidon};

fn main(
    // Public inputs
    root: pub Field,
    nullifier_hash: pub Field,
    signal: pub Field,
    
    // Private inputs
    identity_nullifier: Field,
    identity_trapdoor: Field,
    path_indices: [u1; 20],
    siblings: [Field; 20]
) {
    // Compute identity commitment
    let commitment = poseidon2([identity_nullifier, identity_trapdoor]);
    
    // Verify membership in tree
    let is_member = verify_proof(root, commitment, path_indices, siblings);
    assert(is_member);
    
    // Verify nullifier
    let computed_nullifier = poseidon([identity_nullifier, 1]);
    assert(computed_nullifier == nullifier_hash);
    
    // Signal can be any public output
    // No assertion needed - just proves knowledge
}
```

### Multi-Proof Circuit

```rust
use dep::zk_kit::merkle_tree::verify_proof;

fn main(
    root1: pub Field,
    root2: pub Field,
    leaf1: Field,
    leaf2: Field,
    path1: [u1; 20],
    siblings1: [Field; 20],
    path2: [u1; 20],
    siblings2: [Field; 20]
) {
    // Verify membership in first tree
    let valid1 = verify_proof(root1, leaf1, path1, siblings1);
    assert(valid1);
    
    // Verify membership in second tree
    let valid2 = verify_proof(root2, leaf2, path2, siblings2);
    assert(valid2);
}
```

## Testing Circuits

```bash
# Run tests
nargo test
```

Create test file `src/test.nr`:

```rust
#[test]
fn test_merkle_proof() {
    use dep::zk_kit::merkle_tree::verify_proof;
    
    let root = 0x123;
    let leaf = 0x456;
    let path_indices = [0, 1];
    let siblings = [0xabc, 0xdef];
    
    let is_valid = verify_proof(root, leaf, path_indices, siblings);
    assert(is_valid);
}
```

## Proof Generation

```bash
# Compile
nargo compile

# Generate proof
nargo prove

# Outputs: proofs/my_zk_app.proof
```

## Verification

### Local Verification

```bash
nargo verify
```

### Generate Solidity Verifier

```bash
# Generate verifier contract
nargo codegen-verifier

# Outputs: contract/my_zk_app/plonk_vk.sol
```

### Deploy Verifier

```solidity
// Deploy and use the generated verifier
contract MyApp {
    UltraVerifier public verifier;
    
    constructor(address _verifier) {
        verifier = UltraVerifier(_verifier);
    }
    
    function verify(bytes calldata proof, bytes32[] calldata publicInputs) 
        external 
        view 
        returns (bool) 
    {
        return verifier.verify(proof, publicInputs);
    }
}
```

## Best Practices

### Circuit Design

```rust
// ✅ Good: Clear public/private distinction
fn main(
    root: pub Field,  // Public
    secret: Field     // Private
) {
    // ...
}

// ✅ Good: Use const for fixed sizes
global TREE_DEPTH: u64 = 20;

// ✅ Good: Modular functions
fn compute_nullifier(secret: Field, index: Field) -> Field {
    poseidon2([secret, index])
}
```

### Performance

```rust
// ✅ Good: Minimize constraints
let hash = poseidon2([a, b]);  // Single hash

// ❌ Bad: Redundant operations
let temp1 = poseidon2([a, b]);
let temp2 = poseidon2([a, b]);  // Duplicate!
```

## Related Documentation

- [JavaScript Packages](/docs/packages/javascript/imt) - Generate inputs
- [Circom Circuits](/docs/packages/circom/overview) - Alternative circuit language
- [Solidity Contracts](/docs/packages/solidity/overview) - On-chain verification
- [Development Setup](/docs/getting-started/development-setup) - Setup guide

## Common Use Cases

- ✅ Anonymous voting
- ✅ Private credentials
- ✅ ZK identity systems
- ✅ Private transactions
- ✅ Confidential computation

## Troubleshooting

### Circuit Won't Compile

```bash
# Check Noir version
nargo --version

# Update Noir
noirup

# Clean build
nargo clean
nargo compile
```

### Proof Generation Fails

- Check input format in `Prover.toml`
- Ensure field elements are in correct range
- Verify constraint satisfaction

## Source

- **GitHub**: [zk-kit.noir](https://github.com/privacy-scaling-explorations/zk-kit.noir)
- **Noir Docs**: [noir-lang.org](https://noir-lang.org)
- **License**: MIT

## Community

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Examples](https://github.com/privacy-scaling-explorations/zk-kit.noir/tree/main/examples)

