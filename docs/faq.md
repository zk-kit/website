---
sidebar_position: 10
title: FAQ (Frequently Asked Questions)
---

# FAQ (Frequently Asked Questions)

Common questions and answers about ZK-Kit.

## General Questions

### What is ZK-Kit?

ZK-Kit is a set of libraries (algorithms or utility functions) that can be reused in different projects and zero-knowledge protocols, making it easier for developers to access user-friendly, tested, and documented code for common tasks.

### Which programming languages does ZK-Kit support?

ZK-Kit provides implementations in multiple languages:
- **JavaScript/TypeScript** (this repository)
- **Circom** (for ZK circuits)
- **Solidity** (for smart contracts)
- **Noir** (for Aztec Network)
- **Rust** (for performance-critical applications)

See [Language Implementations](/docs/introduction/language-implementations) for details.

### Is ZK-Kit production-ready?

Some packages have been audited (marked with ✔️), while others are still in beta or unaudited. Check each package's audit status before using in production.

**Audited packages:**
- @zk-kit/eddsa-poseidon ✔️ ([Audit](https://semaphore.pse.dev/Semaphore_4.0.0_Audit.pdf))
- @zk-kit/baby-jubjub ✔️ ([Audit](https://semaphore.pse.dev/Semaphore_4.0.0_Audit.pdf))
- @zk-kit/utils ✔️ ([Audit](https://semaphore.pse.dev/Semaphore_4.0.0_Audit.pdf))
- @zk-kit/imt ✔️ ([Audit](https://semaphore.pse.dev/Semaphore_4.0.0_Audit.pdf))
- @zk-kit/lean-imt ✔️ ([Audit](https://semaphore.pse.dev/Semaphore_4.0.0_Audit.pdf))
- @zk-kit/smt ✔️ ([Audit](https://semaphore.pse.dev/Semaphore_4.0.0_Audit.pdf))

### How do I get support?

- **GitHub Issues**: [Report bugs or ask questions](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- **GitHub Discussions**: [Community discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- **Documentation**: [zkkit.pse.dev](https://zkkit.pse.dev/) or these docs

---

## Merkle Tree Questions

### Which Merkle Tree should I use?

This is the most common question. The answer depends on your use case:

**Use Incremental Merkle Tree (IMT) when:**
- You need to frequently add new elements
- Your tree size is small to medium (< 1024 leaves)
- You want the fastest insert operations
- You're building something similar to Semaphore V3 or Worldcoin

**Use Lean IMT when:**
- Memory efficiency is important
- You need the fastest update and proof generation
- You're okay with dynamic tree depth
- You're building something similar to Semaphore V4 or Zupass

**Use Sparse Merkle Tree (SMT) when:**
- You need proof of non-membership
- Your dataset is large
- You need key-value store functionality
- You're building something similar to Iden3's identity system

**Still not sure?** Check the [Performance Benchmarks](/docs/core-concepts/merkle-trees#performance-benchmarks) for detailed comparisons.

### Can I convert between different Merkle Tree types?

No, each tree type has a different structure and cannot be directly converted. You would need to rebuild the tree using the new implementation.

### How do I verify a Merkle proof?

Each tree implementation provides a `verifyProof()` method:

```typescript
// IMT
const proof = tree.createProof(leafIndex)
const isValid = tree.verifyProof(proof)

// LeanIMT
const proof = tree.generateProof(leafIndex)
const isValid = tree.verifyProof(proof)

// SMT
const proof = tree.createProof(key)
const isValid = tree.verifyProof(proof)
```

---

## Development Questions

### How do I contribute a new package?

See the [Creating a New Package](/docs/contributing#creating-a-new-package) section in the Contributing guide.

### Why are my tests failing?

Make sure you've:
1. Installed all dependencies: `yarn`
2. Built all packages: `yarn build`
3. Formatted your code: `yarn format:write`
4. Linted your code: `yarn lint`

### How do I run benchmarks for my package?

See the [Benchmarking](/docs/development-tools#benchmarking) section for detailed instructions.

### What's the difference between this repo and the old version?

If you're looking for version 1.x of certain packages (like IMT), check the package README for links to the old implementation. Most packages have been significantly refactored and improved in version 2.x.

---

## Security & Auditing Questions

### Which packages have been audited?

See the [package table](/docs/packages/overview#package-status) in the JavaScript Packages section. Audited packages are marked with ✔️ and link to the audit report.

All audited packages were reviewed as part of the [Semaphore V4 PSE audit](https://semaphore.pse.dev/Semaphore_4.0.0_Audit.pdf).

### What should I do if I find a security vulnerability?

Please **DO NOT** open a public issue. Instead:
1. Email the maintainers at security@pse.dev (or check SECURITY.md if available)
2. Use GitHub's private security advisory feature
3. Allow time for a patch before public disclosure

### Why is @zk-kit/poseidon-proof unaudited?

This package is newer and uses a trusted setup that is considered insecure for production. It's primarily intended for testing and development. An audit is planned for future releases.

---

## Performance Questions

### Why is LeanIMT slower for insertions?

LeanIMT optimizes for proof generation and updates at the cost of slightly slower insertions. The dynamic depth adjustment requires more computation during insertion but results in faster proofs.

### How can I improve Merkle tree performance?

- **Use appropriate tree depth** (deeper = slower)
- **Batch insertions when possible** (use `insertMany()` for LeanIMT)
- **Choose the right tree type** for your use case (see benchmarks)
- **Consider using workers** for hash-intensive operations

### Can I use these libraries in the browser?

Yes! All JavaScript packages are browser-compatible. You can load them via:
- npm/yarn install
- CDN (unpkg or jsDelivr)

See the [Installation guide](/docs/getting-started/installation#browser-support) for browser setup.

---

## Cryptography Questions

### What hash function should I use?

For zero-knowledge applications, use **Poseidon** (from `poseidon-lite` package). It's specifically designed for ZK circuits and is much more efficient than SHA-256 or Keccak for ZK proofs.

```typescript
import { poseidon2 } from "poseidon-lite"

const hash = poseidon2([a, b])
```

### What's the difference between EdDSA and ECDSA?

EdDSA (used in `@zk-kit/eddsa-poseidon`) is:
- More ZK-friendly (fewer constraints in circuits)
- Deterministic (no random nonce required)
- Uses twisted Edwards curves (Baby Jubjub)
- Faster for ZK applications

ECDSA is the traditional signature algorithm used in Bitcoin and Ethereum.

### Are these implementations constant-time?

JavaScript is not ideal for constant-time cryptography due to JIT optimization and garbage collection. For security-critical applications requiring constant-time operations, consider using the Rust implementations.

---

## Integration Questions

### Can I use ZK-Kit with my existing ZK framework?

Yes! ZK-Kit is designed to be framework-agnostic. It works with:
- Circom circuits
- SnarkJS
- Noir
- Halo2
- Any framework that supports the underlying cryptographic primitives

### Does ZK-Kit work with ethers.js / web3.js?

Yes, ZK-Kit packages return `BigInt` values that are compatible with both ethers.js and web3.js.

```typescript
import { IMT } from "@zk-kit/imt"
import { ethers } from "ethers"

const tree = new IMT(poseidon2, 16, 0, 2)
const root = tree.root

// Use with ethers.js
await contract.updateRoot(root)
```

### How do I use ZK-Kit in a React app?

Install via npm/yarn and import normally:

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"
import { useState } from "react"

function MyComponent() {
  const [tree] = useState(() => new IMT(poseidon2, 16, 0, 2))
  
  // Use tree...
}
```

---

## Troubleshooting

### I'm getting "Cannot find module" errors

Make sure you've:
1. Installed the package: `npm i @zk-kit/[package-name]`
2. Installed peer dependencies (check npm page)
3. Built the project: `yarn build` (for development)

### The generated proofs are too large

Consider:
- Using a shallower tree depth
- Using LeanIMT instead of IMT
- Using SparseMT for sparse data

### I need help with a specific use case

Please [open a discussion](https://github.com/privacy-scaling-explorations/zk-kit/discussions) describing your use case. The community is happy to help!

---

## Package-Specific Questions

### How do I generate nullifiers?

Use a hash of your secret and a unique identifier:

```typescript
import { poseidon2 } from "poseidon-lite"

const nullifier = poseidon2([mySecret, appIdentifier])
```

Nullifiers prevent double-usage of proofs while maintaining anonymity.

### What's the maximum tree depth?

**IMT**: Typically 32 (2^32 leaves), but practical limit depends on memory  
**LeanIMT**: Dynamic depth, grows as needed  
**SMT**: 256 (2^256 possible keys)

### Can I update a leaf after insertion?

Yes, all tree types support updates:

```typescript
// IMT
tree.update(index, newValue)

// LeanIMT
tree.update(index, newValue)

// SMT
tree.update(key, newValue)
```

### How do I delete a leaf?

```typescript
// IMT (sets to zero value)
tree.delete(index)

// LeanIMT (sets to zero value)
tree.delete(index)

// SMT (actually removes key)
tree.delete(key)
```

Note: IMT and LeanIMT set the leaf to the zero value rather than removing it.

---

## Best Practices

### Should I use BigInt or number?

Always use `BigInt` for cryptographic operations:

```typescript
// Good
tree.insert(BigInt(123))
tree.insert(123n)

// Bad (may lose precision)
tree.insert(123)
```

### How do I store tree state?

For persistence, serialize the tree:

```typescript
// IMT
const state = {
  root: tree.root.toString(),
  leaves: tree.leaves.map(l => l.toString())
}

// Save to database/localStorage
localStorage.setItem('tree', JSON.stringify(state))
```

### Should I generate proofs on the client or server?

**Client-side** (recommended):
- More privacy (secrets never leave client)
- Better scalability
- User controls their own data

**Server-side**:
- If clients can't run the computation
- If you need to batch operations
- If you're managing users' secrets (not recommended)

---

## Still have questions?

**Can't find your question?**

- Check the [API Documentation](https://zkkit.pse.dev/)
- Search [existing issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- Ask in [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- Open a [new issue](https://github.com/privacy-scaling-explorations/zk-kit/issues/new)

## Resources

- [Documentation Home](/docs)
- [Quick Start](/docs/getting-started/quick-start)
- [Packages Overview](/docs/packages/overview)
- [GitHub Repository](https://github.com/privacy-scaling-explorations/zk-kit)
- [npm Organization](https://www.npmjs.com/org/zk-kit)

