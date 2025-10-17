---
sidebar_position: 1
title: Packages Overview
---

# ZK-Kit Packages Overview

Explore all available packages in the ZK-Kit ecosystem.

## Package Categories

### 🌳 Merkle Trees

Build privacy-preserving membership systems.

| Package | Description | Install | Use When |
|---------|-------------|---------|----------|
| **[@zk-kit/imt](https://www.npmjs.com/package/@zk-kit/imt)** | Incremental Merkle Tree | `npm i @zk-kit/imt` | Standard choice for most applications |
| **[@zk-kit/lean-imt](https://www.npmjs.com/package/@zk-kit/lean-imt)** | Memory-optimized IMT | `npm i @zk-kit/lean-imt` | Resource-constrained environments |
| **[@zk-kit/smt](https://www.npmjs.com/package/@zk-kit/smt)** | Sparse Merkle Tree | `npm i @zk-kit/smt` | Key-value storage + non-membership proofs |

### 🔐 Cryptography

Zero-knowledge friendly cryptographic primitives.

| Package | Description | Install | Use When |
|---------|-------------|---------|----------|
| **[@zk-kit/eddsa-poseidon](https://www.npmjs.com/package/@zk-kit/eddsa-poseidon)** | EdDSA signatures | `npm i @zk-kit/eddsa-poseidon` | Digital signatures in ZK circuits |
| **[@zk-kit/poseidon-cipher](https://www.npmjs.com/package/@zk-kit/poseidon-cipher)** | Poseidon encryption | `npm i @zk-kit/poseidon-cipher` | Encrypt/decrypt data for ZK |
| **[@zk-kit/baby-jubjub](https://www.npmjs.com/package/@zk-kit/baby-jubjub)** | Elliptic curve ops | `npm i @zk-kit/baby-jubjub` | Low-level curve operations |
| **[@zk-kit/poseidon-proof](https://www.npmjs.com/package/@zk-kit/poseidon-proof)** | Poseidon proofs | `npm i @zk-kit/poseidon-proof` | Generate zk-SNARK proofs |

### 🛠️ Utilities

Helper functions for zero-knowledge development.

| Package | Description | Install | Use When |
|---------|-------------|---------|----------|
| **[@zk-kit/utils](https://www.npmjs.com/package/@zk-kit/utils)** | Field operations & conversions | `npm i @zk-kit/utils` | Need field arithmetic or conversions |
| **[@zk-kit/logical-expressions](https://www.npmjs.com/package/@zk-kit/logical-expressions)** | Boolean logic | `npm i @zk-kit/logical-expressions` | Boolean expressions in ZK |

## Quick Start by Use Case

### I want to build...

#### Anonymous Voting
```bash
npm i @zk-kit/imt
# + peer dependencies (check npm page)
```
→ See [Semaphore](https://semaphore.pse.dev) and [MACI](https://maci.pse.dev) examples

#### Private Airdrops
```bash
npm i @zk-kit/imt @zk-kit/eddsa-poseidon
# + peer dependencies (check npm page)
```
→ See [Your First Proof](/docs/getting-started/first-proof) guide

#### Identity System
```bash
npm i @zk-kit/imt @zk-kit/eddsa-poseidon @zk-kit/poseidon-cipher
# + peer dependencies (check npm page)
```
→ See [Worldcoin](https://worldcoin.org) implementation

#### Key-Value Store with Proofs
```bash
npm i @zk-kit/smt
# + peer dependencies (check npm page)
```
→ See [Iden3](https://github.com/iden3) implementation

## Package Status

### Audited Packages ✅

These packages have undergone security audits:

- ✅ **@zk-kit/imt** - Audited by Trail of Bits
- ✅ **@zk-kit/eddsa-poseidon** - Audited
- ✅ **@zk-kit/baby-jubjub** - Audited
- ✅ **@zk-kit/poseidon-cipher** - Audited
- ✅ **@zk-kit/utils** - Audited

[View Audit Reports →](https://semaphore.pse.dev/Semaphore_4.0.0_Audit.pdf)

### In Development 🚧

- 🚧 **@zk-kit/groth16** - Coming soon
- 🚧 **@zk-kit/plonk** - Coming soon

## Installation Patterns

### Minimal Setup

Just Merkle trees:

```bash
npm i @zk-kit/imt
# Check npm for peer dependencies
```

### Standard Setup

Trees + signatures:

```bash
npm i @zk-kit/imt @zk-kit/eddsa-poseidon
# Check npm for peer dependencies
```

### Full Stack

All main packages:

```bash
npm i @zk-kit/imt @zk-kit/lean-imt @zk-kit/smt \
      @zk-kit/eddsa-poseidon @zk-kit/poseidon-cipher \
      @zk-kit/utils poseidon-lite crypto-js
```

## Language Variants

ZK-Kit is available in multiple languages:

### JavaScript/TypeScript
```bash
npm i @zk-kit/imt
```
[npm package →](https://www.npmjs.com/package/@zk-kit/imt) | [GitHub →](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/imt)

:::tip
Check the package's npm page for peer dependencies (e.g., hash functions).
:::

### Circom
```bash
# Clone circuits repository
git clone https://github.com/privacy-scaling-explorations/zk-kit.circom
```
[Repository →](https://github.com/privacy-scaling-explorations/zk-kit.circom)

### Solidity
```bash
npm i @zk-kit/imt.sol
```
[Repository →](https://github.com/privacy-scaling-explorations/zk-kit.solidity)

### Noir
```bash
# Add to Nargo.toml
[dependencies]
zk-kit = { tag = "v0.1.0", git = "https://github.com/privacy-scaling-explorations/zk-kit.noir" }
```
[Repository →](https://github.com/privacy-scaling-explorations/zk-kit.noir)

### Rust
```bash
cargo add zk-kit
```
[Repository →](https://github.com/privacy-scaling-explorations/zk-kit.rust)

## Bundle Sizes

| Package | Minified | Min + Gzip | Tree-Shakeable |
|---------|----------|------------|----------------|
| @zk-kit/imt | 12 KB | 4 KB | ✅ |
| @zk-kit/lean-imt | 8 KB | 3 KB | ✅ |
| @zk-kit/smt | 15 KB | 5 KB | ✅ |
| @zk-kit/eddsa-poseidon | 10 KB | 3.5 KB | ✅ |
| @zk-kit/poseidon-cipher | 6 KB | 2 KB | ✅ |
| @zk-kit/baby-jubjub | 8 KB | 2.5 KB | ✅ |
| @zk-kit/utils | 5 KB | 1.5 KB | ✅ |

## Browser Support

All packages support modern browsers with:
- ES2020+
- BigInt support
- WebAssembly (for some operations)

See the [Installation Guide](/docs/getting-started/installation#browser-support) for browser configuration.

## Next Steps

- [Choose a Package](/docs/packages/choosing-a-package) - Decision guide
- [Installation](/docs/getting-started/installation) - Install packages
- [Quick Start](/docs/getting-started/quick-start) - Start building
- [Ecosystem](/docs/introduction/ecosystem) - See real-world usage

## Resources

- [GitHub Repository](https://github.com/privacy-scaling-explorations/zk-kit)
- [npm Organization](https://www.npmjs.com/org/zk-kit)
- [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)

