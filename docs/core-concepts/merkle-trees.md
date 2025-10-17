---
sidebar_position: 2
title: Merkle Trees
description: Learn how Merkle trees enable efficient zero-knowledge membership proofs
---

# Merkle Trees

Learn how Merkle trees enable efficient zero-knowledge membership proofs in ZK-Kit.

## What is a Merkle Tree?

A Merkle tree is a binary tree where:
- Leaves contain data
- Internal nodes contain hashes of their children
- Root represents the entire tree state

```
Tree Example:
        Root (H0)
        /        \
    H1              H2
   /  \            /  \
  H3   H4        H5    H6
 / \   / \      / \    / \
L1 L2 L3 L4    L5 L6  L7  L8

Where:
- L1-L8 are leaves (actual data)
- H3 = hash(L1, L2)
- H1 = hash(H3, H4)
- Root = hash(H1, H2)
```

## Why Merkle Trees for ZK?

### 1. Efficient Proofs

Prove membership with O(log n) data:

```typescript
// For 1 million members:
// - Without Merkle tree: Send all 1M values
// - With Merkle tree: Send only 20 hashes (log₂ 1M ≈ 20)

import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

const tree = new IMT(poseidon2, 20, 0, 2) // 2^20 = 1M capacity

// Add 1 million members
for (let i = 0; i < 1000000; i++) {
  tree.insert(BigInt(i))
}

// Proof contains only 20 siblings
const proof = tree.createProof(42)
console.log(proof.siblings.length) // 20
```

### 2. Privacy-Preserving

Proofs don't reveal which member:

```typescript
// Three users in tree
tree.insert(alice)   // index 0
tree.insert(bob)     // index 1
tree.insert(charlie) // index 2

// Alice creates proof
const aliceProof = tree.createProof(0)

// Bob creates proof
const bobProof = tree.createProof(1)

// Proofs look similar - can't tell who created which
console.log(aliceProof.root === bobProof.root) // true (same tree)
// But siblings are different - no way to link to user
```

### 3. Verifiable

Anyone can verify without trusted party:

```typescript
// Verifier only needs:
// 1. Public root
// 2. The proof

const isValid = tree.verifyProof(proof)
// No need to trust anyone - math proves it
```

## How Merkle Proofs Work

### Creating a Proof

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

// Build tree
const tree = new IMT(poseidon2, 3, 0, 2) // depth 3 = 8 leaves

tree.insert(BigInt(1))  // L1
tree.insert(BigInt(2))  // L2
tree.insert(BigInt(3))  // L3
tree.insert(BigInt(4))  // L4

// Generate proof for L1 (index 0)
const proof = tree.createProof(0)

console.log(proof)
// {
//   root: 12345n,           // Tree root
//   leaf: 1n,               // The leaf (L1)
//   siblings: [2n, H2],     // Sibling at each level
//   pathIndices: [0, 0]     // Path: left, left
// }
```

### Verifying a Proof

```typescript
// Verification algorithm:
// 1. Start with leaf
// 2. Hash with sibling to get parent
// 3. Repeat up the tree
// 4. Check if final hash equals root

function verifyProofManually(proof: any): boolean {
  let currentHash = proof.leaf
  
  for (let i = 0; i < proof.siblings.length; i++) {
    const sibling = proof.siblings[i]
    const isLeft = proof.pathIndices[i] === 0
    
    if (isLeft) {
      currentHash = poseidon2([currentHash, sibling])
    } else {
      currentHash = poseidon2([sibling, currentHash])
    }
  }
  
  return currentHash === proof.root
}

// Or use built-in
const isValid = tree.verifyProof(proof)
```

## Merkle Tree Selection Guide

**Question: I need to use a Merkle Tree to prove the inclusion or exclusion of data elements within a set. Which type should I use?**

| Type | Library | Main Feature | Used By |
|------|---------|--------------|---------|
| **Incremental** | [@zk-kit/imt](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/imt) | Ideal for frequent additions and efficient updates | [Semaphore V3](https://github.com/semaphore-protocol/semaphore/tree/v3.15.2), [Worldcoin](https://github.com/worldcoin) |
| **Lean Incremental** | [@zk-kit/lean-imt](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/lean-imt) | Memory-efficient, dynamic depth | [Semaphore V4](https://github.com/semaphore-protocol/semaphore), [Zupass](https://github.com/proofcarryingdata/zupass) |
| **Sparse** | [@zk-kit/smt](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/smt) | Proof of non-membership | [Iden3](https://github.com/iden3) |

## Performance Benchmarks

### 8 leafs

| Operation | Fastest | Slowest |
|-----------|---------|---------|
| Insert | IMT | LeanIMT |
| Delete | IMT ~ SparseMT | IMT ~ SparseMT |
| Update | LeanIMT | IMT |
| Generate proof | LeanIMT | SparseMT |
| Verify proof | IMT | SparseMT |

### 128 leafs

| Operation | Fastest | Slowest |
|-----------|---------|---------|
| Insert | IMT | LeanIMT |
| Delete | SparseMT | IMT |
| Update | LeanIMT | IMT |
| Generate proof | LeanIMT | IMT |
| Verify proof | SparseMT | IMT |

### 1024 leafs

| Operation | Fastest | Slowest |
|-----------|---------|---------|
| Insert | SparseMT | LeanIMT |
| Delete | SparseMT | IMT |
| Update | LeanIMT | IMT |
| Generate proof | LeanIMT | IMT |
| Verify proof | SparseMT | IMT |

**Selection Criteria from Benchmarks:**
- **IMT**: Best performance for medium and small size insert operations
- **LeanIMT**: Best performance for all tree sizes for update and generate proof operations
- **SparseMT**: Best for larger data insert, delete, and verify proof operations

## Types of Merkle Trees in ZK-Kit

### 1. IMT (Incremental Merkle Tree)

**Best for:** Most use cases, small to medium insert operations

```typescript
import { IMT } from "@zk-kit/imt"

