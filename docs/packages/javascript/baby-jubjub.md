---
sidebar_position: 6
title: "@zk-kit/baby-jubjub"
---

# @zk-kit/baby-jubjub

Baby JubJub elliptic curve operations for zero-knowledge applications. This package provides low-level primitives for working with the Baby JubJub twisted Edwards curve, which is optimized for efficient verification in ZK circuits.

## Overview

Baby JubJub is an elliptic curve designed specifically for zero-knowledge proofs. It's:
- **ZK-friendly**: Efficient in zk-SNARK circuits
- **Twisted Edwards**: Fast group operations
- **Well-studied**: Based on Jubjub (Zcash) and Curve25519
- **Compatible**: Works with Poseidon hash and EdDSA

## Installation

```bash
npm install @zk-kit/baby-jubjub
```

## Quick Start

### Basic Point Operations

```typescript
import { Point } from "@zk-kit/baby-jubjub"

// Create a point from coordinates
const point = new Point(x, y)

// Point addition
const point2 = new Point(x2, y2)
const sum = point.add(point2)

// Point doubling
const doubled = point.double()

// Scalar multiplication
const scalar = BigInt(5)
const result = point.mulPointEscalar(scalar)
```

### Generating Keys

```typescript
import { Point } from "@zk-kit/baby-jubjub"

// Generate public key from private key
const privateKey = BigInt(12345)
const publicKey = Point.fromPrivateKey(privateKey)

console.log(publicKey) // Point { x: bigint, y: bigint }
```

## API Reference

### Point Class

#### Constructor

```typescript
new Point(x: bigint, y: bigint): Point
```

Creates a new point on the Baby JubJub curve.

**Parameters:**

- `x`: X-coordinate
- `y`: Y-coordinate

**Throws:**

- Error if point is not on the curve

**Example:**

```typescript
import { Point } from "@zk-kit/baby-jubjub"

const point = new Point(
  BigInt("1234..."),
  BigInt("5678...")
)

// Automatically validates the point is on the curve
```

#### Static: `fromPrivateKey`

```typescript
Point.fromPrivateKey(privateKey: bigint): Point
```

Generates a public key point from a private key.

**Parameters:**

- `privateKey`: The private key scalar

**Returns:**

- `Point`: The corresponding public key point

**Example:**

```typescript
import { Point } from "@zk-kit/baby-jubjub"

const privateKey = BigInt(999)
const publicKey = Point.fromPrivateKey(privateKey)

console.log(publicKey.x)
console.log(publicKey.y)
```

#### Static: `Base`

```typescript
Point.Base: Point
```

Returns the base (generator) point of Baby JubJub.

**Example:**

```typescript
import { Point } from "@zk-kit/baby-jubjub"

const generator = Point.Base
console.log(generator)
```

#### Static: `Zero`

```typescript
Point.Zero: Point
```

Returns the identity (zero) point.

**Example:**

```typescript
import { Point } from "@zk-kit/baby-jubjub"

const zero = Point.Zero

// Zero point is additive identity
const p = new Point(x, y)
const sum = p.add(zero)
// sum equals p
```

### Instance Methods

#### `add`

```typescript
point.add(other: Point): Point
```

Adds two points on the curve.

**Parameters:**

- `other`: Point to add

**Returns:**

- `Point`: Sum of the two points

**Example:**

```typescript
import { Point } from "@zk-kit/baby-jubjub"

const p1 = new Point(x1, y1)
const p2 = new Point(x2, y2)

const sum = p1.add(p2)
```

#### `double`

```typescript
point.double(): Point
```

Doubles a point (adds it to itself).

**Returns:**

- `Point`: The doubled point

**Example:**

```typescript
import { Point } from "@zk-kit/baby-jubjub"

const point = new Point(x, y)
const doubled = point.double()

// Equivalent to:
// const doubled = point.add(point)
```

#### `mulPointEscalar`

```typescript
point.mulPointEscalar(scalar: bigint): Point
```

Multiplies a point by a scalar (repeated addition).

**Parameters:**

- `scalar`: The scalar multiplier

**Returns:**

- `Point`: The resulting point

**Example:**

```typescript
import { Point } from "@zk-kit/baby-jubjub"

const point = new Point(x, y)
const scalar = BigInt(5)

// point * 5 = point + point + point + point + point
const result = point.mulPointEscalar(scalar)
```

#### `equals`

```typescript
point.equals(other: Point): boolean
```

Checks if two points are equal.

**Parameters:**

- `other`: Point to compare with

**Returns:**

- `boolean`: `true` if points are equal

**Example:**

