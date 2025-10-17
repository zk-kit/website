---
sidebar_position: 3
title: "@zk-kit/smt"
---

# @zk-kit/smt

Sparse Merkle Tree (SMT) implementation for zero-knowledge applications. SMT provides key-value storage with cryptographic proofs for both membership and non-membership, making it ideal for state management and databases.

## Overview

Unlike IMT and LeanIMT which are optimized for membership proofs, SMT is designed for:
- Key-value storage with ZK proofs
- Proving a key does NOT exist (non-membership proofs)
- Frequent updates and deletions
- Sparse data sets (most leaves are empty)

## Installation

```bash
npm install @zk-kit/smt crypto-js
```

**Required Dependencies:**

```bash
# For hashing
npm install crypto-js
```

## Quick Start

### Basic Usage

```typescript
import { SMT } from "@zk-kit/smt"
import { poseidon2 } from "poseidon-lite"

// Create a tree
const tree = new SMT(poseidon2, true)

// Add key-value pairs
tree.add(BigInt(1), BigInt(100))
tree.add(BigInt(2), BigInt(200))
tree.add(BigInt(3), BigInt(300))

// Get value
const value = tree.get(BigInt(2))
console.log(value) // 200n

// Get root
console.log(tree.root)

// Generate membership proof
const proof = tree.createProof(BigInt(2))

// Verify proof
const isValid = tree.verifyProof(proof)
console.log(isValid) // true
```

### Non-Membership Proofs

```typescript
import { SMT } from "@zk-kit/smt"
import { poseidon2 } from "poseidon-lite"

const tree = new SMT(poseidon2, true)

tree.add(BigInt(1), BigInt(100))
tree.add(BigInt(2), BigInt(200))

// Prove that key 5 does NOT exist
const proof = tree.createProof(BigInt(5))

console.log(proof.membership) // false

// Verify non-membership proof
const isValid = tree.verifyProof(proof)
console.log(isValid) // true
```

## API Reference

### Constructor

```typescript
new SMT(
  hash: HashFunction,
  bigNumbers?: boolean
): SMT
```

**Parameters:**

- `hash`: Hash function (typically Poseidon)
- `bigNumbers`: If `true`, uses `BigInt`, else uses hex strings

**Example:**

```typescript
import { SMT } from "@zk-kit/smt"
import { poseidon2 } from "poseidon-lite"

// With BigInt (recommended)
const tree = new SMT(poseidon2, true)

// With hex strings
const tree2 = new SMT(poseidon2, false)
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
console.log(root) // bigint or hex string
```

#### `hash`

```typescript
tree.hash: HashFunction
```

Returns the hash function used by the tree.

#### `bigNumbers`

```typescript
tree.bigNumbers: boolean
```

Returns whether the tree uses `BigInt` or hex strings.

### Methods

#### `add`

```typescript
tree.add(key: Node, value: Node): void
```

Adds or updates a key-value pair in the tree.

**Parameters:**

- `key`: The key (typically a `bigint`)
- `value`: The value (typically a `bigint`)

**Example:**

```typescript
tree.add(BigInt(1), BigInt(100))
tree.add(BigInt(2), BigInt(200))

// Update existing key
tree.add(BigInt(1), BigInt(150))
```

#### `get`

```typescript
tree.get(key: Node): Node | undefined
```

Retrieves the value for a given key.

**Parameters:**

- `key`: The key to look up

**Returns:**

- `Node | undefined`: The value, or `undefined` if key doesn't exist

**Example:**

```typescript
tree.add(BigInt(1), BigInt(100))
const value = tree.get(BigInt(1))
console.log(value) // 100n

const missing = tree.get(BigInt(999))
console.log(missing) // undefined
```

#### `update`

```typescript
tree.update(key: Node, value: Node): void
```

Updates an existing key. Throws error if key doesn't exist.

**Parameters:**

- `key`: The key to update
- `value`: The new value

**Example:**

```typescript
tree.add(BigInt(1), BigInt(100))
tree.update(BigInt(1), BigInt(150))

// Throws error if key doesn't exist
// tree.update(BigInt(999), BigInt(100)) // Error!
```

#### `delete`

```typescript
tree.delete(key: Node): void
```

Removes a key-value pair from the tree.

**Parameters:**

- `key`: The key to delete

**Example:**

```typescript
tree.add(BigInt(1), BigInt(100))
tree.delete(BigInt(1))

console.log(tree.get(BigInt(1))) // undefined
```

#### `has`

```typescript
tree.has(key: Node): boolean
```

Checks if a key exists in the tree.

**Parameters:**

- `key`: The key to check

**Returns:**

- `boolean`: `true` if key exists

**Example:**

```typescript
tree.add(BigInt(1), BigInt(100))

console.log(tree.has(BigInt(1))) // true
console.log(tree.has(BigInt(2))) // false
```

#### `createProof`

```typescript
tree.createProof(key: Node): SMTProof
```

Generates a proof for a key (membership or non-membership).

**Parameters:**

- `key`: The key to prove

**Returns:**

- `SMTProof`: Object containing proof data

**Example:**

```typescript
tree.add(BigInt(1), BigInt(100))

// Membership proof
const memberProof = tree.createProof(BigInt(1))
console.log(memberProof.membership) // true
console.log(memberProof.value) // 100n

// Non-membership proof
const nonMemberProof = tree.createProof(BigInt(999))
console.log(nonMemberProof.membership) // false
```

#### `verifyProof`

```typescript
tree.verifyProof(proof: SMTProof): boolean
```

Verifies a proof (membership or non-membership).

**Parameters:**

