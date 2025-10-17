---
slug: /
title: ZK-Kit Documentation
description: Production-ready zero-knowledge libraries for privacy-preserving applications
hide_table_of_contents: false
---

# Welcome to ZK-Kit Documentation

ZK-Kit is a comprehensive suite of production-ready zero-knowledge libraries that simplify building privacy-preserving applications.

## 🚀 Quick Navigation

### 🎯 New to ZK-Kit?
**Start here if you're new to zero-knowledge or ZK-Kit**

→ [What is ZK-Kit?](/docs/introduction/what-is-zk-kit)  
→ [Why Zero-Knowledge?](/docs/introduction/why-zero-knowledge)  
→ [Quick Start Guide](/docs/getting-started/quick-start)

### ⚡ Ready to Build?
**Jump straight into building with our guides**

→ [Installation](/docs/getting-started/installation)  
→ [Your First Proof](/docs/getting-started/first-proof)  
→ [Development Setup](/docs/getting-started/development-setup)

### 📦 Explore Packages
**Browse all available ZK-Kit packages**

→ [Packages Overview](/docs/packages/overview)  
→ [Choose a Package](/docs/packages/choosing-a-package)

### 🎓 Learn Concepts
**Understand zero-knowledge fundamentals**

→ [Zero-Knowledge Basics](/docs/core-concepts/zero-knowledge-basics)  
→ [Merkle Trees](/docs/core-concepts/merkle-trees)

---

## 📚 Documentation Sections

### Introduction
Learn what ZK-Kit is, why zero-knowledge matters, and explore the ecosystem.
- [What is ZK-Kit?](/docs/introduction/what-is-zk-kit)
- [Why Zero-Knowledge?](/docs/introduction/why-zero-knowledge)
- [Language Implementations](/docs/introduction/language-implementations) - TS, Circom, Noir, Solidity, Rust
- [Comparison with Other Libraries](/docs/introduction/comparison)
- [Ecosystem & Projects](/docs/introduction/ecosystem)

### Getting Started
Install packages and create your first zero-knowledge proof.
- [Installation](/docs/getting-started/installation)
- [Quick Start](/docs/getting-started/quick-start) - 2-minute tutorial
- [Your First Proof](/docs/getting-started/first-proof)
- [Development Setup](/docs/getting-started/development-setup)
- [TypeScript Configuration](/docs/getting-started/typescript-setup)

### Core Concepts
Understand the fundamentals of zero-knowledge technology.
- [Zero-Knowledge Basics](/docs/core-concepts/zero-knowledge-basics)
- [Merkle Trees](/docs/core-concepts/merkle-trees)

### Packages
Overview of all ZK-Kit packages.
- [Packages Overview](/docs/packages/overview)
- [Choosing a Package](/docs/packages/choosing-a-package)

**Package Categories:**
- **Merkle Trees**: IMT, LeanIMT, SMT
- **Cryptography**: EdDSA-Poseidon, Poseidon Cipher, Baby JubJub, Poseidon Proof
- **Utilities**: Utils, Logical Expressions

---

## 🎯 Popular Topics

### For Developers
- [Quick Start](/docs/getting-started/quick-start) - Build your first proof in 2 minutes
- [Package Selection Guide](/docs/packages/choosing-a-package) - Choose the right package
- [TypeScript Setup](/docs/getting-started/typescript-setup) - Configure TypeScript

### For Learners
- [Zero-Knowledge Basics](/docs/core-concepts/zero-knowledge-basics) - Understand ZK fundamentals
- [Merkle Trees Explained](/docs/core-concepts/merkle-trees) - How Merkle trees work
- [Your First Proof](/docs/getting-started/first-proof) - Step-by-step guide

### Production Ready
- [Installation Guide](/docs/getting-started/installation) - Install all packages
- [Development Setup](/docs/getting-started/development-setup) - Set up your environment
- [Ecosystem](/docs/introduction/ecosystem) - See who's using ZK-Kit

---

## 📦 Available Packages

