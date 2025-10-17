---
sidebar_position: 1
title: "@zk-kit/imt"
---

# @zk-kit/imt

Incremental Merkle Tree (IMT) implementation in JavaScript/TypeScript. This package provides a memory-efficient, production-ready implementation of Incremental Merkle Trees for zero-knowledge applications.

## Overview

The Incremental Merkle Tree is optimized for applications that need to prove membership in a set without revealing which member. It's the standard choice for most zero-knowledge applications requiring membership proofs.

## Installation

```bash
npm install @zk-kit/imt
```

**Peer Dependencies:**

You'll need a hash function. Install one of:

```bash
# Poseidon (recommended for ZK circuits)
npm install poseidon-lite

# Or Keccak256
npm install @zk-kit/utils
```

## Quick Start

### Basic Usage

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

// Create a tree with depth 16
const tree = new IMT(poseidon2, 16, 0, 2)

// Insert leaves
tree.insert(BigInt(1))
tree.insert(BigInt(2))
tree.insert(BigInt(3))

// Get root
console.log(tree.root)

// Generate proof
const proof = tree.createProof(1) // Index of leaf

// Verify proof
const isValid = tree.verifyProof(proof)
console.log(isValid) // true
```

### With Custom Hash Function

```typescript
import { IMT } from "@zk-kit/imt"

function customHash(nodes: bigint[]): bigint {
  // Your custom hash implementation
  return nodes[0] + nodes[1]
}

const tree = new IMT(customHash, 16, 0, 2)
```

## API Reference

### Constructor

```typescript
new IMT(
  hash: HashFunction,
  depth: number,
  zeroValue: Node,
  arity: number
): IMT
```

**Parameters:**

- `hash`: Hash function that takes an array of nodes and returns a single node
- `depth`: Maximum depth of the tree (tree can hold `arity^depth` leaves)
- `zeroValue`: Value used for empty leaves (typically `0`)
- `arity`: Number of children per node (typically `2` for binary trees)

**Example:**

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

const tree = new IMT(poseidon2, 20, 0, 2)
// Can hold up to 2^20 = 1,048,576 leaves
```

### Properties

#### `root`

```typescript
tree.root: Node
```

Returns the current root of the tree.

**Example:**

```typescript
const root = tree.root
console.log(root) // bigint
```

#### `depth`

```typescript
tree.depth: number
```

Returns the depth of the tree.

#### `leaves`

```typescript
tree.leaves: Node[]
```

Returns all leaves in the tree.

**Example:**

```typescript
const leaves = tree.leaves
console.log(leaves.length) // Number of inserted leaves
```

#### `arity`

```typescript
tree.arity: number
```

Returns the arity (branching factor) of the tree.

#### `zeroes`

```typescript
tree.zeroes: Node[]
```

Returns the zero values for each level of the tree.

### Methods

#### `insert`

```typescript
tree.insert(leaf: Node): void
```

Inserts a new leaf into the tree.

**Parameters:**

- `leaf`: The value to insert (typically a `bigint`)

**Example:**

```typescript
tree.insert(BigInt(123))
tree.insert(BigInt(456))
```

#### `update`

```typescript
tree.update(index: number, newLeaf: Node): void
```

Updates a leaf at the specified index.

**Parameters:**

- `index`: Index of the leaf to update
- `newLeaf`: New value for the leaf

**Example:**

```typescript
tree.update(0, BigInt(999))
```

#### `delete`

```typescript
tree.delete(index: number): void
```

Deletes a leaf by setting it to the zero value.

**Parameters:**

- `index`: Index of the leaf to delete

**Example:**

```typescript
tree.delete(0)
```

#### `createProof`

```typescript
tree.createProof(index: number): MerkleProof
```

Generates a Merkle proof for a leaf at the given index.

**Parameters:**

- `index`: Index of the leaf to prove

**Returns:**

- `MerkleProof`: Object containing proof data

**Example:**

```typescript
const proof = tree.createProof(2)
console.log(proof)
// {
//   root: bigint,
//   leaf: bigint,
//   siblings: bigint[],
//   pathIndices: number[]
// }
```

#### `verifyProof`

```typescript
tree.verifyProof(proof: MerkleProof): boolean
```

Verifies a Merkle proof against the current tree root.

**Parameters:**

- `proof`: The proof object from `createProof`

**Returns:**

- `boolean`: `true` if proof is valid

**Example:**

