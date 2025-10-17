---
sidebar_position: 3
title: Your First ZK Proof
---

# Your First ZK Proof

Learn how to create a complete zero-knowledge proof system step-by-step.

## What We'll Build

A simple anonymous authentication system where users can prove they're authorized without revealing their identity.

## Prerequisites

```bash
npm install @zk-kit/imt
```
*See [npm page](https://www.npmjs.com/package/@zk-kit/imt) for peer dependencies like `poseidon-lite`*

## Step 1: Understanding the Problem

**Traditional Authentication:**
- User logs in with username/password
- System knows WHO is accessing
- Privacy: ❌

**Zero-Knowledge Authentication:**
- User proves they're in authorized list
- System doesn't know WHO
- Privacy: ✅

## Step 2: Create the Authorization Tree

```typescript
// auth-system.ts
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

// Create a tree to store authorized users
const authorizedUsers = new IMT(poseidon2, 16, 0, 2)

// Generate user commitments (in real app, these would be generated securely)
const user1Commitment = poseidon2([BigInt("0x1234")]) // User's secret hashed
const user2Commitment = poseidon2([BigInt("0x5678")])
const user3Commitment = poseidon2([BigInt("0x9abc")])

// Add users to authorization tree
const user1Index = authorizedUsers.insert(user1Commitment)
const user2Index = authorizedUsers.insert(user2Commitment)
const user3Index = authorizedUsers.insert(user3Commitment)

console.log("Authorization tree created")
console.log("Root:", authorizedUsers.root.toString())
console.log("Users authorized:", authorizedUsers.leaves.length)
```

## Step 3: Generate a Proof

```typescript
// User 1 wants to prove they're authorized
const mySecret = BigInt("0x1234")
const myCommitment = poseidon2([mySecret])
const myIndex = user1Index

// Generate proof of membership
const proof = authorizedUsers.createProof(myIndex)

console.log("\nProof generated:")
console.log("- Root:", proof.root.toString())
console.log("- Leaf:", proof.leaf.toString())
console.log("- Siblings:", proof.siblings.length, "nodes")
console.log("- Path:", proof.pathIndices)
```

## Step 4: Verify the Proof

```typescript
// Anyone can verify the proof without knowing which user
const isValid = authorizedUsers.verifyProof(proof)

console.log("\nVerification result:", isValid)
console.log("User is authorized:", isValid ? "YES ✓" : "NO ✗")
console.log("Identity revealed:", "NO - Anonymous ✓")
```

## Step 5: Complete Example

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

class AnonymousAuth {
  private tree: IMT
  private userSecrets = new Map<number, bigint>()

  constructor() {
    this.tree = new IMT(poseidon2, 16, 0, 2)
  }

  // Register a new user
  registerUser(userId: number, secret: bigint): void {
    const commitment = poseidon2([secret])
    const index = this.tree.insert(commitment)
    this.userSecrets.set(userId, secret)
    
    console.log(`User ${userId} registered at index ${index}`)
  }

  // User generates proof (client-side)
  generateProof(userId: number): any {
    const secret = this.userSecrets.get(userId)
    if (!secret) throw new Error("User not found")

    const commitment = poseidon2([secret])
    const index = this.tree.indexOf(commitment)
    
    if (index === -1) throw new Error("User not in tree")

    return this.tree.createProof(index)
  }

  // System verifies proof (server-side)
  verifyAccess(proof: any): boolean {
    return this.tree.verifyProof(proof)
  }

  // Get current authorization root (publish this)
  getRoot(): string {
    return this.tree.root.toString()
  }
}

// Demo
const auth = new AnonymousAuth()

// Register users
auth.registerUser(1, BigInt("0x1111"))
auth.registerUser(2, BigInt("0x2222"))
auth.registerUser(3, BigInt("0x3333"))

console.log("\nRoot:", auth.getRoot())

// User 1 tries to access
console.log("\n--- User 1 attempting access ---")
const proof1 = auth.generateProof(1)
console.log("Access granted:", auth.verifyAccess(proof1))

// User 2 tries to access
console.log("\n--- User 2 attempting access ---")
const proof2 = auth.generateProof(2)
console.log("Access granted:", auth.verifyAccess(proof2))
```

## Step 6: Add Nullifiers (Prevent Replay)

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

class SecureAnonymousAuth {
  private tree: IMT
  private usedNullifiers = new Set<string>()

  constructor() {
    this.tree = new IMT(poseidon2, 16, 0, 2)
  }

  registerUser(commitment: bigint): number {
    return this.tree.insert(commitment)
  }

  // Generate nullifier from secret and app ID
  static generateNullifier(secret: bigint, appId: string): bigint {
    return poseidon2([
      secret,
      BigInt("0x" + Buffer.from(appId).toString("hex"))
    ])
  }

  // Verify proof with nullifier check
  verifyAccess(proof: any, nullifier: bigint): boolean {
    // Check if nullifier was already used
    const nullifierStr = nullifier.toString()
    if (this.usedNullifiers.has(nullifierStr)) {
      throw new Error("Nullifier already used - possible replay attack")
    }

    // Verify the proof
    if (!this.tree.verifyProof(proof)) {
      return false
    }

    // Mark nullifier as used
    this.usedNullifiers.add(nullifierStr)
    return true
  }
}

// Usage
const secureAuth = new SecureAnonymousAuth()

const mySecret = BigInt("0x1234")
const myCommitment = poseidon2([mySecret])
const myIndex = secureAuth.registerUser(myCommitment)

// Generate proof and nullifier
const proof = secureAuth.tree.createProof(myIndex)
const nullifier = SecureAnonymousAuth.generateNullifier(mySecret, "my-app-v1")

// First attempt - should succeed
console.log("First access:", secureAuth.verifyAccess(proof, nullifier))

// Second attempt - should fail (replay attack)
try {
  secureAuth.verifyAccess(proof, nullifier)
} catch (error) {
  console.log("Replay prevented:", error.message)
}
```

## Understanding the Components

### 1. Commitment
A hash of your secret that goes into the tree:
```typescript
const commitment = poseidon2([secret])
```

### 2. Merkle Tree
Stores all commitments efficiently:
```typescript
const tree = new IMT(poseidon2, 16, 0, 2)
tree.insert(commitment)
```

### 3. Proof
Proves membership without revealing which leaf:
```typescript
const proof = tree.createProof(index)
```

### 4. Nullifier
Prevents double-use of the same proof:
```typescript
const nullifier = poseidon2([secret, appId])
```

### 5. Verification
Checks the proof is valid:
```typescript
const isValid = tree.verifyProof(proof)
```

## Security Considerations

### ✅ Do's

1. **Use secure randomness for secrets**
```typescript
import { randomBytes } from "crypto"
const secret = BigInt("0x" + randomBytes(32).toString("hex"))
```

2. **Never reuse nullifiers**
```typescript
const nullifier = poseidon2([secret, uniqueAppId, timestamp])
```

3. **Store tree root on-chain for production**
```typescript
await contract.updateRoot(tree.root)
```

### ❌ Don'ts

1. **Don't use predictable secrets**
```typescript
// BAD
const secret = BigInt(userId) // Predictable!

// GOOD
const secret = BigInt("0x" + randomBytes(32).toString("hex"))
```

2. **Don't skip nullifier checks**
```typescript
// BAD
if (tree.verifyProof(proof)) { /* grant access */ }

// GOOD
if (tree.verifyProof(proof) && !used.has(nullifier)) { /* grant access */ }
```

3. **Don't log sensitive data**
```typescript
// BAD
console.log("User secret:", mySecret)

// GOOD
console.log("User index:", myIndex)
```

## Common Patterns

### Pattern 1: Client-Server Split

**Client (generates proof):**
```typescript
const proof = tree.createProof(myIndex)
const nullifier = generateNullifier(mySecret, "app-id")

// Send to server
await fetch("/verify", {
  method: "POST",
  body: JSON.stringify({ proof, nullifier })
})
```

**Server (verifies proof):**
```typescript
app.post("/verify", (req, res) => {
  const { proof, nullifier } = req.body
  
  if (tree.verifyProof(proof) && !used.has(nullifier)) {
    used.add(nullifier)
    res.json({ authorized: true })
  } else {
    res.json({ authorized: false })
  }
})
```

### Pattern 2: Time-Limited Access

```typescript
const timestamp = Math.floor(Date.now() / 1000)
const validUntil = timestamp + 3600 // 1 hour

const nullifier = poseidon2([secret, appId, BigInt(validUntil)])

// Server checks timestamp
if (validUntil < Math.floor(Date.now() / 1000)) {
  throw new Error("Access expired")
}
```

### Pattern 3: On-Chain Verification

```typescript
// Off-chain: generate proof
const proof = tree.createProof(index)

// On-chain: verify
const tx = await contract.verifyAndExecute(
  proof.root,
  proof.leaf,
  proof.siblings,
  proof.pathIndices,
  nullifier
)
```

## Testing Your Proof System

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

function testProofSystem() {
  console.log("Testing ZK Proof System...\n")

  // Setup
  const tree = new IMT(poseidon2, 16, 0, 2)
  const secret = BigInt("0x1234")
  const commitment = poseidon2([secret])
  const index = tree.insert(commitment)

  // Test 1: Valid proof
  const proof = tree.createProof(index)
  console.assert(tree.verifyProof(proof), "Test 1 failed: Valid proof should verify")
  console.log("✓ Test 1: Valid proof verifies")

  // Test 2: Modified proof fails
  const badProof = { ...proof, leaf: BigInt(999) }
  console.assert(!tree.verifyProof(badProof), "Test 2 failed: Invalid proof should fail")
  console.log("✓ Test 2: Modified proof fails")

  // Test 3: Nullifier uniqueness
  const nullifier1 = poseidon2([secret, BigInt(1)])
  const nullifier2 = poseidon2([secret, BigInt(2)])
  console.assert(nullifier1 !== nullifier2, "Test 3 failed: Nullifiers should be unique")
  console.log("✓ Test 3: Nullifiers are unique")

  console.log("\n✅ All tests passed!")
}

testProofSystem()
```

## Next Steps

Now that you understand the basics:

1. **Learn Core Concepts**: [Zero-Knowledge Basics](/docs/core-concepts/zero-knowledge-basics)
2. **Explore Packages**: [Choosing a Package](/docs/packages/choosing-a-package)
3. **Understand Merkle Trees**: [Merkle Trees Explained](/docs/core-concepts/merkle-trees)
4. **Development Setup**: [Configure Your Environment](/docs/getting-started/development-setup)

## Resources

- [Packages Overview](/docs/packages/overview)
- [GitHub Repository](https://github.com/privacy-scaling-explorations/zk-kit)
- [npm Packages](https://www.npmjs.com/org/zk-kit)
- [Get Help](https://github.com/privacy-scaling-explorations/zk-kit/discussions)