All packages verified from the [ZK-Kit repository](https://github.com/privacy-scaling-explorations/zk-kit):

| Package | Description | Installation |
|---------|-------------|--------------|
| [@zk-kit/imt](https://www.npmjs.com/package/@zk-kit/imt) | Incremental Merkle Tree | `npm i @zk-kit/imt` |
| [@zk-kit/lean-imt](https://www.npmjs.com/package/@zk-kit/lean-imt) | Memory-optimized IMT | `npm i @zk-kit/lean-imt` |
| [@zk-kit/smt](https://www.npmjs.com/package/@zk-kit/smt) | Sparse Merkle Tree | `npm i @zk-kit/smt` |
| [@zk-kit/eddsa-poseidon](https://www.npmjs.com/package/@zk-kit/eddsa-poseidon) | EdDSA Signatures | `npm i @zk-kit/eddsa-poseidon` |
| [@zk-kit/poseidon-cipher](https://www.npmjs.com/package/@zk-kit/poseidon-cipher) | Poseidon Encryption | `npm i @zk-kit/poseidon-cipher` |
| [@zk-kit/baby-jubjub](https://www.npmjs.com/package/@zk-kit/baby-jubjub) | Elliptic Curve Ops | `npm i @zk-kit/baby-jubjub` |
| [@zk-kit/poseidon-proof](https://www.npmjs.com/package/@zk-kit/poseidon-proof) | Poseidon Proofs | `npm i @zk-kit/poseidon-proof` |
| [@zk-kit/utils](https://www.npmjs.com/package/@zk-kit/utils) | Field Operations | `npm i @zk-kit/utils` |
| [@zk-kit/logical-expressions](https://www.npmjs.com/package/@zk-kit/logical-expressions) | Boolean Logic | `npm i @zk-kit/logical-expressions` |

:::info Peer Dependencies
Some packages require additional dependencies (like `poseidon-lite` or `circomlibjs` for hash functions). Check each package's [npm page](https://www.npmjs.com/org/zk-kit) for specific requirements.
:::

[View detailed package documentation →](/docs/packages/overview)

---

## 🌍 Multi-Language Support

ZK-Kit is available in **5 languages** for different use cases:

| Language | Repository | Use Case |
|----------|------------|----------|
| **TypeScript/JS** | [privacy-scaling-explorations/zk-kit](https://github.com/privacy-scaling-explorations/zk-kit) | Web apps, Node.js *(this documentation)* |
| **Circom** | [privacy-scaling-explorations/zk-kit.circom](https://github.com/privacy-scaling-explorations/zk-kit.circom) | zkSNARK circuits |
| **Noir** | [privacy-scaling-explorations/zk-kit.noir](https://github.com/privacy-scaling-explorations/zk-kit.noir) | Aztec protocol |
| **Solidity** | [privacy-scaling-explorations/zk-kit.solidity](https://github.com/privacy-scaling-explorations/zk-kit.solidity) | Smart contracts |
| **Rust** | [privacy-scaling-explorations/zk-kit.rust](https://github.com/privacy-scaling-explorations/zk-kit.rust) | High-performance |

[View all language implementations →](/docs/introduction/language-implementations)

---

## 🌟 Projects Using ZK-Kit

ZK-Kit is used in production by major projects (verified from [repository](https://github.com/privacy-scaling-explorations/zk-kit)):

- **[Semaphore Protocol](https://semaphore.pse.dev)** - Anonymous signaling (uses IMT & LeanIMT)
- **[Worldcoin](https://worldcoin.org)** - Proof of personhood with 2M+ verified humans (uses IMT)
- **[MACI](https://maci.pse.dev)** - Anti-collusion voting
- **[Zupass](https://zupass.org)** - Privacy-preserving tickets (uses LeanIMT)
- **[Iden3](https://iden3.io)** - Self-sovereign identity (uses SMT)

[Learn more about the ecosystem →](/docs/introduction/ecosystem)

---

## 🔗 External Resources

- **GitHub**: [github.com/privacy-scaling-explorations/zk-kit](https://github.com/privacy-scaling-explorations/zk-kit)
- **npm**: [npmjs.com/org/zk-kit](https://www.npmjs.com/org/zk-kit)
- **Discussions**: [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)

---

## 💬 Get Help

- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 💭 [Ask Questions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 📚 [View Repository](https://github.com/privacy-scaling-explorations/zk-kit)

---

## 🚀 Ready to Start?

Choose your path:

1. **New to ZK?** → [What is ZK-Kit?](/docs/introduction/what-is-zk-kit)
2. **Ready to code?** → [Quick Start](/docs/getting-started/quick-start)
3. **Need a specific package?** → [Choose a Package](/docs/packages/choosing-a-package)
4. **Deep dive?** → [Core Concepts](/docs/core-concepts/zero-knowledge-basics)