```typescript
const proof = tree.createProof(2)
const isValid = tree.verifyProof(proof)
console.log(isValid) // true
```

#### Static: `verifyProof`

```typescript
IMT.verifyProof(
  proof: MerkleProof,
  hash: HashFunction
): boolean
```

Verifies a proof without a tree instance.

**Parameters:**

- `proof`: The proof object
- `hash`: Hash function used by the tree

**Returns:**

- `boolean`: `true` if proof is valid

**Example:**

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

const isValid = IMT.verifyProof(proof, poseidon2)
```

#### `indexOf`

```typescript
tree.indexOf(leaf: Node): number
```

Returns the index of a leaf, or -1 if not found.

**Parameters:**

- `leaf`: The leaf value to search for

**Returns:**

- `number`: Index of the leaf or -1

**Example:**

```typescript
tree.insert(BigInt(123))
const index = tree.indexOf(BigInt(123))
console.log(index) // 0
```

## Advanced Usage

### Anonymous Voting System

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon1 } from "poseidon-lite"

// Create a tree for voter commitments
const voters = new IMT(poseidon2, 20, 0, 2)

// Register voters (in practice, these would be commitments)
const voterCommitment = poseidon1([privateKey])
voters.insert(voterCommitment)

// Generate proof for voting
const proof = voters.createProof(voters.indexOf(voterCommitment))

// Voter can now prove membership without revealing identity
```

### Whitelist Verification

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

// Create whitelist tree
const whitelist = new IMT(poseidon2, 16, 0, 2)

// Add addresses to whitelist
const addresses = [
  BigInt("0x1234..."),
  BigInt("0x5678..."),
  BigInt("0x9abc...")
]

addresses.forEach(addr => whitelist.insert(addr))

// Publish only the root on-chain
const rootHash = whitelist.root

// Users prove they're whitelisted off-chain
function proveWhitelist(address: bigint) {
  const index = whitelist.indexOf(address)
  return whitelist.createProof(index)
}
```

### Batch Operations

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

const tree = new IMT(poseidon2, 16, 0, 2)

// Batch insert
const values = Array.from({ length: 1000 }, (_, i) => BigInt(i))
values.forEach(v => tree.insert(v))

// Generate multiple proofs
const proofs = values.map((_, i) => tree.createProof(i))

// Verify all proofs
const allValid = proofs.every(proof => tree.verifyProof(proof))
console.log(allValid) // true
```

## Performance Characteristics

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Insert | O(log n) | Where n is depth |
| Update | O(log n) | |
| Delete | O(log n) | Sets to zero value |
| Create Proof | O(log n) | |
| Verify Proof | O(log n) | |
| Get Root | O(1) | Cached |

## Memory Usage

- **Storage**: O(n) where n is number of leaves
- **Proof Size**: O(log n) where n is depth
- **Tree Depth 20**: Can store ~1M leaves, ~80KB per tree

## Dependencies

- Hash function (not included):
  - `poseidon-lite` (recommended)
  - Or any function matching `(nodes: Node[]) => Node`

## TypeScript Support

This package is written in TypeScript and includes full type definitions.

```typescript
import type { IMT, MerkleProof, Node, HashFunction } from "@zk-kit/imt"
```

## Related Documentation

- [Choosing a Package](/docs/packages/choosing-a-package) - When to use IMT vs LeanIMT vs SMT
- [Merkle Trees Core Concepts](/docs/core-concepts/merkle-trees) - Theory behind Merkle trees
- [Your First Proof](/docs/getting-started/first-proof) - Step-by-step tutorial
- [LeanIMT Package](/docs/packages/javascript/lean-imt) - Memory-efficient alternative

## Common Use Cases

- ✅ Anonymous voting systems
- ✅ Private airdrops
- ✅ Whitelist verification
- ✅ Anonymous credentials
- ✅ Access control lists
- ✅ Membership proofs

## When to Use IMT

Use IMT when:
- Building standard membership proofs
- Memory is not constrained
- Need fast operations
- Tree size is predictable

Consider [LeanIMT](/docs/packages/javascript/lean-imt) if memory is limited.

Consider [SMT](/docs/packages/javascript/smt) if you need key-value storage or non-membership proofs.

## Source

- **GitHub**: [zk-kit/packages/imt](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/imt)
- **NPM**: [@zk-kit/imt](https://www.npmjs.com/package/@zk-kit/imt)
- **License**: MIT

## Community

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Examples](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/imt/examples)



