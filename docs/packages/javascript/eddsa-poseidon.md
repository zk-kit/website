---
sidebar_position: 4
title: "@zk-kit/eddsa-poseidon"
---

# @zk-kit/eddsa-poseidon

EdDSA signature scheme using Poseidon hash and Baby JubJub elliptic curve. This package provides zero-knowledge friendly digital signatures that can be efficiently verified in ZK circuits.

## Overview

EdDSA-Poseidon combines:
- **EdDSA**: Edwards-curve Digital Signature Algorithm
- **Poseidon**: ZK-friendly hash function
- **Baby JubJub**: Efficient elliptic curve for ZK circuits

This makes it ideal for signing messages that need to be verified inside zero-knowledge proofs.

## Installation

```bash
npm install @zk-kit/eddsa-poseidon
```

**Peer Dependencies:**

```bash
npm install @zk-kit/baby-jubjub poseidon-lite
```

## Quick Start

### Basic Signing and Verification

```typescript
import {
  deriveSecretScalar,
  derivePublicKey,
  signMessage,
  verifySignature
} from "@zk-kit/eddsa-poseidon"

// 1. Derive private key from secret
const privateKey = deriveSecretScalar("my-secret-password")

// 2. Derive public key
const publicKey = derivePublicKey(privateKey)

// 3. Sign a message
const message = BigInt(123456)
const signature = signMessage(privateKey, message)

// 4. Verify signature
const isValid = verifySignature(message, signature, publicKey)
console.log(isValid) // true
```

### Signing Multiple Messages

```typescript
import { deriveSecretScalar, derivePublicKey, signMessage } from "@zk-kit/eddsa-poseidon"

const privateKey = deriveSecretScalar("secret")
const publicKey = derivePublicKey(privateKey)

// Sign multiple messages
const messages = [BigInt(1), BigInt(2), BigInt(3)]
const signatures = messages.map(msg => signMessage(privateKey, msg))

// Signatures can be verified independently
signatures.forEach((sig, i) => {
  const isValid = verifySignature(messages[i], sig, publicKey)
  console.log(`Message ${i}: ${isValid}`)
})
```

## API Reference

### Key Derivation

#### `deriveSecretScalar`

```typescript
deriveSecretScalar(secret: string | Uint8Array): bigint
```

Derives a private key (scalar) from a secret.

**Parameters:**

- `secret`: A string or byte array to derive from

**Returns:**

- `bigint`: The private key scalar

**Example:**

```typescript
import { deriveSecretScalar } from "@zk-kit/eddsa-poseidon"

const privateKey = deriveSecretScalar("my-password-123")
console.log(typeof privateKey) // "bigint"
```

#### `derivePublicKey`

```typescript
derivePublicKey(privateKey: bigint): Point
```

Derives a public key from a private key.

**Parameters:**

- `privateKey`: The private key scalar

**Returns:**

- `Point`: Public key as a point on Baby JubJub curve

**Example:**

```typescript
import { deriveSecretScalar, derivePublicKey } from "@zk-kit/eddsa-poseidon"

const privateKey = deriveSecretScalar("secret")
const publicKey = derivePublicKey(privateKey)

console.log(publicKey) // { x: bigint, y: bigint }
```

### Signing

#### `signMessage`

```typescript
signMessage(
  privateKey: bigint,
  message: bigint
): Signature
```

Signs a message with a private key.

**Parameters:**

- `privateKey`: The private key scalar
- `message`: The message to sign (as `bigint`)

**Returns:**

- `Signature`: Object containing signature data

**Example:**

```typescript
import { deriveSecretScalar, signMessage } from "@zk-kit/eddsa-poseidon"

const privateKey = deriveSecretScalar("secret")
const message = BigInt(123456)
const signature = signMessage(privateKey, message)

console.log(signature)
// { R8: Point, S: bigint }
```

### Verification

#### `verifySignature`

```typescript
verifySignature(
  message: bigint,
  signature: Signature,
  publicKey: Point
): boolean
```

Verifies a signature against a message and public key.

**Parameters:**

- `message`: The signed message
- `signature`: The signature to verify
- `publicKey`: The public key to verify against

**Returns:**

- `boolean`: `true` if signature is valid

**Example:**

```typescript
import {
  deriveSecretScalar,
  derivePublicKey,
  signMessage,
  verifySignature
} from "@zk-kit/eddsa-poseidon"

const privateKey = deriveSecretScalar("secret")
const publicKey = derivePublicKey(privateKey)
const message = BigInt(123)
const signature = signMessage(privateKey, message)

const isValid = verifySignature(message, signature, publicKey)
console.log(isValid) // true

// Invalid message
const isInvalid = verifySignature(BigInt(456), signature, publicKey)
console.log(isInvalid) // false
```

