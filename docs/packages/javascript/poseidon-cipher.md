---
sidebar_position: 5
title: "@zk-kit/poseidon-cipher"
---

# @zk-kit/poseidon-cipher

Poseidon-based encryption and decryption for zero-knowledge applications. This package provides ZK-friendly encryption that can be efficiently verified in circuits.

## Overview

Poseidon Cipher uses the Poseidon hash function to implement a stream cipher, making it:
- **ZK-friendly**: Can be efficiently verified in ZK circuits
- **Deterministic**: Same key + nonce always produces same ciphertext
- **Lightweight**: Minimal overhead for ZK applications
- **Secure**: Based on the cryptographically secure Poseidon hash

## Installation

```bash
npm install @zk-kit/poseidon-cipher
```

**Peer Dependencies:**

```bash
npm install poseidon-lite
```

## Quick Start

### Basic Encryption and Decryption

```typescript
import { poseidonEncrypt, poseidonDecrypt } from "@zk-kit/poseidon-cipher"

// Prepare data
const plaintext = [BigInt(123), BigInt(456), BigInt(789)]
const key = BigInt(999)
const nonce = BigInt(0)

// Encrypt
const ciphertext = poseidonEncrypt(plaintext, key, nonce)
console.log(ciphertext) // [encrypted values...]

// Decrypt
const decrypted = poseidonDecrypt(ciphertext, key, nonce, plaintext.length)
console.log(decrypted) // [123n, 456n, 789n]
```

### Encrypting Messages

```typescript
import { poseidonEncrypt, poseidonDecrypt } from "@zk-kit/poseidon-cipher"

// Convert string to bigints
function stringToInts(str: string): bigint[] {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)
  return Array.from(bytes, b => BigInt(b))
}

function intsToString(ints: bigint[]): string {
  const bytes = new Uint8Array(ints.map(n => Number(n)))
  const decoder = new TextDecoder()
  return decoder.decode(bytes)
}

// Encrypt a message
const message = "Hello, ZK!"
const messageInts = stringToInts(message)
const key = BigInt(12345)
const nonce = BigInt(1)

const encrypted = poseidonEncrypt(messageInts, key, nonce)

// Decrypt
const decryptedInts = poseidonDecrypt(encrypted, key, nonce, messageInts.length)
const decryptedMessage = intsToString(decryptedInts)

console.log(decryptedMessage) // "Hello, ZK!"
```

## API Reference

### Encryption

#### `poseidonEncrypt`

```typescript
poseidonEncrypt(
  plaintext: bigint[],
  key: bigint,
  nonce: bigint
): bigint[]
```

Encrypts an array of values using Poseidon cipher.

**Parameters:**

- `plaintext`: Array of values to encrypt
- `key`: Encryption key
- `nonce`: Number used once (must be unique for each encryption with same key)

**Returns:**

- `bigint[]`: Encrypted values (same length as plaintext)

**Example:**

```typescript
import { poseidonEncrypt } from "@zk-kit/poseidon-cipher"

const plaintext = [BigInt(1), BigInt(2), BigInt(3)]
const key = BigInt(999)
const nonce = BigInt(0)

const ciphertext = poseidonEncrypt(plaintext, key, nonce)
console.log(ciphertext.length) // 3
```

### Decryption

#### `poseidonDecrypt`

```typescript
poseidonDecrypt(
  ciphertext: bigint[],
  key: bigint,
  nonce: bigint,
  length: number
): bigint[]
```

Decrypts ciphertext encrypted with `poseidonEncrypt`.

**Parameters:**

- `ciphertext`: Encrypted values
- `key`: Same key used for encryption
- `nonce`: Same nonce used for encryption
- `length`: Expected length of plaintext

**Returns:**

- `bigint[]`: Decrypted values

**Example:**

