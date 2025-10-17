---
sidebar_position: 1
title: Zero-Knowledge Basics
description: Deep dive into the fundamentals of zero-knowledge proofs
---

# Zero-Knowledge Basics

Deep dive into the fundamentals of zero-knowledge proofs and how they work in ZK-Kit.

## What is Zero-Knowledge?

A zero-knowledge proof is a cryptographic method that allows one party (the prover) to prove to another party (the verifier) that a statement is true, without revealing any information beyond the validity of the statement itself.

### The Three Properties

Every zero-knowledge proof must satisfy three properties:

#### 1. Completeness
If the statement is true and both parties follow the protocol, the verifier will be convinced.

```typescript
// If Alice really knows the secret
const secret = BigInt("0x1234")
const commitment = poseidon2([secret])
tree.insert(commitment)

// She can always create a valid proof
const proof = tree.createProof(0)
console.log(tree.verifyProof(proof)) // Always true
```

#### 2. Soundness
If the statement is false, no cheating prover can convince the verifier (except with negligible probability).

```typescript
// If Bob tries to fake a proof
const fakeProof = {
  root: tree.root,
  leaf: BigInt(999), // Not actually in tree
  siblings: [],
  pathIndices: []
}

console.log(tree.verifyProof(fakeProof)) // Always false
```

#### 3. Zero-Knowledge
The verifier learns nothing except that the statement is true.

```typescript
// Verifier sees the proof
console.log(proof)
// {
//   root: 123456789n,
//   leaf: 1n,
//   siblings: [...],  // Doesn't reveal which leaf
//   pathIndices: [...]
// }

// Verifier knows: "Someone in the tree made this proof"
// Verifier doesn't know: "Which specific person"
```

## How ZK Proofs Work

### 1. Commitment Phase

The prover commits to their secret without revealing it.

```typescript
import { poseidon2 } from "poseidon-lite"

// Alice's secret (only she knows)
const secret = BigInt("0xabcd1234")

// Public commitment (everyone can see)
const commitment = poseidon2([secret])

// Commitment properties:
// - Hiding: Can't reverse to get secret
// - Binding: Can't change secret later
```

### 2. Challenge Phase

In interactive proofs, the verifier sends a random challenge.

```typescript
// In ZK-Kit, this is handled by the Merkle tree structure
// The "challenge" is proving you know a path to the root
```

### 3. Response Phase

The prover provides a response that convinces the verifier.

```typescript
// Alice generates a proof
const proof = tree.createProof(myIndex)

// Proof contains:
// - Siblings (hash values along the path)
// - Path indices (left or right at each level)
// - No information about which specific leaf
```

## Merkle Proofs as ZK Proofs

ZK-Kit primarily uses Merkle trees for zero-knowledge proofs.

### How Merkle Proofs Provide ZK

```
Tree Structure:
        Root
       /    \
      H1    H2
     / \    / \
    A   B  C   D

To prove A is in the tree:
- Provide: [B, H2]
- Calculate: H1 = hash(A, B)
- Calculate: Root = hash(H1, H2)
- If calculated Root matches public Root, proof is valid
```

Implementation:

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

const tree = new IMT(poseidon2, 16, 0, 2)

// Add leaves
tree.insert(BigInt("A"))
tree.insert(BigInt("B"))
tree.insert(BigInt("C"))
tree.insert(BigInt("D"))

// Prove "A" is in tree
const proof = tree.createProof(0)

// Proof reveals:
// ✓ That a leaf exists in the tree
// ✗ Which specific leaf (A, B, C, or D)

// Anyone can verify
console.log(tree.verifyProof(proof)) // true
```

## ZK in Action: Anonymous Voting

Let's see how ZK properties enable anonymous voting:

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

class AnonymousVotingSystem {
  private tree: IMT
  private votes = new Map<string, string>()
  private nullifiers = new Set<string>()

  constructor() {
    this.tree = new IMT(poseidon2, 20, 0, 2)
  }

  // Register eligible voters
  registerVoter(commitment: bigint): number {
    return this.tree.insert(commitment)
  }

  // Vote anonymously
  vote(
    proof: any,
    nullifier: string,
    candidate: string
  ): boolean {
    // 1. COMPLETENESS: Valid voter can always vote
    if (!this.tree.verifyProof(proof)) {
      throw new Error("Not an eligible voter")
    }

    // 2. SOUNDNESS: Can't vote twice (nullifier check)
    if (this.nullifiers.has(nullifier)) {
      throw new Error("Already voted")
    }

    // 3. ZERO-KNOWLEDGE: Don't know which voter
    this.votes.set(nullifier, candidate)
    this.nullifiers.add(nullifier)
    return true
  }

  // Public results
  getResults(): Map<string, number> {
    const results = new Map<string, number>()
    for (const candidate of this.votes.values()) {
      results.set(candidate, (results.get(candidate) || 0) + 1)
    }
    return results
  }
}

// Usage
const voting = new AnonymousVotingSystem()

// Register voters (public phase)
const alice = poseidon2([BigInt("alice-secret")])
const bob = poseidon2([BigInt("bob-secret")])
voting.registerVoter(alice)
voting.registerVoter(bob)

// Vote anonymously (private phase)
const aliceProof = voting.tree.createProof(0)
const aliceNullifier = poseidon2([
  BigInt("alice-secret"),
  BigInt("election-2024")
]).toString()

voting.vote(aliceProof, aliceNullifier, "Candidate A")

// Results show votes but not voters
console.log(voting.getResults())
// Map { 'Candidate A' => 1 }
```

## Types of ZK Proofs

### 1. Interactive ZK Proofs

Require back-and-forth between prover and verifier.

