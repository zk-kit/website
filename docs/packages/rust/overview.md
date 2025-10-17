---
sidebar_position: 1
title: Rust Overview
---

# Rust Crates

ZK-Kit implementations in Rust for high-performance zero-knowledge applications.

## Overview

The ZK-Kit Rust package provides native Rust implementations offering:
- **Performance**: Native speed for cryptographic operations
- **Safety**: Rust's memory safety guarantees
- **WASM support**: Compile to WebAssembly for browser use
- **No-std compatible**: Use in embedded systems

## Repository

- **GitHub**: [zk-kit.rust](https://github.com/privacy-scaling-explorations/zk-kit.rust)
- **License**: MIT

## Installation

Add to your `Cargo.toml`:

```toml
[dependencies]
zk-kit-imt = "0.1.0"
zk-kit-poseidon = "0.1.0"
zk-kit-eddsa-poseidon = "0.1.0"
```

Or use cargo:

```bash
cargo add zk-kit-imt
cargo add zk-kit-poseidon
cargo add zk-kit-eddsa-poseidon
```

## Available Crates

### zk-kit-imt

Incremental Merkle Tree implementation.

**Usage**:

```rust
use zk_kit_imt::{IMT, PoseidonHash};

fn main() {
    // Create tree with depth 20
    let mut tree = IMT::new(20, 0);
    
    // Insert leaves
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    
    // Get root
    println!("Root: {:?}", tree.root());
    
    // Generate proof
    let proof = tree.create_proof(1);
    
    // Verify proof
    assert!(tree.verify_proof(&proof));
}
```

### zk-kit-poseidon

Poseidon hash function.

**Usage**:

```rust
use zk_kit_poseidon::Poseidon;

fn main() {
    let poseidon = Poseidon::new();
    
    // Hash two values
    let hash = poseidon.hash(&[1, 2]);
    println!("Hash: {:?}", hash);
    
    // Hash many values
    let hash_many = poseidon.hash(&[1, 2, 3, 4, 5]);
    println!("Hash: {:?}", hash_many);
}
```

### zk-kit-eddsa-poseidon

EdDSA signatures with Poseidon.

**Usage**:

```rust
use zk_kit_eddsa_poseidon::{PrivateKey, Signature};

fn main() {
    // Generate key pair
    let private_key = PrivateKey::new(b"my-secret");
    let public_key = private_key.public_key();
    
    // Sign message
    let message = 12345u64;
    let signature = private_key.sign(message);
    
    // Verify signature
    assert!(public_key.verify(message, &signature));
}
```

## Quick Start Example

### Complete Membership Proof System

```rust
use zk_kit_imt::IMT;
use zk_kit_poseidon::Poseidon;
use zk_kit_eddsa_poseidon::PrivateKey;

fn main() {
    // Create identity
    let identity = PrivateKey::new(b"alice-secret");
    let commitment = identity.public_key().commitment();
    
    // Create Merkle tree of commitments
    let mut tree = IMT::new(20, 0);
    tree.insert(commitment);
    tree.insert(123); // Other members
    tree.insert(456);
    
    // Generate membership proof
    let proof = tree.create_proof(0); // Prove first leaf
    
    // Verify proof
    assert!(tree.verify_proof(&proof));
    
    println!("✓ Membership verified");
    println!("Root: {:?}", tree.root());
}
```

## API Reference

### IMT (Incremental Merkle Tree)

#### `new`

```rust
pub fn new(depth: usize, zero_value: u64) -> Self
```

Creates a new tree.

**Parameters**:
- `depth`: Maximum depth
- `zero_value`: Value for empty leaves

**Example**:

```rust
let tree = IMT::new(20, 0);
```

#### `insert`

```rust
pub fn insert(&mut self, leaf: u64)
```

Inserts a leaf into the tree.

**Example**:

```rust
tree.insert(123);
tree.insert(456);
```

#### `update`

```rust
pub fn update(&mut self, index: usize, new_leaf: u64)
```

Updates a leaf at the specified index.

**Example**:

```rust
tree.update(0, 999);
```

#### `root`

```rust
pub fn root(&self) -> u64
```

Returns the current root.

**Example**:

```rust
let root = tree.root();
```

#### `create_proof`

```rust
pub fn create_proof(&self, index: usize) -> Proof
```

Generates a Merkle proof.

**Example**:

```rust
let proof = tree.create_proof(0);
```

#### `verify_proof`

```rust
pub fn verify_proof(&self, proof: &Proof) -> bool
```

Verifies a Merkle proof.

**Example**:

```rust
assert!(tree.verify_proof(&proof));
```

### Poseidon

#### `new`

```rust
pub fn new() -> Self
```

Creates a new Poseidon hasher.

**Example**:

```rust
let poseidon = Poseidon::new();
```

#### `hash`

```rust
pub fn hash(&self, inputs: &[u64]) -> u64
```

Hashes an array of values.

**Example**:

```rust
let hash = poseidon.hash(&[1, 2, 3]);
```

#### `hash2`

```rust
pub fn hash2(&self, left: u64, right: u64) -> u64
```

Optimized hash of two values.

**Example**:

```rust
let hash = poseidon.hash2(1, 2);
```

### PrivateKey (EdDSA)

#### `new`

```rust
pub fn new(seed: &[u8]) -> Self
```

Creates a private key from a seed.

**Example**:

```rust
let private_key = PrivateKey::new(b"my-secret");
```

#### `public_key`

```rust
pub fn public_key(&self) -> PublicKey
```

Derives the public key.

**Example**:

```rust
let public_key = private_key.public_key();
```

#### `sign`

```rust
pub fn sign(&self, message: u64) -> Signature
```

Signs a message.

**Example**:

```rust
let signature = private_key.sign(123);
```

### PublicKey

#### `verify`

```rust
pub fn verify(&self, message: u64, signature: &Signature) -> bool
```

Verifies a signature.

**Example**:

```rust
assert!(public_key.verify(123, &signature));
```

#### `commitment`

```rust
pub fn commitment(&self) -> u64
```

Returns the commitment (hash of public key).

**Example**:

```rust
let commitment = public_key.commitment();
```

## Advanced Usage

### WASM Support

Build for WebAssembly:

```bash
# Install wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Build for wasm
wasm-pack build --target web
```

Use in JavaScript:

```javascript
import init, { IMT } from './pkg/my_zk_kit.js';

async function main() {
    await init();
    
    const tree = IMT.new(20, 0);
    tree.insert(123);
    tree.insert(456);
    
    console.log("Root:", tree.root());
}
```

### No-Std Support

For embedded systems:

```toml
[dependencies]
zk-kit-imt = { version = "0.1", default-features = false }
```

```rust
#![no_std]

use zk_kit_imt::IMT;

fn embedded_proof() {
    let mut tree = IMT::new(10, 0);
    tree.insert(123);
    // Works without std!
}
```

### Parallel Processing

```rust
use rayon::prelude::*;
use zk_kit_imt::IMT;

fn batch_verify(proofs: Vec<Proof>) -> bool {
    proofs.par_iter().all(|proof| {
        IMT::verify_proof_static(proof)
    })
}
```

### Custom Hash Functions

```rust
use zk_kit_imt::{IMT, HashFunction};

struct CustomHash;

impl HashFunction for CustomHash {
    fn hash(&self, left: u64, right: u64) -> u64 {
        // Your custom hash implementation
        left.wrapping_add(right)
    }
}

fn main() {
    let tree = IMT::with_hasher(20, 0, CustomHash);
}
```

## Performance Benchmarks

| Operation | Time | Throughput |
|-----------|------|------------|
| Tree Insert | 50 μs | 20k ops/s |
| Proof Generation | 100 μs | 10k ops/s |
| Proof Verification | 80 μs | 12.5k ops/s |
| Poseidon Hash | 10 μs | 100k ops/s |
| EdDSA Sign | 200 μs | 5k ops/s |
| EdDSA Verify | 300 μs | 3.3k ops/s |

*Benchmarked on Apple M1*

## Testing

```bash
# Run tests
cargo test

# Run benchmarks
cargo bench

# Run with all features
cargo test --all-features

# Run specific test
cargo test test_merkle_proof
```

Example test:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_merkle_proof() {
        let mut tree = IMT::new(20, 0);
        tree.insert(123);
        
        let proof = tree.create_proof(0);
        assert!(tree.verify_proof(&proof));
    }
    
    #[test]
    fn test_signature() {
        let private_key = PrivateKey::new(b"test");
        let public_key = private_key.public_key();
        
        let sig = private_key.sign(123);
        assert!(public_key.verify(123, &sig));
    }
}
```

## Error Handling

```rust
use zk_kit_imt::{IMT, IMTError};