```typescript
import { poseidonEncrypt, poseidonDecrypt } from "@zk-kit/poseidon-cipher"

const key = BigInt(999)
const nonce = BigInt(0)
const plaintext = [BigInt(1), BigInt(2), BigInt(3)]

const ciphertext = poseidonEncrypt(plaintext, key, nonce)
const decrypted = poseidonDecrypt(ciphertext, key, nonce, plaintext.length)

console.log(decrypted) // [1n, 2n, 3n]
```

## Advanced Usage

### Encrypted Messaging System

```typescript
import { poseidonEncrypt, poseidonDecrypt } from "@zk-kit/poseidon-cipher"
import { deriveSecretScalar } from "@zk-kit/eddsa-poseidon"
import { poseidon2 } from "poseidon-lite"

class EncryptedMessaging {
  private key: bigint
  private nonceCounter: bigint = BigInt(0)
  
  constructor(password: string) {
    // Derive encryption key from password
    this.key = deriveSecretScalar(password)
  }
  
  encrypt(data: bigint[]): { ciphertext: bigint[], nonce: bigint } {
    const nonce = this.nonceCounter++
    const ciphertext = poseidonEncrypt(data, this.key, nonce)
    return { ciphertext, nonce }
  }
  
  decrypt(ciphertext: bigint[], nonce: bigint, length: number): bigint[] {
    return poseidonDecrypt(ciphertext, this.key, nonce, length)
  }
}

// Usage
const alice = new EncryptedMessaging("alice-password")
const bob = new EncryptedMessaging("bob-password")

// Alice encrypts a message
const message = [BigInt(1), BigInt(2), BigInt(3)]
const { ciphertext, nonce } = alice.encrypt(message)

// Bob can't decrypt with different key
// const failed = bob.decrypt(ciphertext, nonce, message.length)

// Alice can decrypt her own message
const decrypted = alice.decrypt(ciphertext, nonce, message.length)
console.log(decrypted) // [1n, 2n, 3n]
```

### Private Data Storage

```typescript
import { poseidonEncrypt, poseidonDecrypt } from "@zk-kit/poseidon-cipher"
import { poseidon1 } from "poseidon-lite"

interface EncryptedRecord {
  id: bigint
  ciphertext: bigint[]
  nonce: bigint
  length: number
}

class PrivateDataStore {
  private records: Map<bigint, EncryptedRecord> = new Map()
  private key: bigint
  
  constructor(key: bigint) {
    this.key = key
  }
  
  store(id: bigint, data: bigint[]): void {
    // Use ID as nonce (must be unique)
    const nonce = poseidon1([id])
    const ciphertext = poseidonEncrypt(data, this.key, nonce)
    
    this.records.set(id, {
      id,
      ciphertext,
      nonce,
      length: data.length
    })
  }
  
  retrieve(id: bigint): bigint[] | undefined {
    const record = this.records.get(id)
    if (!record) return undefined
    
    return poseidonDecrypt(
      record.ciphertext,
      this.key,
      record.nonce,
      record.length
    )
  }
}

// Usage
const store = new PrivateDataStore(BigInt(12345))

// Store encrypted data
store.store(BigInt(1), [BigInt(100), BigInt(200)])
store.store(BigInt(2), [BigInt(300), BigInt(400)])

// Retrieve and decrypt
const data = store.retrieve(BigInt(1))
console.log(data) // [100n, 200n]
```

### Shared Secret Encryption