```typescript
import { Point } from "@zk-kit/baby-jubjub"

const p1 = new Point(x, y)
const p2 = new Point(x, y)
const p3 = new Point(x2, y2)

console.log(p1.equals(p2)) // true
console.log(p1.equals(p3)) // false
```

#### `negate`

```typescript
point.negate(): Point
```

Returns the negation of a point.

**Returns:**

- `Point`: The negated point

**Example:**

```typescript
import { Point } from "@zk-kit/baby-jubjub"

const point = new Point(x, y)
const negated = point.negate()

// point + negated = Zero
const sum = point.add(negated)
console.log(sum.equals(Point.Zero)) // true
```

#### `isOnCurve`

```typescript
point.isOnCurve(): boolean
```

Verifies that the point lies on the Baby JubJub curve.

**Returns:**

- `boolean`: `true` if point is valid

**Example:**

```typescript
import { Point } from "@zk-kit/baby-jubjub"

const point = new Point(x, y)
console.log(point.isOnCurve()) // true or false
```

### Properties

#### `x`

```typescript
point.x: bigint
```

The x-coordinate of the point.

#### `y`

```typescript
point.y: bigint
```

The y-coordinate of the point.

## Advanced Usage

### Key Derivation

```typescript
import { Point } from "@zk-kit/baby-jubjub"
import { poseidon1 } from "poseidon-lite"

function deriveChildKey(parentKey: bigint, index: number): Point {
  // Derive child key deterministically
  const childScalar = poseidon1([parentKey, BigInt(index)])
  return Point.fromPrivateKey(childScalar)
}

// Master key
const masterKey = BigInt(12345)

// Derive child keys
const childKey1 = deriveChildKey(masterKey, 0)
const childKey2 = deriveChildKey(masterKey, 1)
const childKey3 = deriveChildKey(masterKey, 2)
```

### Pedersen Commitment

```typescript
import { Point } from "@zk-kit/baby-jubjub"

class PedersenCommitment {
  private G: Point  // First generator
  private H: Point  // Second generator
  
  constructor() {
    this.G = Point.Base
    // Derive H from G (in practice, use a nothing-up-my-sleeve method)
    this.H = Point.Base.mulPointEscalar(BigInt(2))
  }
  
  commit(value: bigint, blinding: bigint): Point {
    // Commitment = value * G + blinding * H
    const valuePoint = this.G.mulPointEscalar(value)
    const blindingPoint = this.H.mulPointEscalar(blinding)
    return valuePoint.add(blindingPoint)
  }
  
  verify(
    commitment: Point,
    value: bigint,
    blinding: bigint
  ): boolean {
    const computed = this.commit(value, blinding)
    return commitment.equals(computed)
  }
}

// Usage
const pedersen = new PedersenCommitment()

const value = BigInt(100)
const blinding = BigInt(999)

const commitment = pedersen.commit(value, blinding)
console.log(commitment)

// Verify
const isValid = pedersen.verify(commitment, value, blinding)
console.log(isValid) // true
```

### Multi-Signature Aggregation

```typescript
import { Point } from "@zk-kit/baby-jubjub"

function aggregatePublicKeys(publicKeys: Point[]): Point {
  // Aggregate multiple public keys into one
  return publicKeys.reduce((acc, pk) => acc.add(pk), Point.Zero)
}

// Multiple signers
const signer1PrivKey = BigInt(111)
const signer2PrivKey = BigInt(222)
const signer3PrivKey = BigInt(333)

const pubKey1 = Point.fromPrivateKey(signer1PrivKey)
const pubKey2 = Point.fromPrivateKey(signer2PrivKey)
const pubKey3 = Point.fromPrivateKey(signer3PrivKey)

// Aggregate public key
const aggregatedPubKey = aggregatePublicKeys([pubKey1, pubKey2, pubKey3])

console.log(aggregatedPubKey)
```

### Elliptic Curve Diffie-Hellman (ECDH)

```typescript
import { Point } from "@zk-kit/baby-jubjub"
import { poseidon2 } from "poseidon-lite"

class ECDH {
  private privateKey: bigint
  public publicKey: Point
  
  constructor(privateKey: bigint) {
    this.privateKey = privateKey
    this.publicKey = Point.fromPrivateKey(privateKey)
  }
  
  deriveSharedSecret(otherPublicKey: Point): bigint {
    // Shared secret = myPrivateKey * theirPublicKey
    const sharedPoint = otherPublicKey.mulPointEscalar(this.privateKey)
    
    // Hash the shared point to get a key
    return poseidon2([sharedPoint.x, sharedPoint.y])
  }
}

// Alice and Bob
const alice = new ECDH(BigInt(111))
const bob = new ECDH(BigInt(222))

// Exchange public keys (can be done openly)
const aliceSharedSecret = alice.deriveSharedSecret(bob.publicKey)
const bobSharedSecret = bob.deriveSharedSecret(alice.publicKey)

// Both derive the same shared secret
console.log(aliceSharedSecret === bobSharedSecret) // true
```