fn safe_operations() -> Result<(), IMTError> {
    let mut tree = IMT::new(20, 0);
    
    // Checked operations
    tree.insert_checked(123)?;
    tree.update_checked(0, 456)?;
    
    let proof = tree.create_proof_checked(0)?;
    
    Ok(())
}
```

## Documentation

Generate and view docs:

```bash
cargo doc --open
```

## Best Practices

### Memory Management

```rust
// ✅ Good: Reuse trees
let mut tree = IMT::new(20, 0);
for i in 0..1000 {
    tree.insert(i);
}

// ✅ Good: Clone only when needed
let tree_copy = tree.clone();

// ✅ Good: Use references
fn process_tree(tree: &IMT) {
    // No ownership transfer
}
```

### Performance

```rust
// ✅ Good: Batch operations
let leaves = vec![1, 2, 3, 4, 5];
tree.insert_batch(&leaves);

// ✅ Good: Use iterators
let hashes: Vec<_> = values.iter()
    .map(|v| poseidon.hash(&[*v]))
    .collect();

// ✅ Good: Avoid unnecessary allocations
let proof = tree.create_proof(0); // Stack allocated
```

## Related Documentation

- [JavaScript Packages](/docs/packages/javascript/imt) - JS equivalent
- [Circom Circuits](/docs/packages/circom/overview) - Circuit implementations
- [Development Setup](/docs/getting-started/development-setup) - Setup guide

## Common Use Cases

- ✅ High-performance proof generation
- ✅ Backend services
- ✅ WASM-based web apps
- ✅ Embedded systems
- ✅ Native mobile apps
- ✅ Command-line tools

## Source

- **GitHub**: [zk-kit.rust](https://github.com/privacy-scaling-explorations/zk-kit.rust)
- **Crates.io**: [zk-kit-imt](https://crates.io/crates/zk-kit-imt)
- **Docs.rs**: [Documentation](https://docs.rs/zk-kit-imt)
- **License**: MIT

## Community

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Examples](https://github.com/privacy-scaling-explorations/zk-kit.rust/tree/main/examples)