- `proof`: The proof object from `createProof`

**Returns:**

- `boolean`: `true` if proof is valid

**Example:**

```typescript
const proof = tree.createProof(BigInt(1))
const isValid = tree.verifyProof(proof)
console.log(isValid) // true
```

#### Static: `verifyProof`

```typescript
SMT.verifyProof(
  proof: SMTProof,
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
import { SMT } from "@zk-kit/smt"
import { poseidon2 } from "poseidon-lite"

const isValid = SMT.verifyProof(proof, poseidon2)
```

## Advanced Usage

### Account Balance State

```typescript
import { SMT } from "@zk-kit/smt"
import { poseidon2 } from "poseidon-lite"

// Store account balances
const balances = new SMT(poseidon2, true)

// Set balances
balances.add(
  BigInt("0x1234..."), // address
  BigInt(1000) // balance
)

// Update balance
const address = BigInt("0x1234...")
const currentBalance = balances.get(address)
balances.update(address, currentBalance + BigInt(100))

// Prove balance
const proof = balances.createProof(address)
```

### Non-Membership for Uniqueness

```typescript
import { SMT } from "@zk-kit/smt"
import { poseidon2 } from "poseidon-lite"

// Ensure username uniqueness
const usernames = new SMT(poseidon2, true)

function registerUsername(username: string, userId: bigint): boolean {
  const usernameHash = poseidon1([BigInt(username)])
  
  // Check if username is available
  if (usernames.has(usernameHash)) {
    return false // Username taken
  }
  
  // Register username
  usernames.add(usernameHash, userId)
  
  // Proof that username was available
  const proof = usernames.createProof(usernameHash)
  
  return true
}
```

### Identity State Management

```typescript
import { SMT } from "@zk-kit/smt"
import { poseidon2 } from "poseidon-lite"

// Identity system with revocation
const identities = new SMT(poseidon2, true)

// Add identity
identities.add(BigInt(1), BigInt(1)) // Active

// Revoke identity
identities.update(BigInt(1), BigInt(0)) // Revoked

// Prove identity status
const proof = identities.createProof(BigInt(1))
console.log(proof.value) // 0 (revoked)
```

### Key-Value Database

```typescript
import { SMT } from "@zk-kit/smt"
import { poseidon2 } from "poseidon-lite"
import { poseidon1 } from "poseidon-lite"

class ZKDatabase {
  private tree: SMT
  
  constructor() {
    this.tree = new SMT(poseidon2, true)
  }
  
  set(key: string, value: string) {
    const keyHash = poseidon1([BigInt(key)])
    const valueHash = poseidon1([BigInt(value)])
    this.tree.add(keyHash, valueHash)
  }
  
  get(key: string): bigint | undefined {
    const keyHash = poseidon1([BigInt(key)])
    return this.tree.get(keyHash)
  }
  
  prove(key: string) {
    const keyHash = poseidon1([BigInt(key)])
    return this.tree.createProof(keyHash)
  }
  
  getRoot(): bigint {
    return this.tree.root as bigint
  }
}
```

## Performance Characteristics

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Add | O(log n) | n = 256 (tree depth) |
| Get | O(log n) | |
| Update | O(log n) | |
| Delete | O(log n) | |
| Create Proof | O(log n) | |
| Verify Proof | O(log n) | |
| Has | O(log n) | |

## Memory Usage

- **Storage**: O(k) where k is number of non-empty leaves
- **Tree Depth**: Fixed at 256 (for 256-bit keys)
- **Proof Size**: O(256) = ~8KB
- **Sparse**: Only stores non-empty nodes

## Proof Structure

```typescript
interface SMTProof {
  root: Node              // Tree root
  membership: boolean     // true if key exists
  key: Node              // The key being proved
  value?: Node           // Value (if membership = true)
  siblings: Node[]       // Sibling hashes
  aux?: {                // For non-membership
    key: Node
    value: Node
  }
}
```

## Dependencies

- `crypto-js`: For hashing operations
- Hash function (recommended):
  - `poseidon-lite` for ZK circuits
  - Any function matching `(nodes: Node[]) => Node`

## TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import type { SMT, SMTProof, Node, HashFunction } from "@zk-kit/smt"
```

## Related Documentation

- [IMT Package](/docs/packages/javascript/imt) - For membership-only proofs
- [Choosing a Package](/docs/packages/choosing-a-package) - Decision guide
- [Merkle Trees](/docs/core-concepts/merkle-trees) - Core concepts

## Common Use Cases

- ✅ Account balance state
- ✅ Identity systems with revocation
- ✅ Key-value databases with proofs
- ✅ Non-membership proofs
- ✅ State management
- ✅ Proving uniqueness
- ✅ Rollup state trees

## When to Use SMT

Use SMT when:
- Need key-value storage with proofs
- Need to prove key absence (non-membership)
- Keys are not sequential
- Frequent updates and deletions
- Sparse data sets

Use [IMT](/docs/packages/javascript/imt) when:
- Only need membership proofs
- Sequential insertions
- Memory/speed is critical

Use [LeanIMT](/docs/packages/javascript/lean-imt) when:
- Memory is extremely limited
- Only need membership proofs

## Limitations

- Fixed depth of 256 levels
- Larger proof sizes than IMT (~8KB vs ~640B for depth-20)
- Slower than IMT for sequential insertions

## Source

- **GitHub**: [zk-kit/packages/smt](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/smt)
- **NPM**: [@zk-kit/smt](https://www.npmjs.com/package/@zk-kit/smt)
- **License**: MIT

## Community

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Examples](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/smt/examples)



