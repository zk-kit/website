---
sidebar_position: 2
title: "@zk-kit/lean-imt"
---

# @zk-kit/lean-imt

Memory-optimized Incremental Merkle Tree implementation. LeanIMT uses significantly less memory than the standard IMT while maintaining similar functionality, making it ideal for resource-constrained environments.

## Overview

LeanIMT stores only the minimum necessary nodes (non-zero leaves and their path to the root) rather than the entire tree structure, reducing memory usage by up to 90% compared to IMT.

## Installation

```bash
npm install @zk-kit/lean-imt
```

**Peer Dependencies:**

```bash
# Poseidon (recommended for ZK circuits)
npm install poseidon-lite
```

## Quick Start

### Basic Usage

```typescript
import { LeanIMT } from "@zk-kit/lean-imt"
import { poseidon2 } from "poseidon-lite"

// Create a tree
const tree = new LeanIMT((a, b) => poseidon2([a, b]))

// Insert leaves
tree.insert(BigInt(1))
tree.insert(BigInt(2))
tree.insert(BigInt(3))

// Get root
console.log(tree.root)

// Generate proof
const proof = tree.generateProof(1) // Index of leaf

// Verify proof
const isValid = tree.verifyProof(proof)
console.log(isValid) // true
```

### Key Differences from IMT

```typescript
import { LeanIMT } from "@zk-kit/lean-imt"
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

// IMT: Requires depth upfront, stores full tree
const imt = new IMT(poseidon2, 16, 0, 2)

// LeanIMT: Dynamic depth, stores only non-zero nodes
const leanIMT = new LeanIMT((a, b) => poseidon2([a, b]))

// LeanIMT automatically grows as needed
for (let i = 0; i < 1000; i++) {
  leanIMT.insert(BigInt(i))
}

console.log(`IMT memory: ~${imt.leaves.length * 32}KB`)
console.log(`LeanIMT memory: ~${leanIMT.size * 32}KB`)
// LeanIMT uses significantly less memory
```

## API Reference

### Constructor

```typescript
new LeanIMT(
  hash: (a: Node, b: Node) => Node,
  options?: LeanIMTOptions
): LeanIMT
```

**Parameters:**

- `hash`: Binary hash function that takes two nodes
- `options`: Optional configuration
  - `zeroValue`: Value for empty nodes (default: `0`)

**Example:**

```typescript
import { LeanIMT } from "@zk-kit/lean-imt"
import { poseidon2 } from "poseidon-lite"

const tree = new LeanIMT((a, b) => poseidon2([a, b]), {
  zeroValue: BigInt(0)
})
```

### Properties

#### `root`

```typescript
tree.root: Node
```

Returns the current root of the tree.

#### `size`

```typescript
tree.size: number
```

Returns the number of leaves in the tree.

**Example:**

```typescript
tree.insert(BigInt(1))
tree.insert(BigInt(2))
console.log(tree.size) // 2
```

#### `depth`

```typescript
tree.depth: number
```

Returns the current depth of the tree (dynamically grows).

**Example:**

```typescript
console.log(tree.depth) // e.g., 5
tree.insert(BigInt(32)) // May increase depth
console.log(tree.depth) // e.g., 6
```

#### `leaves`

```typescript
tree.leaves: Node[]
```

Returns all leaves in the tree.

### Methods

#### `insert`

```typescript
tree.insert(leaf: Node): void
```

Inserts a new leaf into the tree. The tree automatically grows if needed.

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

#### `has`

```typescript
tree.has(leaf: Node): boolean
```

Checks if a leaf exists in the tree.

**Parameters:**

- `leaf`: The leaf value to check

**Returns:**

- `boolean`: `true` if leaf exists

**Example:**