**Example:** The color-blind friend example
- Challenge: "Did I swap the balls?"
- Response: "Yes" or "No"
- Repeat many times

### 2. Non-Interactive ZK Proofs (NIZK)

Single message from prover to verifier.

**ZK-Kit uses NIZKs:**
```typescript
// One-way communication
const proof = tree.createProof(0)

// Verifier checks without interaction
const isValid = tree.verifyProof(proof)
```

### 3. ZK-SNARKs

**Succinct Non-Interactive Arguments of Knowledge**

- **Succinct**: Small proof size
- **Non-Interactive**: One message
- **Argument**: Computationally sound
- **of Knowledge**: Prover actually knows the information

```typescript
// ZK-Kit provides building blocks for zk-SNARKs
import { poseidonProof } from "@zk-kit/poseidon-proof"

// Generate SNARK proof
const { proof, publicSignals } = await poseidonProof.generateProof(...)

// Verify
const isValid = await poseidonProof.verifyProof(proof, publicSignals)
```

## Common ZK Patterns in ZK-Kit

### Pattern 1: Membership Proof

Prove you're in a set without revealing which member.

```typescript
const members = new IMT(poseidon2, 16, 0, 2)
members.insert(myCommitment)

const proof = members.createProof(myIndex)
// Proves: "I'm a member"
// Hides: "Which member"
```

### Pattern 2: Non-Membership Proof

Prove you're NOT in a set (using SMT).

```typescript
import { SMT } from "@zk-kit/smt"

const smt = new SMT(hash, true)
smt.add(key1, value1)

// Prove key2 is not in tree
const proof = smt.createProof(key2)
// proof.membership === false
```

### Pattern 3: Nullifier Pattern

Prevent double-use without revealing identity.

```typescript
// Unique nullifier per action
const nullifier = poseidon2([
  userSecret,
  actionId,
  timestamp
])

// Check if used
if (usedNullifiers.has(nullifier.toString())) {
  throw new Error("Action already performed")
}

usedNullifiers.add(nullifier.toString())
```

## Mathematical Foundation

### Hash Functions

ZK-Kit uses Poseidon hash, optimized for zero-knowledge:

```typescript
import { poseidon2 } from "poseidon-lite"

// Hash two values
const hash = poseidon2([value1, value2])

// Properties:
// - Deterministic: Same input → Same output
// - One-way: Can't reverse
// - Collision-resistant: Hard to find two inputs with same output
// - ZK-friendly: Efficient in circuits
```

### Field Arithmetic

Operations happen in a finite field:

```typescript
import { F1Field } from "@zk-kit/utils"

const field = new F1Field(/* prime */)

// All operations mod prime
const sum = field.add(a, b)
const product = field.mul(a, b)
const inverse = field.inv(a)
```

### Elliptic Curves

For signatures and advanced cryptography:

```typescript
import { Point } from "@zk-kit/baby-jubjub"

const point = Point.fromPrivateKey(privateKey)
// Point on Baby Jubjub curve
// Used for EdDSA signatures
```

## Privacy Levels

ZK-Kit enables different privacy levels:

### Level 1: Pseudonymous
```typescript
// Public key visible, but not linked to real identity
const publicKey = derivePublicKey(privateKey)
```

### Level 2: Anonymous
```typescript
// Prove membership without revealing which member
const proof = tree.createProof(myIndex)
```

### Level 3: Unlinkable
```typescript
// Different proofs can't be linked to same user
const nullifier1 = poseidon2([secret, "action-1"])
const nullifier2 = poseidon2([secret, "action-2"])
// No way to tell if from same user
```

## Security Considerations

### Randomness

```typescript
import { randomBytes } from "crypto"

// Generate secure random secret
const secret = BigInt("0x" + randomBytes(32).toString("hex"))

// ❌ BAD: Predictable
const badSecret = BigInt(userId)

// ✅ GOOD: Cryptographically secure random
```

### Nullifier Uniqueness

```typescript
// Include context to prevent cross-application attacks
const nullifier = poseidon2([
  userSecret,
  BigInt("0x" + Buffer.from("my-app-v1").toString("hex")),
  actionId
])
```

### Root Management

```typescript
// Store roots on-chain for trustless verification
await contract.updateRoot(tree.root)

// Verify against on-chain root
const onChainRoot = await contract.getRoot()
if (proof.root !== onChainRoot) {
  throw new Error("Proof uses outdated root")
}
```

## Performance Characteristics

### Proof Size

```typescript
// For tree depth 20:
// - Proof contains 20 siblings
// - Each sibling is ~32 bytes
// - Total: ~640 bytes

const proof = tree.createProof(0)
const proofSize = JSON.stringify(proof).length
console.log(`Proof size: ${proofSize} bytes`)
```

### Verification Time

```typescript
// Verification is O(log n)
// For 1M members (depth 20):
// - Proof generation: ~8ms
// - Verification: ~3ms
```

## Next Steps

- [Merkle Trees](/docs/core-concepts/merkle-trees) - Deep dive into Merkle structures
- [Packages Overview](/docs/packages/overview) - Explore ZK-Kit packages
- [Your First Proof](/docs/getting-started/first-proof) - Build your first proof
- [Choosing a Package](/docs/packages/choosing-a-package) - Find the right package

## Resources

- [Zero-Knowledge Proofs: An Introduction](https://z.cash/learn/what-are-zk-snarks/)
- [ZK Whiteboard Sessions](https://www.youtube.com/playlist?list=PLj80z0cJm8QErn3akRcqvxUsyXWC81OGq)
- [ZK-Kit GitHub](https://github.com/zk-kit/zk-kit)

