---
sidebar_position: 2
title: Quick Start
description: Build your first zero-knowledge proof in 2 minutes
---

# Quick Start

Build your first zero-knowledge proof in 2 minutes.

## Prerequisites

- Node.js 16+ and npm 7+
- Basic TypeScript/JavaScript knowledge
- 5 minutes of your time

## Step 1: Install

Choose your package based on your needs:

### For most use cases (membership proofs)
```bash
npm i @zk-kit/imt
```

### For memory-constrained environments
```bash
npm i @zk-kit/lean-imt
```

### For key-value storage with proofs
```bash
npm i @zk-kit/smt
```

:::info Peer Dependencies
Some packages require additional dependencies (like hash functions). Check the package's [npm page](https://www.npmjs.com/org/zk-kit) for requirements. For this example, you may need:
```bash
npm i poseidon-lite  # for IMT/LeanIMT examples
```
:::

## Step 2: Create Your First Proof

```typescript
// proof-demo.ts
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

// 1. Create a Merkle tree
const tree = new IMT(poseidon2, 16, 0, 2)

// 2. Add members (e.g., user identities)
const members = [
  BigInt("123456789"),
  BigInt("987654321"),
  BigInt("555555555")
]

members.forEach(member => tree.insert(member))

// 3. Generate a proof (proves membership without revealing which member)
const memberIndex = 0 // Only the prover knows this
const proof = tree.createProof(memberIndex)

// 4. Verify the proof (anyone can do this)
const isValid = tree.verifyProof(proof)
console.log("Proof valid?", isValid) // true

// 5. The proof can be sent to a smart contract or backend
console.log("Proof data:", {
  root: tree.root,
  leaf: proof.leaf,
  siblings: proof.siblings,
  pathIndices: proof.pathIndices
})
```

## Step 3: Run It

```bash
# If using TypeScript
npx ts-node proof-demo.ts

# If using JavaScript, rename to .js and run
node proof-demo.js
```

## What Just Happened?

1. **Tree Creation**: You created a Merkle tree that can hold membership data
2. **Member Addition**: Added identities without storing personal information
3. **Proof Generation**: Created a cryptographic proof of membership
4. **Anonymous Verification**: Verified membership without revealing identity

## Interactive Example

Try it in your browser:

```html
<!DOCTYPE html>
<html>
<head>
  <title>ZK-Kit Demo</title>
</head>
<body>
  <h1>Zero-Knowledge Proof Demo</h1>
  <button id="run">Run Demo</button>
  <pre id="output"></pre>

  <script type="module">
    import { IMT } from 'https://esm.sh/@zk-kit/imt'
    import { poseidon2 } from 'https://esm.sh/poseidon-lite'

    document.getElementById('run').addEventListener('click', () => {
      const tree = new IMT(poseidon2, 16, 0, 2)
      
      // Add members
      tree.insert(BigInt(1))
      tree.insert(BigInt(2))
      tree.insert(BigInt(3))
      
      // Create and verify proof
      const proof = tree.createProof(0)
      const isValid = tree.verifyProof(proof)
      
      document.getElementById('output').textContent = 
        `Proof valid: ${isValid}\nRoot: ${tree.root}\nLeaves: ${tree.leaves.length}`
    })
  </script>
</body>
</html>
```

## Real-World Example: Anonymous Voting

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

class AnonymousVoting {
  private tree: IMT
  private votes = new Map<string, string>()
  
  constructor() {
    this.tree = new IMT(poseidon2, 20, 0, 2)
  }
  
  // Register a voter
  registerVoter(voterCommitment: bigint): number {
    return this.tree.insert(voterCommitment)
  }
  
  // Cast anonymous vote
  castVote(
    voterIndex: number,
    nullifier: string,
    candidate: string
  ): boolean {
    // Create proof of voter eligibility
    const proof = this.tree.createProof(voterIndex)
    
    // Verify proof
    if (!this.tree.verifyProof(proof)) {
      throw new Error("Invalid voter")
    }
    
    // Check if already voted (prevent double voting)
    if (this.votes.has(nullifier)) {
      throw new Error("Already voted")
    }
    
    // Record vote
    this.votes.set(nullifier, candidate)
    return true
  }
  