### Utility Functions

#### `packSignature`

```typescript
packSignature(signature: Signature): Buffer
```

Packs a signature into a compact binary format.

**Parameters:**

- `signature`: The signature to pack

**Returns:**

- `Buffer`: Packed signature (64 bytes)

**Example:**

```typescript
import { signMessage, packSignature } from "@zk-kit/eddsa-poseidon"

const signature = signMessage(privateKey, message)
const packed = packSignature(signature)

console.log(packed.length) // 64 bytes
```

#### `unpackSignature`

```typescript
unpackSignature(packed: Buffer): Signature
```

Unpacks a signature from binary format.

**Parameters:**

- `packed`: Packed signature buffer

**Returns:**

- `Signature`: Unpacked signature object

**Example:**

```typescript
import { packSignature, unpackSignature } from "@zk-kit/eddsa-poseidon"

const packed = packSignature(signature)
const unpacked = unpackSignature(packed)

console.log(unpacked) // { R8: Point, S: bigint }
```

## Advanced Usage

### Identity System

```typescript
import {
  deriveSecretScalar,
  derivePublicKey,
  signMessage,
  verifySignature
} from "@zk-kit/eddsa-poseidon"
import { poseidon1 } from "poseidon-lite"

class Identity {
  private privateKey: bigint
  public publicKey: Point
  public commitment: bigint
  
  constructor(secret: string) {
    this.privateKey = deriveSecretScalar(secret)
    this.publicKey = derivePublicKey(this.privateKey)
    
    // Create identity commitment
    this.commitment = poseidon1([
      this.publicKey.x,
      this.publicKey.y
    ])
  }
  
  sign(message: bigint) {
    return signMessage(this.privateKey, message)
  }
  
  static verify(message: bigint, signature: Signature, publicKey: Point): boolean {
    return verifySignature(message, signature, publicKey)
  }
}

// Usage
const alice = new Identity("alice-secret")
const message = BigInt(12345)
const signature = alice.sign(message)

const isValid = Identity.verify(message, signature, alice.publicKey)
console.log(isValid) // true
```

### Credential System

```typescript
import {
  deriveSecretScalar,
  derivePublicKey,
  signMessage,
  verifySignature
} from "@zk-kit/eddsa-poseidon"

interface Credential {
  userId: bigint
  attribute: bigint
  signature: Signature
}

class CredentialIssuer {
  private privateKey: bigint
  public publicKey: Point
  
  constructor(secret: string) {
    this.privateKey = deriveSecretScalar(secret)
    this.publicKey = derivePublicKey(this.privateKey)
  }
  
  issueCredential(userId: bigint, attribute: bigint): Credential {
    // Create credential hash
    const credentialHash = poseidon2([userId, attribute])
    
    // Sign credential
    const signature = signMessage(this.privateKey, credentialHash)
    
    return { userId, attribute, signature }
  }
}

class CredentialVerifier {
  constructor(private issuerPublicKey: Point) {}
  
  verifyCredential(credential: Credential): boolean {
    const credentialHash = poseidon2([
      credential.userId,
      credential.attribute
    ])
    
    return verifySignature(
      credentialHash,
      credential.signature,
      this.issuerPublicKey
    )
  }
}

// Usage
const issuer = new CredentialIssuer("issuer-secret")
const verifier = new CredentialVerifier(issuer.publicKey)

const credential = issuer.issueCredential(
  BigInt(123), // userId
  BigInt(18)   // age
)

const isValid = verifier.verifyCredential(credential)
console.log(isValid) // true
```

### Message Authentication

```typescript
import {
  deriveSecretScalar,
  derivePublicKey,
  signMessage,
  verifySignature
} from "@zk-kit/eddsa-poseidon"
import { poseidon } from "poseidon-lite"

function signData(privateKey: bigint, data: bigint[]): Signature {
  // Hash data
  const dataHash = poseidon(data)
  
  // Sign hash
  return signMessage(privateKey, dataHash)
}

function verifyData(
  publicKey: Point,
  data: bigint[],
  signature: Signature
): boolean {
  // Hash data
  const dataHash = poseidon(data)
  
  // Verify signature
  return verifySignature(dataHash, signature, publicKey)
}

// Usage
const privateKey = deriveSecretScalar("secret")
const publicKey = derivePublicKey(privateKey)

const data = [BigInt(1), BigInt(2), BigInt(3)]
const signature = signData(privateKey, data)

const isValid = verifyData(publicKey, data, signature)
console.log(isValid) // true
```

