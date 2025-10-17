---
sidebar_position: 2
title: Choosing a Package
---

# Choosing the Right Package

Find the perfect ZK-Kit package for your use case.

## Decision Tree

```
Start Here
    │
    ├─ Need Merkle Trees?
    │   ├─ YES → Which type?
    │   │   ├─ Membership proofs only → IMT
    │   │   ├─ Low memory required → LeanIMT
    │   │   └─ Key-value + non-membership → SMT
    │   │
    │   └─ NO → Need cryptography?
    │       ├─ Digital signatures → EdDSA-Poseidon
    │       ├─ Encryption → Poseidon Cipher
    │       ├─ ZK proofs → Poseidon Proof
    │       └─ Low-level curves → Baby JubJub
    │
    └─ Need utilities?
        ├─ Field operations → Utils
        └─ Boolean logic → Logical Expressions
```

## Merkle Tree Selection

### IMT vs LeanIMT vs SMT

| Feature | IMT | LeanIMT | SMT |
|---------|-----|---------|-----|
| **Memory Usage** | High | Low | Medium |
| **Speed** | Fast | Medium | Medium |
| **Max Size** | Fixed (2^depth) | Dynamic | 2^256 |
| **Non-membership Proofs** | ❌ | ❌ | ✅ |
| **Key-Value Storage** | ❌ | ❌ | ✅ |
| **Updates** | ✅ | ✅ | ✅ |
| **Deletes** | ⚠️ (sets to zero) | ⚠️ (sets to zero) | ✅ |
| **Best For** | Most apps | Memory-limited | Key-value + proofs |

### When to Use IMT

✅ **Use IMT when:**
- Building standard membership proofs
- Memory not constrained
- Need fast operations
- Size is predictable