```typescript
import { poseidonEncrypt, poseidonDecrypt } from "@zk-kit/poseidon-cipher"
import { deriveSecretScalar, derivePublicKey } from "@zk-kit/eddsa-poseidon"
import { poseidon2 } from "poseidon-lite"

function deriveSharedSecret(myPrivateKey: bigint, theirPublicKey: Point): bigint {
  // Simplified ECDH-like shared secret
  // In production, use proper ECDH
  return poseidon2([myPrivateKey, theirPublicKey.x, theirPublicKey.y])
}

// Alice and Bob generate keys
const alicePrivate = deriveSecretScalar("alice-secret")
const alicePublic = derivePublicKey(alicePrivate)

const bobPrivate = deriveSecretScalar("bob-secret")
const bobPublic = derivePublicKey(bobPrivate)

// Alice derives shared secret with Bob's public key
const aliceSharedSecret = deriveSharedSecret(alicePrivate, bobPublic)

// Bob derives the same shared secret with Alice's public key
const bobSharedSecret = deriveSharedSecret(bobPrivate, alicePublic)

// They now have the same shared secret
console.log(aliceSharedSecret === bobSharedSecret) // true

// Alice encrypts a message for Bob
const message = [BigInt(1), BigInt(2), BigInt(3)]
const nonce = BigInt(0)
const encrypted = poseidonEncrypt(message, aliceSharedSecret, nonce)

// Bob decrypts the message
const decrypted = poseidonDecrypt(encrypted, bobSharedSecret, nonce, message.length)
console.log(decrypted) // [1n, 2n, 3n]
```

### Encrypted State Updates

```typescript
import { poseidonEncrypt, poseidonDecrypt } from "@zk-kit/poseidon-cipher"

interface EncryptedState<T> {
  encrypted: bigint[]
  nonce: bigint
  version: number
}

class EncryptedStateManager<T> {
  private key: bigint
  private version: number = 0
  
  constructor(key: bigint) {
    this.key = key
  }
  
  encrypt(state: bigint[]): EncryptedState<T> {
    const nonce = BigInt(this.version++)
    const encrypted = poseidonEncrypt(state, this.key, nonce)
    
    return {
      encrypted,
      nonce,
      version: Number(nonce)
    }
  }
  
  decrypt(encryptedState: EncryptedState<T>, length: number): bigint[] {
    return poseidonDecrypt(
      encryptedState.encrypted,
      this.key,
      encryptedState.nonce,
      length
    )
  }
}

// Usage
const stateManager = new EncryptedStateManager<number[]>(BigInt(999))

// Encrypt initial state
const state1 = [BigInt(10), BigInt(20)]
const encrypted1 = stateManager.encrypt(state1)

// Update state
const state2 = [BigInt(30), BigInt(40)]
const encrypted2 = stateManager.encrypt(state2)

// Decrypt any version
const decrypted1 = stateManager.decrypt(encrypted1, 2)
console.log(decrypted1) // [10n, 20n]

const decrypted2 = stateManager.decrypt(encrypted2, 2)
console.log(decrypted2) // [30n, 40n]
```

### Chunked Encryption for Large Data

```typescript
import { poseidonEncrypt, poseidonDecrypt } from "@zk-kit/poseidon-cipher"

const CHUNK_SIZE = 10

function encryptLarge(
  data: bigint[],
  key: bigint,
  baseNonce: bigint
): bigint[][] {
  const chunks: bigint[][] = []
  
  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    const chunk = data.slice(i, i + CHUNK_SIZE)
    const chunkNonce = baseNonce + BigInt(i / CHUNK_SIZE)
    const encrypted = poseidonEncrypt(chunk, key, chunkNonce)
    chunks.push(encrypted)
  }
  
  return chunks
}

function decryptLarge(
  chunks: bigint[][],
  key: bigint,
  baseNonce: bigint,
  totalLength: number
): bigint[] {
  const result: bigint[] = []
  
  for (let i = 0; i < chunks.length; i++) {
    const chunkNonce = baseNonce + BigInt(i)
    const chunkLength = Math.min(CHUNK_SIZE, totalLength - result.length)
    const decrypted = poseidonDecrypt(chunks[i], key, chunkNonce, chunkLength)
    result.push(...decrypted)
  }
  
  return result
}

// Usage
const largeData = Array.from({ length: 100 }, (_, i) => BigInt(i))
const key = BigInt(12345)
const nonce = BigInt(0)

const encrypted = encryptLarge(largeData, key, nonce)
console.log(`${encrypted.length} chunks`)

const decrypted = decryptLarge(encrypted, key, nonce, largeData.length)
console.log(decrypted.length) // 100
```

## Security Considerations