const tree = new IMT(poseidon2, 16, 0, 2)

// Features:
// - Fixed depth (set at creation)
// - Incremental updates
// - Full tree in memory
// - Fast operations for small-medium datasets

// Use when:
// ✓ You know max size
// ✓ Memory not constrained
// ✓ Need fast insert operations (small-medium size)
// ✓ Building like Semaphore V3 or Worldcoin
```

### 2. LeanIMT

**Best for:** Memory-constrained environments, all sizes for updates and proofs

```typescript
import { LeanIMT } from "@zk-kit/lean-imt"

const tree = new LeanIMT((a, b) => poseidon2([a, b]))

// Features:
// - Dynamic depth
// - Minimal memory (only leaves + proofs)
// - Best for update and proof generation
// - No zero values stored

// Use when:
// ✓ Memory is limited
// ✓ Size unknown upfront
// ✓ Need fast updates and proof generation
// ✓ Building like Semaphore V4 or Zupass
```

### 3. SMT (Sparse Merkle Tree)

**Best for:** Key-value storage, large datasets, non-membership proofs

```typescript
import { SMT } from "@zk-kit/smt"

const tree = new SMT(hash, true)

// Features:
// - Key-value pairs
// - Non-membership proofs
// - Sparse (most nodes empty)
// - Best for large data operations
// - Update/delete keys

// Use when:
// ✓ Need key-value storage
// ✓ Need to prove absence
// ✓ Large datasets
// ✓ Frequent updates/deletes
// ✓ Building like Iden3 identity systems
```

## Tree Operations

### Insert

```typescript
// Add a leaf
const index = tree.insert(BigInt(42))
console.log(`Inserted at index ${index}`)

// Tree automatically:
// 1. Places leaf at next available position
// 2. Updates all parent hashes
// 3. Updates root
```

### Update

```typescript
// Change an existing leaf
tree.update(0, BigInt(99))

// Updates:
// 1. The leaf value
// 2. All parent hashes
// 3. Root hash
```

### Delete

```typescript
// Remove a leaf (set to zero)
tree.delete(0)

// Sets leaf to zero value
// Updates all parent hashes
```

### Create Proof

```typescript
// Generate membership proof
const proof = tree.createProof(index)

// Proof contains path from leaf to root
// Size: O(log n)
```

### Verify Proof

```typescript
// Verify proof is valid
const isValid = tree.verifyProof(proof)

// Returns true if:
// - Path is valid
// - Hashes are correct
// - Root matches
```

## Tree Depth Selection

Choose depth based on expected size:

```typescript
// depth = 16: 2^16 = 65,536 leaves
const smallTree = new IMT(poseidon2, 16, 0, 2)

// depth = 20: 2^20 = 1,048,576 leaves  
const mediumTree = new IMT(poseidon2, 20, 0, 2)

// depth = 24: 2^24 = 16,777,216 leaves
const largeTree = new IMT(poseidon2, 24, 0, 2)

// Trade-offs:
// - Larger depth = more capacity
// - Larger depth = larger proofs
// - Larger depth = slower operations
```

## Tree Arity

Binary (2) vs Quinary (5):

```typescript
// Binary tree (arity = 2)
const binaryTree = new IMT(poseidon2, 20, 0, 2)
// - Proof size: 20 siblings
// - Verification: 20 hashes
// - More efficient for most cases