```typescript
tree.insert(BigInt(123))
console.log(tree.has(BigInt(123))) // true
console.log(tree.has(BigInt(456))) // false
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

#### `generateProof`

```typescript
tree.generateProof(index: number): MerkleProof
```

Generates a Merkle proof for a leaf at the given index.

**Parameters:**

- `index`: Index of the leaf to prove

**Returns:**

- `MerkleProof`: Object containing proof data

**Example:**

```typescript
const proof = tree.generateProof(2)
console.log(proof)
// {
//   root: bigint,
//   leaf: bigint,
//   siblings: bigint[],
//   index: number
// }
```

#### `verifyProof`

```typescript
tree.verifyProof(proof: MerkleProof): boolean
```

Verifies a Merkle proof against the current tree root.

**Parameters:**

- `proof`: The proof object from `generateProof`

**Returns:**

- `boolean`: `true` if proof is valid

**Example:**

```typescript
const proof = tree.generateProof(2)
const isValid = tree.verifyProof(proof)
console.log(isValid) // true
```

#### Static: `verifyProof`

```typescript
LeanIMT.verifyProof(
  proof: MerkleProof,
  hash: (a: Node, b: Node) => Node
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
import { LeanIMT } from "@zk-kit/lean-imt"
import { poseidon2 } from "poseidon-lite"

const hash = (a, b) => poseidon2([a, b])
const isValid = LeanIMT.verifyProof(proof, hash)
```

#### `export`

```typescript
tree.export(): SerializedTree
```

Exports the tree to a serializable format for storage or transmission.

**Returns:**

- `SerializedTree`: Object that can be JSON stringified

**Example:**

```typescript
const exported = tree.export()
const json = JSON.stringify(exported)
// Store in database or file
```

#### `import`

```typescript
LeanIMT.import(
  hash: (a: Node, b: Node) => Node,
  data: SerializedTree
): LeanIMT
```

Creates a tree from exported data.

**Parameters:**

- `hash`: Hash function to use
- `data`: Exported tree data

**Returns:**

- `LeanIMT`: Restored tree instance

**Example:**

```typescript
import { LeanIMT } from "@zk-kit/lean-imt"
import { poseidon2 } from "poseidon-lite"

const hash = (a, b) => poseidon2([a, b])
const data = JSON.parse(storedJson)
const tree = LeanIMT.import(hash, data)
```

## Advanced Usage

### Mobile-Optimized Voting

```typescript
import { LeanIMT } from "@zk-kit/lean-imt"
import { poseidon2 } from "poseidon-lite"

// For mobile apps, use LeanIMT to reduce memory footprint
const voters = new LeanIMT((a, b) => poseidon2([a, b]))

// Can handle thousands of voters with minimal memory
for (let i = 0; i < 10000; i++) {
  voters.insert(BigInt(i))
}

console.log(`Memory: ~${voters.size * 32}B`)
// Significantly less than IMT
```

### Serverless Functions

```typescript
import { LeanIMT } from "@zk-kit/lean-imt"
import { poseidon2 } from "poseidon-lite"

// Export and import for serverless persistence
export async function handler(event) {
  const hash = (a, b) => poseidon2([a, b])
  
  // Load from database
  const stored = await db.get("tree")
  const tree = stored 
    ? LeanIMT.import(hash, JSON.parse(stored))
    : new LeanIMT(hash)
  
  // Perform operations
  tree.insert(BigInt(event.data))
  
  // Save back
  await db.set("tree", JSON.stringify(tree.export()))
  
  return { root: tree.root.toString() }
}
```

### Persistent Storage

```typescript
import { LeanIMT } from "@zk-kit/lean-imt"
import { poseidon2 } from "poseidon-lite"
import fs from "fs"

const hash = (a, b) => poseidon2([a, b])

// Create or load tree
let tree: LeanIMT

if (fs.existsSync("tree.json")) {
  const data = JSON.parse(fs.readFileSync("tree.json", "utf-8"))
  tree = LeanIMT.import(hash, data)
} else {
  tree = new LeanIMT(hash)
}

// Modify tree
tree.insert(BigInt(123))

// Save tree
fs.writeFileSync("tree.json", JSON.stringify(tree.export()))
```

## Performance Characteristics

| Operation | Time Complexity | Memory |
|-----------|----------------|--------|
| Insert | O(log n) | O(k) where k is non-zero nodes |
| Update | O(log n) | O(k) |
| Generate Proof | O(log n) | O(log n) |
| Verify Proof | O(log n) | O(log n) |
| Get Root | O(1) | O(1) |
| Export/Import | O(k) | O(k) |

## Memory Comparison

| Tree Size | IMT Memory | LeanIMT Memory | Savings |
|-----------|-----------|---------------|---------|
| 100 leaves | ~3.2 KB | ~0.3 KB | 90% |
| 1K leaves | ~32 KB | ~3 KB | 90% |
| 10K leaves | ~320 KB | ~30 KB | 90% |
| 100K leaves | ~3.2 MB | ~300 KB | 90% |

*Actual savings depend on tree density and zero value distribution*

## Dependencies

- Hash function (not included):
  - `poseidon-lite` (recommended)
  - Or any binary function matching `(a: Node, b: Node) => Node`

## TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import type { LeanIMT, MerkleProof, Node, SerializedTree } from "@zk-kit/lean-imt"
```

## Related Documentation

- [IMT Package](/docs/packages/javascript/imt) - Standard Merkle tree implementation
- [Choosing a Package](/docs/packages/choosing-a-package) - When to use LeanIMT
- [Merkle Trees](/docs/core-concepts/merkle-trees) - Core concepts

## Common Use Cases

- ✅ Mobile applications
- ✅ Edge computing
- ✅ Serverless functions
- ✅ Memory-constrained environments
- ✅ Dynamic tree sizes
- ✅ Persistent storage needs

## When to Use LeanIMT

Use LeanIMT when:
- Memory is limited (mobile, edge, serverless)
- Tree size is unknown upfront
- Need to persist/serialize tree
- Can trade slight performance for memory

Use [IMT](/docs/packages/javascript/imt) when:
- Memory is not constrained
- Need maximum performance
- Tree size is fixed/known

Use [SMT](/docs/packages/javascript/smt) when:
- Need key-value storage
- Need non-membership proofs

## Limitations

- Slightly slower than IMT (typically 10-20%)
- Binary trees only (arity 2)
- No random access to internal nodes

## Source

- **GitHub**: [zk-kit/packages/lean-imt](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/lean-imt)
- **NPM**: [@zk-kit/lean-imt](https://www.npmjs.com/package/@zk-kit/lean-imt)
- **License**: MIT

## Community

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Examples](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/lean-imt/examples)