### Nonce Reuse

```typescript
// ❌ DANGEROUS: Reusing nonce with same key
const key = BigInt(999)
const nonce = BigInt(0)

const msg1 = [BigInt(1)]
const msg2 = [BigInt(2)]

const enc1 = poseidonEncrypt(msg1, key, nonce)
const enc2 = poseidonEncrypt(msg2, key, nonce) // SAME NONCE!

// This leaks information about the plaintexts!

// ✅ SAFE: Unique nonce for each encryption
const enc1_safe = poseidonEncrypt(msg1, key, BigInt(0))
const enc2_safe = poseidonEncrypt(msg2, key, BigInt(1))
```

### Key Management

```typescript
import { deriveSecretScalar } from "@zk-kit/eddsa-poseidon"
import crypto from "crypto"

// ✅ Good: Strong key derivation
const strongKey = deriveSecretScalar(crypto.randomBytes(32))

// ❌ Bad: Weak key
const weakKey = BigInt(123)
```

### Nonce Generation

```typescript
// ✅ Good: Sequential counter
let nonce = BigInt(0)
const enc1 = poseidonEncrypt(msg, key, nonce++)
const enc2 = poseidonEncrypt(msg, key, nonce++)

// ✅ Good: Random (ensure no collisions)
import crypto from "crypto"
const randomNonce = BigInt('0x' + crypto.randomBytes(32).toString('hex'))

// ✅ Good: Hash-based deterministic
import { poseidon1 } from "poseidon-lite"
const deterministicNonce = poseidon1([messageId, timestamp])
```

## Performance Characteristics

| Operation | Time (per element) | Notes |
|-----------|-------------------|-------|
| Encrypt | ~2ms | Using Poseidon |
| Decrypt | ~2ms | Same as encrypt |
| Key Derivation | ~5ms | One-time operation |

## Limitations

- **Not authenticated**: No built-in authentication (use with EdDSA for authenticity)
- **Deterministic**: Same plaintext + key + nonce = same ciphertext
- **Stream cipher**: Encrypts each element independently
- **No padding**: Ciphertext length = plaintext length

## Dependencies

- `poseidon-lite`: For Poseidon hash function

## TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import type { PoseidonCipher } from "@zk-kit/poseidon-cipher"
```

## Related Documentation

- [EdDSA-Poseidon](/docs/packages/javascript/eddsa-poseidon) - For message authentication
- [Utils](/docs/packages/javascript/utils) - For field operations
- [Development Setup](/docs/getting-started/development-setup) - Setup guide

## Common Use Cases

- ✅ Encrypted messaging
- ✅ Private data storage
- ✅ Encrypted state management
- ✅ Confidential transactions
- ✅ Privacy-preserving applications
- ✅ ZK-friendly encryption

## When to Use Poseidon Cipher

Use Poseidon Cipher when:
- Need ZK-friendly encryption
- Data will be used in ZK circuits
- Building privacy-preserving apps
- Need deterministic encryption

Use AES when:
- Not using zero-knowledge proofs
- Need standard encryption
- Performance is critical (non-ZK)

## Circuit Compatibility

Compatible with Circom circuits for encrypted proofs:

```circom
template PoseidonDecrypt() {
    // Decrypts in-circuit
    // Compatible with this package
}
```

See [Circom Packages](/docs/packages/circom/overview) for circuit implementations.

## Best Practices

1. **Never reuse nonces** with the same key
2. **Use strong keys** (derived from secure random)
3. **Consider authentication** (combine with EdDSA signatures)
4. **Store nonces** with ciphertext for decryption
5. **Use unique nonces** (counter, random, or hash-based)

## Source

- **GitHub**: [zk-kit/packages/poseidon-cipher](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/poseidon-cipher)
- **NPM**: [@zk-kit/poseidon-cipher](https://www.npmjs.com/package/@zk-kit/poseidon-cipher)
- **License**: MIT

## Community

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Examples](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/poseidon-cipher/examples)