// Quinary tree (arity = 5)
const quinaryTree = new IMT(poseidon5, 9, 0, 5)
// - Proof size: 9 siblings (but 4 per level)
// - Verification: 9 * 4 = 36 hashes
// - Better for some circuit designs
```

## Real-World Example: Access Control

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

class AccessControl {
  private tree: IMT
  private users = new Map<string, number>()

  constructor(maxUsers: number = 10000) {
    const depth = Math.ceil(Math.log2(maxUsers))
    this.tree = new IMT(poseidon2, depth, 0, 2)
  }

  // Add authorized user
  addUser(userId: string, commitment: bigint): void {
    const index = this.tree.insert(commitment)
    this.users.set(userId, index)
    console.log(`User ${userId} added at index ${index}`)
  }

  // User generates access proof
  getAccessProof(userId: string): any {
    const index = this.users.get(userId)
    if (index === undefined) {
      throw new Error("User not found")
    }
    return this.tree.createProof(index)
  }

  // Verify access (doesn't reveal which user)
  verifyAccess(proof: any): boolean {
    return this.tree.verifyProof(proof)
  }

  // Get current state root (publish this)
  getRoot(): bigint {
    return this.tree.root as bigint
  }

  // Update user commitment
  updateUser(userId: string, newCommitment: bigint): void {
    const index = this.users.get(userId)
    if (index === undefined) {
      throw new Error("User not found")
    }
    this.tree.update(index, newCommitment)
  }

  // Revoke user access
  revokeUser(userId: string): void {
    const index = this.users.get(userId)
    if (index !== undefined) {
      this.tree.delete(index)
      this.users.delete(userId)
    }
  }
}

// Usage
const access = new AccessControl(1000)

// Add users
access.addUser("alice", poseidon2([BigInt("alice-secret")]))
access.addUser("bob", poseidon2([BigInt("bob-secret")]))

// Publish root
console.log("Current root:", access.getRoot())

// Alice proves access
const aliceProof = access.getAccessProof("alice")
console.log("Alice access:", access.verifyAccess(aliceProof))
```

## Advanced Patterns

### Batch Insertion

```typescript
// Insert multiple leaves efficiently
const leaves = [1n, 2n, 3n, 4n, 5n]
const tree = new IMT(poseidon2, 16, 0, 2, leaves)

// More efficient than individual inserts
```

### Historical Roots

```typescript
class VersionedTree {
  private tree: IMT
  private roots: bigint[] = []

  constructor() {
    this.tree = new IMT(poseidon2, 16, 0, 2)
    this.saveRoot()
  }

  insert(leaf: bigint): number {
    const index = this.tree.insert(leaf)
    this.saveRoot()
    return index
  }

  private saveRoot(): void {
    this.roots.push(this.tree.root as bigint)
  }

  // Verify against historical root
  verifyHistorical(proof: any, rootIndex: number): boolean {
    const historicalRoot = this.roots[rootIndex]
    return proof.root === historicalRoot
  }
}
```

### Merkle Mountain Ranges

For append-only logs:

```typescript
// Efficient for blockchain-like structures
// Where you only append, never update
```

## Performance Optimization

### Caching

```typescript
// Cache frequently accessed proofs
const proofCache = new Map<number, any>()

function getCachedProof(tree: IMT, index: number): any {
  if (!proofCache.has(index)) {
    proofCache.set(index, tree.createProof(index))
  }
  return proofCache.get(index)
}
```

### Parallel Verification

```typescript
// Verify multiple proofs in parallel
const proofs = [proof1, proof2, proof3]

const results = await Promise.all(
  proofs.map(proof => tree.verifyProof(proof))
)
```

## Common Patterns

### Anonymous Voting

```typescript
// Voters in tree, votes separate
const voters = new IMT(poseidon2, 16, 0, 2)
const votes = new Map<string, string>()

// Vote with proof
function vote(proof: any, nullifier: string, choice: string) {
  if (voters.verifyProof(proof) && !votes.has(nullifier)) {
    votes.set(nullifier, choice)
  }
}
```

### Private Airdrops

```typescript
// Eligible addresses in tree
const eligible = new IMT(poseidon2, 20, 0, 2)

// Claim anonymously
function claim(proof: any, nullifier: string, recipient: string) {
  if (eligible.verifyProof(proof) && !claimed.has(nullifier)) {
    transfer(recipient, amount)
    claimed.add(nullifier)
  }
}
```

## Next Steps

- [Zero-Knowledge Basics](/docs/core-concepts/zero-knowledge-basics) - Understanding ZK fundamentals
- [Packages Overview](/docs/packages/overview) - Explore all packages
- [Choosing a Package](/docs/packages/choosing-a-package) - Find the right Merkle tree
- [IMT Package](https://www.npmjs.com/package/@zk-kit/imt) - Incremental Merkle Tree
- [LeanIMT Package](https://www.npmjs.com/package/@zk-kit/lean-imt) - Memory-efficient IMT
- [SMT Package](https://www.npmjs.com/package/@zk-kit/smt) - Sparse Merkle Tree

## Resources

- [Merkle Tree Wikipedia](https://en.wikipedia.org/wiki/Merkle_tree)
- [ZK-Kit GitHub](https://github.com/privacy-scaling-explorations/zk-kit)