### Timestamped Signatures

```typescript
import {
  deriveSecretScalar,
  derivePublicKey,
  signMessage
} from "@zk-kit/eddsa-poseidon"
import { poseidon2 } from "poseidon-lite"

interface TimestampedSignature {
  message: bigint
  timestamp: bigint
  signature: Signature
}

function signWithTimestamp(
  privateKey: bigint,
  message: bigint
): TimestampedSignature {
  const timestamp = BigInt(Date.now())
  
  // Combine message and timestamp
  const combined = poseidon2([message, timestamp])
  
  // Sign combined value
  const signature = signMessage(privateKey, combined)
  
  return { message, timestamp, signature }
}

function verifyTimestampedSignature(
  publicKey: Point,
  signed: TimestampedSignature,
  maxAge: number // milliseconds
): boolean {
  // Check timestamp freshness
  const age = Date.now() - Number(signed.timestamp)
  if (age > maxAge) return false
  
  // Verify signature
  const combined = poseidon2([signed.message, signed.timestamp])
  return verifySignature(combined, signed.signature, publicKey)
}
```

## Types

### Signature

```typescript
interface Signature {
  R8: Point  // R point on curve
  S: bigint  // Scalar value
}
```

### Point

```typescript
interface Point {
  x: bigint
  y: bigint
}
```

## Security Considerations

### Private Key Management

```typescript
// ✅ Good: Derive from secure random source
import crypto from "crypto"

const randomBytes = crypto.randomBytes(32)
const privateKey = deriveSecretScalar(randomBytes)

// ❌ Bad: Predictable secrets
const weakKey = deriveSecretScalar("password123")
```

### Message Hashing

```typescript
import { signMessage } from "@zk-kit/eddsa-poseidon"
import { poseidon } from "poseidon-lite"

// ✅ Good: Hash complex data before signing
const data = [BigInt(1), BigInt(2), BigInt(3)]
const hash = poseidon(data)
const signature = signMessage(privateKey, hash)

// ⚠️ Caution: Direct signing of small values
const signature2 = signMessage(privateKey, BigInt(1))
```

## Performance Characteristics

| Operation | Time | Notes |
|-----------|------|-------|
| Derive Private Key | ~5ms | One-time operation |
| Derive Public Key | ~2ms | One-time operation |
| Sign Message | ~3-5ms | Per signature |
| Verify Signature | ~5-8ms | Per verification |
| Pack/Unpack | &lt;1ms | Binary operations |

## Dependencies

- `@zk-kit/baby-jubjub`: Elliptic curve operations
- `poseidon-lite`: Hash function
- `buffer`: For signature packing (Node.js built-in)

## TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import type {
  Signature,
  Point,
  SignatureOptions
} from "@zk-kit/eddsa-poseidon"
```

## Related Documentation

- [Baby JubJub Package](/docs/packages/javascript/baby-jubjub) - Underlying curve
- [Poseidon Cipher](/docs/packages/javascript/poseidon-cipher) - Encryption
- [Development Setup](/docs/getting-started/development-setup) - Setup guide

## Common Use Cases

- ✅ Digital signatures in ZK circuits
- ✅ Identity systems
- ✅ Credential issuance
- ✅ Message authentication
- ✅ Access control
- ✅ Non-repudiation proofs

## When to Use EdDSA-Poseidon

Use EdDSA-Poseidon when:
- Need signatures verifiable in ZK circuits
- Building identity/credential systems
- Need ZK-friendly cryptography
- Signatures will be proven in SNARKs

Use traditional ECDSA when:
- Not using zero-knowledge proofs
- Need compatibility with standard systems
- Don't need circuit efficiency

## Circuit Compatibility

This package is designed to work with corresponding Circom circuits:

```circom
template EdDSAPoseidonVerifier() {
    // Verifies EdDSA-Poseidon signatures
    // Compatible with this package
}
```

See [Circom Packages](/docs/packages/circom/overview) for circuit implementations.

## Source

- **GitHub**: [zk-kit/packages/eddsa-poseidon](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/eddsa-poseidon)
- **NPM**: [@zk-kit/eddsa-poseidon](https://www.npmjs.com/package/@zk-kit/eddsa-poseidon)
- **License**: MIT

## Community

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Examples](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/eddsa-poseidon/examples)