### Point Verification

```typescript
import { Point } from "@zk-kit/baby-jubjub"

function isValidPublicKey(point: Point): boolean {
  // Check if point is on curve
  if (!point.isOnCurve()) return false
  
  // Check if point is not zero
  if (point.equals(Point.Zero)) return false
  
  // Check if point is in correct subgroup
  // (multiply by subgroup order - should equal zero)
  const order = BigInt("21888242871839275222246405745257275088614511777268538073601725287587578984328")
  const result = point.mulPointEscalar(order)
  
  return result.equals(Point.Zero)
}

// Usage
const publicKey = Point.fromPrivateKey(BigInt(123))
console.log(isValidPublicKey(publicKey)) // true
```

## Curve Parameters

Baby JubJub is defined by the twisted Edwards equation:

```
ax² + y² = 1 + dx²y²
```

Where:
- `a = 168700`
- `d = 168696`
- `Prime field: 21888242871839275222246405745257275088548364400416034343698204186575808495617`
- `Subgroup order: 2736030358979909402780800718157159386076813972158567259200215660948447373041`

## Performance Characteristics

| Operation | Time | Notes |
|-----------|------|-------|
| Point Addition | ~0.5ms | Fast group operation |
| Point Doubling | ~0.3ms | Optimized |
| Scalar Multiplication | ~50ms | Depends on scalar size |
| Key Generation | ~50ms | One-time operation |
| Verification | ~0.1ms | Point validation |

## Security Considerations

### Private Key Security

```typescript
// ✅ Good: Use cryptographically secure random
import crypto from "crypto"

const privateKey = BigInt('0x' + crypto.randomBytes(32).toString('hex'))
const publicKey = Point.fromPrivateKey(privateKey)

// ❌ Bad: Predictable private key
const weakKey = BigInt(123)
```

### Point Validation

```typescript
import { Point } from "@zk-kit/baby-jubjub"

// ✅ Always validate points from untrusted sources
function processPublicKey(x: bigint, y: bigint): Point | null {
  try {
    const point = new Point(x, y)
    
    if (!point.isOnCurve()) {
      return null // Invalid point
    }
    
    return point
  } catch (error) {
    return null // Invalid point
  }
}
```

## Dependencies

None - this is a standalone package with no external dependencies.

## TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import type { Point } from "@zk-kit/baby-jubjub"
```

## Related Documentation

- [EdDSA-Poseidon](/docs/packages/javascript/eddsa-poseidon) - Uses Baby JubJub for signatures
- [Poseidon Cipher](/docs/packages/javascript/poseidon-cipher) - For encryption
- [Utils](/docs/packages/javascript/utils) - Field arithmetic utilities

## Common Use Cases

- ✅ Public key cryptography
- ✅ EdDSA signatures
- ✅ Pedersen commitments
- ✅ Key derivation
- ✅ Elliptic curve Diffie-Hellman
- ✅ Multi-signature schemes
- ✅ Zero-knowledge protocols

## When to Use Baby JubJub

Use Baby JubJub when:
- Building ZK-friendly cryptography
- Need efficient curve operations in circuits
- Implementing EdDSA or ECDH
- Working with Poseidon hash

Use Curve25519/Ed25519 when:
- Not using zero-knowledge proofs
- Need maximum performance outside circuits
- Need standard library support

## Circuit Compatibility

Baby JubJub is designed to work efficiently in zk-SNARK circuits:

```circom
template BabyJubJubAdd() {
    // Efficient point addition in circuit
}
```

See [Circom Packages](/docs/packages/circom/overview) for circuit implementations.

## Source

- **GitHub**: [zk-kit/packages/baby-jubjub](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/baby-jubjub)
- **NPM**: [@zk-kit/baby-jubjub](https://www.npmjs.com/package/@zk-kit/baby-jubjub)
- **License**: MIT

## References

- [Baby JubJub Specification](https://iden3-docs.readthedocs.io/en/latest/iden3_repos/research/publications/zkproof-standards-workshop-2/baby-jubjub/baby-jubjub.html)
- [Twisted Edwards Curves](https://en.wikipedia.org/wiki/Twisted_Edwards_curve)

## Community

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Examples](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/baby-jubjub/examples)