  // Get results
  getResults(): Map<string, number> {
    const results = new Map<string, number>()
    
    for (const candidate of this.votes.values()) {
      results.set(candidate, (results.get(candidate) || 0) + 1)
    }
    
    return results
  }
}

// Usage
const voting = new AnonymousVoting()

// Register voters
const voter1 = voting.registerVoter(BigInt("0x123..."))
const voter2 = voting.registerVoter(BigInt("0x456..."))
const voter3 = voting.registerVoter(BigInt("0x789..."))

// Vote anonymously
voting.castVote(voter1, "nullifier-1", "Alice")
voting.castVote(voter2, "nullifier-2", "Bob")
voting.castVote(voter3, "nullifier-3", "Alice")

// Get results
console.log(voting.getResults())
// Map(2) { 'Alice' => 2, 'Bob' => 1 }
```

## Next Steps

### Learn the Concepts
- [What is Zero-Knowledge?](/docs/core-concepts/zero-knowledge-basics)
- [Understanding Merkle Trees](/docs/core-concepts/merkle-trees)
- [Comparison with Other Libraries](/docs/introduction/comparison)

### Continue Building
- [Your First ZK Proof](/docs/getting-started/first-proof) - Complete step-by-step guide
- [Development Setup](/docs/getting-started/development-setup) - Set up your environment
- [TypeScript Setup](/docs/getting-started/typescript-setup) - Configure TypeScript

### Explore Packages
- [Packages Overview](/docs/packages/overview) - See all available packages
- [Choosing a Package](/docs/packages/choosing-a-package) - Decision guide
- [Ecosystem Projects](/docs/introduction/ecosystem) - See real-world usage

## Common Patterns

### Pattern 1: Membership Proof

```typescript
// Create a set of authorized users
const authorizedUsers = new IMT(poseidon2, 16, 0, 2)

// Add users
const myIndex = authorizedUsers.insert(myCommitment)

// Prove membership without revealing identity
const proof = authorizedUsers.createProof(myIndex)

// Verify
if (authorizedUsers.verifyProof(proof)) {
  console.log("Access granted!")
}
```

### Pattern 2: Double-Spend Prevention

```typescript
// Use nullifiers to prevent reuse
const nullifier = poseidon2([secret, appId])

// Check if nullifier was used
if (usedNullifiers.has(nullifier.toString())) {
  throw new Error("Already used")
}

// Mark as used
usedNullifiers.add(nullifier.toString())
```

### Pattern 3: On-Chain Verification

```typescript
// Generate proof off-chain
const proof = tree.createProof(index)

// Send to smart contract
await contract.verify(
  proof.root,
  proof.leaf,
  proof.siblings,
  proof.pathIndices
)
```

## Common Questions

**Q: Which package should I use?**
A: See our [package selection guide](/docs/packages/choosing-a-package)

**Q: How do I integrate with Ethereum?**
A: Check the [Semaphore](https://semaphore.pse.dev) protocol for smart contract examples

**Q: Is this production-ready?**
A: Yes! See [who's using ZK-Kit](/docs/introduction/ecosystem)

**Q: How do I generate nullifiers?**
A: Use a hash of your secret and a unique identifier:
```typescript
const nullifier = poseidon2([mySecret, appIdentifier])
```

**Q: Can I use this in the browser?**
A: Yes! See the [Installation guide](/docs/getting-started/installation#browser-support) for browser setup

## Performance Tips

### Tree Size Selection

```typescript
// For 65,536 members (2^16)
const tree = new IMT(poseidon2, 16, 0, 2)

// For 1 million members (2^20)
const tree = new IMT(poseidon2, 20, 0, 2)

// For memory-constrained (same capacity, less memory)
const tree = new LeanIMT((a, b) => poseidon2([a, b]))
```

### Batch Operations

```typescript
// Instead of individual inserts
tree.insert(1n)
tree.insert(2n)
tree.insert(3n)

// Batch insert (if your use case allows)
const members = [1n, 2n, 3n]
const tree = new IMT(poseidon2, 16, 0, 2, members)
```

## Get Help

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Documentation](/docs)
- 🎓 [More Examples](/docs/getting-started/first-proof)

## Explore More

- [GitHub Repository](https://github.com/privacy-scaling-explorations/zk-kit)
- [Ecosystem Projects](/docs/introduction/ecosystem)

Ready to build something amazing? Let's go! 🚀