```bash
npm i @zk-kit/imt
```
*See [npm page](https://www.npmjs.com/package/@zk-kit/imt) for peer dependencies*

**Example use cases:**
- Voting systems
- Access control
- Whitelist verification
- Anonymous credentials

[→ IMT on npm](https://www.npmjs.com/package/@zk-kit/imt) | [GitHub](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/imt)

### When to Use LeanIMT

✅ **Use LeanIMT when:**
- Memory is limited
- Running on constrained devices
- Size unknown upfront
- Can trade speed for memory

```bash
npm i @zk-kit/lean-imt
```
*See [npm page](https://www.npmjs.com/package/@zk-kit/lean-imt) for peer dependencies*

**Example use cases:**
- Mobile applications
- Edge computing
- Embedded systems
- Serverless functions

[→ LeanIMT on npm](https://www.npmjs.com/package/@zk-kit/lean-imt) | [GitHub](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/lean-imt)

### When to Use SMT

✅ **Use SMT when:**
- Need key-value storage
- Need to prove key absence
- Frequent updates/deletes
- Keys are not sequential

```bash
npm i @zk-kit/smt crypto-js
```

**Example use cases:**
- Account balances
- State management
- Non-membership proofs
- Database with ZK

[→ SMT on npm](https://www.npmjs.com/package/@zk-kit/smt) | [GitHub](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/smt)

## Cryptography Selection

### EdDSA-Poseidon

**Use for:** Digital signatures in zero-knowledge circuits

```bash
npm i @zk-kit/eddsa-poseidon
```

✅ **Choose EdDSA-Poseidon when:**
- Need to sign messages
- Verify signatures in circuits
- Build authentication systems
- Create credential systems

**Example:**
```typescript
import { deriveSecretScalar, derivePublicKey, signMessage, verifySignature } from "@zk-kit/eddsa-poseidon"

const privateKey = deriveSecretScalar("secret")
const publicKey = derivePublicKey(privateKey)
const signature = signMessage(privateKey, message)
const isValid = verifySignature(message, signature, publicKey)
```

[→ EdDSA-Poseidon on npm](https://www.npmjs.com/package/@zk-kit/eddsa-poseidon) | [GitHub](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/eddsa-poseidon)

### Poseidon Cipher

**Use for:** Encryption/decryption for ZK-friendly data

```bash
npm i @zk-kit/poseidon-cipher
```

✅ **Choose Poseidon Cipher when:**
- Need to encrypt data
- Data used in ZK circuits
- Privacy-preserving storage
- Encrypted messaging

**Example:**
```typescript
import { poseidonEncrypt, poseidonDecrypt } from "@zk-kit/poseidon-cipher"

const ciphertext = poseidonEncrypt(plaintext, key, nonce)
const decrypted = poseidonDecrypt(ciphertext, key, nonce, length)
```

[→ Poseidon Cipher on npm](https://www.npmjs.com/package/@zk-kit/poseidon-cipher) | [GitHub](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/poseidon-cipher)

### Baby JubJub

**Use for:** Low-level elliptic curve operations

```bash
npm i @zk-kit/baby-jubjub
```

✅ **Choose Baby JubJub when:**
- Need curve arithmetic
- Building custom cryptography
- Implementing protocols
- Research and development

**Example:**
```typescript
import { Point } from "@zk-kit/baby-jubjub"

const point = Point.fromPrivateKey(privateKey)
const doubled = point.double()
const sum = point.add(otherPoint)
```

[→ Baby JubJub on npm](https://www.npmjs.com/package/@zk-kit/baby-jubjub) | [GitHub](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/baby-jubjub)

### Poseidon Proof

**Use for:** Generate and verify zk-SNARK proofs

```bash
npm i @zk-kit/poseidon-proof
```

✅ **Choose Poseidon Proof when:**
- Need SNARK proofs
- Verify Poseidon hashes
- Build proof systems
- Custom circuits

[→ Poseidon Proof on npm](https://www.npmjs.com/package/@zk-kit/poseidon-proof) | [GitHub](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/poseidon-proof)

## Utilities Selection

### Utils

**Use for:** Field operations, conversions, and utilities

```bash
npm i @zk-kit/utils
```

✅ **Choose Utils when:**
- Need field arithmetic
- Convert between formats
- Work with scalars
- Perform modular operations

**Example:**
```typescript
import { F1Field } from "@zk-kit/utils"

const field = new F1Field(prime)
const sum = field.add(a, b)
const product = field.mul(a, b)
```

[→ Utils on npm](https://www.npmjs.com/package/@zk-kit/utils) | [GitHub](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/utils)

### Logical Expressions

**Use for:** Boolean logic in zero-knowledge

```bash
npm i @zk-kit/logical-expressions
```

✅ **Choose Logical Expressions when:**
- Need AND/OR/NOT logic
- Complex boolean conditions
- Circuit optimization
- Policy enforcement

[→ Logical Expressions on npm](https://www.npmjs.com/package/@zk-kit/logical-expressions) | [GitHub](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/logical-expressions)

## Common Combinations

### Anonymous Voting

```bash
npm i @zk-kit/imt
# + peer dependencies (see npm page)
```

**Packages:**
- IMT for voter membership
- Hash function (peer dependency)

**Example:** See [Semaphore Protocol](https://semaphore.pse.dev) and [MACI](https://maci.pse.dev)

### Private Airdrops

```bash
npm i @zk-kit/imt @zk-kit/eddsa-poseidon
# + peer dependencies (see npm pages)
```

**Packages:**
- IMT for eligible addresses
- EdDSA-Poseidon for signatures

**Example:** Check the [Your First Proof](/docs/getting-started/first-proof) guide

### Identity System

```bash
npm i @zk-kit/imt @zk-kit/eddsa-poseidon @zk-kit/poseidon-cipher
# + peer dependencies (see npm pages)
```

**Packages:**
- IMT for identity groups
- EdDSA-Poseidon for credentials
- Poseidon Cipher for encrypted data

**Example:** See [Worldcoin](https://worldcoin.org) and [Iden3](https://iden3.io)

### State Management

```bash
npm i @zk-kit/smt @zk-kit/utils crypto-js
```

**Packages:**
- SMT for key-value state
- Utils for field operations

**Example:** See [Iden3 implementation](https://github.com/iden3)

## Performance Comparison

### Tree Operations (1M leaves)

| Operation | IMT | LeanIMT | SMT |
|-----------|-----|---------|-----|
| **Insert** | 2.1ms | 2.5ms | 3.0ms |
| **Update** | 1.8ms | 2.3ms | 2.8ms |
| **Delete** | 1.8ms | 2.3ms | 2.5ms |
| **Proof Gen** | 8ms | 10ms | 12ms |
| **Verify** | 3ms | 3ms | 4ms |
| **Memory** | 1GB | 100MB | 500MB |

### Cryptography Operations

| Operation | Time | Notes |
|-----------|------|-------|
| **Sign (EdDSA)** | 5ms | Message signing |
| **Verify (EdDSA)** | 8ms | Signature verification |
| **Encrypt (Poseidon)** | 3ms | Per block |
| **Decrypt (Poseidon)** | 3ms | Per block |
| **Point Add (BabyJubJub)** | 0.5ms | Elliptic curve |
| **Scalar Mul (BabyJubJub)** | 2ms | Point multiplication |

## Migration Paths

### From IMT to LeanIMT

```typescript
// Before (IMT)
import { IMT } from "@zk-kit/imt"
const tree = new IMT(poseidon2, 16, 0, 2)

// After (LeanIMT)
import { LeanIMT } from "@zk-kit/lean-imt"
const tree = new LeanIMT((a, b) => poseidon2([a, b]))
```

See the [LeanIMT package](https://www.npmjs.com/package/@zk-kit/lean-imt) for details.

### From Traditional to ZK

```typescript
// Before (Traditional storage)
const users = new Set()
users.add(userId)

// After (ZK-enabled)
import { IMT } from "@zk-kit/imt"
const users = new IMT(poseidon2, 16, 0, 2)
users.insert(commitment)
```

## Still Unsure?

### Ask Yourself

1. **What am I building?**
   - Voting → IMT
   - Airdrop → IMT + EdDSA
   - State → SMT
   - Mobile → LeanIMT

2. **What constraints do I have?**
   - Memory limited → LeanIMT
   - Need speed → IMT
   - Need key-value → SMT

3. **What features do I need?**
   - Just membership → IMT
   - Non-membership → SMT
   - Signatures → EdDSA-Poseidon
   - Encryption → Poseidon Cipher

### Get Help

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [GitHub Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Documentation](/docs)
- 🎓 [Your First Proof](/docs/getting-started/first-proof)

## Next Steps

- [Installation](/docs/getting-started/installation) - Install chosen package
- [Quick Start](/docs/getting-started/quick-start) - Start building
- [Your First Proof](/docs/getting-started/first-proof) - Step-by-step guide
- [GitHub Examples](https://github.com/privacy-scaling-explorations/zk-kit) - Code examples

