---
sidebar_position: 7
title: "@zk-kit/utils"
---

# @zk-kit/utils

Utility functions for zero-knowledge applications including field arithmetic, conversions, and helper functions.

## Overview

This package provides essential utilities for working with zero-knowledge proofs:
- **Field arithmetic**: Operations in finite fields
- **Conversions**: Between different number formats
- **Validators**: Check values and formats
- **Helpers**: Common ZK operations

## Installation

```bash
npm install @zk-kit/utils
```

## Quick Start

### Field Arithmetic

```typescript
import { F1Field } from "@zk-kit/utils"

// Baby JubJub prime field
const BABYJUBJUB_PRIME = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617")

const field = new F1Field(BABYJUBJUB_PRIME)

// Field operations
const a = BigInt(100)
const b = BigInt(200)

const sum = field.add(a, b)
const product = field.mul(a, b)
const inverse = field.inv(a)
const power = field.pow(a, BigInt(3))

console.log(sum)     // 300n
console.log(product) // 20000n
```

### Number Conversions

```typescript
import {
  bigintToUint8Array,
  uint8ArrayToBigInt,
  bigintToHex,
  hexToBigint
} from "@zk-kit/utils"

// BigInt to Uint8Array
const num = BigInt(12345)
const bytes = bigintToUint8Array(num)
console.log(bytes) // Uint8Array

// Uint8Array to BigInt
const recovered = uint8ArrayToBigInt(bytes)
console.log(recovered) // 12345n

// BigInt to hex
const hex = bigintToHex(num)
console.log(hex) // "0x3039"

// Hex to BigInt
const fromHex = hexToBigint("0x3039")
console.log(fromHex) // 12345n
```

## API Reference

### F1Field Class

Finite field arithmetic operations.

#### Constructor

```typescript
new F1Field(order: bigint): F1Field
```

Creates a finite field with the given order (prime).

**Parameters:**

- `order`: The prime modulus of the field

**Example:**

```typescript
import { F1Field } from "@zk-kit/utils"

const PRIME = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617")
const field = new F1Field(PRIME)
```

#### Properties

##### `order`

```typescript
field.order: bigint
```

Returns the order (prime) of the field.

##### `zero`

```typescript
field.zero: bigint
```

Returns the additive identity (0).

##### `one`

```typescript
field.one: bigint
```

Returns the multiplicative identity (1).

#### Methods

##### `add`

```typescript
field.add(a: bigint, b: bigint): bigint
```

Adds two field elements.

**Parameters:**

- `a`: First element
- `b`: Second element

**Returns:**

- `bigint`: (a + b) mod order

**Example:**

```typescript
const sum = field.add(BigInt(5), BigInt(10))
console.log(sum) // 15n
```

##### `sub`

```typescript
field.sub(a: bigint, b: bigint): bigint
```

Subtracts two field elements.

**Returns:**

- `bigint`: (a - b) mod order

**Example:**

```typescript
const diff = field.sub(BigInt(10), BigInt(5))
console.log(diff) // 5n
```

##### `mul`

```typescript
field.mul(a: bigint, b: bigint): bigint
```

Multiplies two field elements.

**Returns:**

- `bigint`: (a * b) mod order

**Example:**

```typescript
const product = field.mul(BigInt(5), BigInt(10))
console.log(product) // 50n
```

##### `div`

```typescript
field.div(a: bigint, b: bigint): bigint
```

Divides two field elements (a * b⁻¹).

**Returns:**

- `bigint`: (a / b) mod order

**Example:**

```typescript
const quotient = field.div(BigInt(10), BigInt(5))
console.log(quotient) // 2n
```

##### `neg`

```typescript
field.neg(a: bigint): bigint
```

Negates a field element.

**Returns:**

- `bigint`: -a mod order

**Example:**

```typescript
const negated = field.neg(BigInt(5))
console.log(field.add(BigInt(5), negated)) // 0n
```

##### `inv`

```typescript
field.inv(a: bigint): bigint
```

Computes the multiplicative inverse.

**Returns:**

- `bigint`: a⁻¹ mod order

**Example:**

```typescript
const a = BigInt(5)
const inverse = field.inv(a)
console.log(field.mul(a, inverse)) // 1n
```

##### `pow`

```typescript
field.pow(base: bigint, exponent: bigint): bigint
```

Raises a field element to a power.

**Returns:**

- `bigint`: base^exponent mod order

**Example:**

```typescript
const result = field.pow(BigInt(2), BigInt(10))
console.log(result) // 1024n
```

##### `sqrt`

```typescript
field.sqrt(a: bigint): bigint | null
```

Computes the square root if it exists.

**Returns:**

- `bigint | null`: Square root or null if none exists

**Example:**

```typescript
const a = BigInt(4)
const sqrt = field.sqrt(a)
console.log(sqrt) // 2n or field.sub(order, 2n)
```

##### `isZero`

```typescript
field.isZero(a: bigint): boolean
```

Checks if a value is zero in the field.

**Returns:**

- `boolean`: `true` if a equals 0

**Example:**

```typescript
console.log(field.isZero(BigInt(0))) // true
console.log(field.isZero(field.order)) // true (wraps to 0)
```

##### `equals`

```typescript
field.equals(a: bigint, b: bigint): boolean
```

Checks if two field elements are equal.

**Returns:**

- `boolean`: `true` if a equals b (mod order)

**Example:**

```typescript
const a = BigInt(5)
const b = field.add(BigInt(5), field.order)
console.log(field.equals(a, b)) // true (equivalent in field)
```

##### `normalize`

```typescript
field.normalize(a: bigint): bigint
```

Normalizes a value to the range [0, order).

**Returns:**

- `bigint`: a mod order

**Example:**

```typescript
const normalized = field.normalize(BigInt(-5))
console.log(normalized) // order - 5n
```

### Conversion Functions

#### `bigintToUint8Array`

```typescript
bigintToUint8Array(
  value: bigint,
  length?: number
): Uint8Array
```

Converts a BigInt to a Uint8Array.

**Parameters:**

- `value`: The BigInt to convert
- `length`: Optional fixed length (pads with zeros)

**Returns:**

- `Uint8Array`: Byte representation

**Example:**

```typescript
import { bigintToUint8Array } from "@zk-kit/utils"

const bytes = bigintToUint8Array(BigInt(255))
console.log(bytes) // Uint8Array[255]

const fixed = bigintToUint8Array(BigInt(255), 32)
console.log(fixed.length) // 32
```

#### `uint8ArrayToBigInt`

```typescript
uint8ArrayToBigInt(bytes: Uint8Array): bigint
```

Converts a Uint8Array to a BigInt.

**Parameters:**

- `bytes`: The byte array to convert

**Returns:**

- `bigint`: The resulting number

**Example:**

```typescript
import { uint8ArrayToBigInt } from "@zk-kit/utils"

const bytes = new Uint8Array([0, 255])
const num = uint8ArrayToBigInt(bytes)
console.log(num) // 255n
```

#### `bigintToHex`

```typescript
bigintToHex(value: bigint, length?: number): string
```

Converts a BigInt to a hexadecimal string.

**Parameters:**

- `value`: The BigInt to convert
- `length`: Optional fixed length (pads with zeros)

**Returns:**

- `string`: Hex string with "0x" prefix

**Example:**

```typescript
import { bigintToHex } from "@zk-kit/utils"

const hex = bigintToHex(BigInt(255))
console.log(hex) // "0xff"

const fixed = bigintToHex(BigInt(255), 8)
console.log(fixed) // "0x000000ff"
```

#### `hexToBigint`

```typescript
hexToBigint(hex: string): bigint
```

Converts a hexadecimal string to a BigInt.

**Parameters:**

- `hex`: Hex string (with or without "0x" prefix)

**Returns:**

- `bigint`: The resulting number

**Example:**

```typescript
import { hexToBigint } from "@zk-kit/utils"

const num = hexToBigint("0xff")
console.log(num) // 255n

const num2 = hexToBigint("ff")
console.log(num2) // 255n
```

#### `bufferToBigInt`

```typescript
bufferToBigInt(buffer: Buffer): bigint
```

Converts a Buffer to a BigInt.

**Parameters:**

- `buffer`: The buffer to convert

**Returns:**

- `bigint`: The resulting number

**Example:**

```typescript
import { bufferToBigInt } from "@zk-kit/utils"

const buffer = Buffer.from([0, 255])
const num = bufferToBigInt(buffer)
console.log(num) // 255n
```

#### `bigintToBuffer`

```typescript
bigintToBuffer(value: bigint, length?: number): Buffer
```

Converts a BigInt to a Buffer.

**Parameters:**

- `value`: The BigInt to convert
- `length`: Optional fixed length

**Returns:**

- `Buffer`: Buffer representation

**Example:**

```typescript
import { bigintToBuffer } from "@zk-kit/utils"

const buffer = bigintToBuffer(BigInt(255))
console.log(buffer) // <Buffer ff>
```

### Validation Functions

#### `requireBigInt`

```typescript
requireBigInt(value: any, name?: string): bigint
```

Validates and returns a BigInt, throws on invalid input.

**Parameters:**

- `value`: Value to validate
- `name`: Optional parameter name for error message

**Returns:**

- `bigint`: The validated BigInt

**Throws:**

- TypeError if not a BigInt

**Example:**

```typescript
import { requireBigInt } from "@zk-kit/utils"

const valid = requireBigInt(BigInt(123), "myValue")
console.log(valid) // 123n

// Throws: TypeError: myValue must be a BigInt
// requireBigInt("123", "myValue")
```

#### `requireArray`

```typescript
requireArray(value: any, name?: string): any[]
```

Validates that a value is an array.

**Parameters:**

- `value`: Value to validate
- `name`: Optional parameter name

**Returns:**

- `any[]`: The validated array

**Throws:**

- TypeError if not an array

**Example:**

```typescript
import { requireArray } from "@zk-kit/utils"

const valid = requireArray([1, 2, 3], "myArray")
console.log(valid) // [1, 2, 3]

// Throws: TypeError
// requireArray("not array", "myArray")
```

## Advanced Usage

### Custom Field Operations

```typescript
import { F1Field } from "@zk-kit/utils"

// Create field for BN254 curve
const BN254_PRIME = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617")
const field = new F1Field(BN254_PRIME)

function lagrangeInterpolation(
  points: Array<[bigint, bigint]>
): bigint[] {
  const n = points.length
  const result: bigint[] = []
  
  for (let i = 0; i < n; i++) {
    let numerator = field.one
    let denominator = field.one
    
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        numerator = field.mul(numerator, points[j][0])
        denominator = field.mul(
          denominator,
          field.sub(points[j][0], points[i][0])
        )
      }
    }
    
    const coefficient = field.div(numerator, denominator)
    result.push(field.mul(coefficient, points[i][1]))
  }
  
  return result
}
```

### Batch Conversions

```typescript
import { bigintToUint8Array, uint8ArrayToBigInt } from "@zk-kit/utils"

function serializeArray(values: bigint[]): Uint8Array {
  // Convert array of BigInts to single Uint8Array
  const chunks = values.map(v => bigintToUint8Array(v, 32))
  
  const result = new Uint8Array(chunks.length * 32)
  chunks.forEach((chunk, i) => {
    result.set(chunk, i * 32)
  })
  
  return result
}

function deserializeArray(data: Uint8Array): bigint[] {
  // Convert Uint8Array back to array of BigInts
  const result: bigint[] = []
  
  for (let i = 0; i < data.length; i += 32) {
    const chunk = data.slice(i, i + 32)
    result.push(uint8ArrayToBigInt(chunk))
  }
  
  return result
}
```

## Constants

### Common Field Primes

```typescript
import { F1Field } from "@zk-kit/utils"

// Baby JubJub / BN254
export const BN254_PRIME = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617")

// Subgroup order
export const BABYJUBJUB_ORDER = BigInt("2736030358979909402780800718157159386076813972158567259200215660948447373041")

const field = new F1Field(BN254_PRIME)
```

## Performance Tips

1. **Reuse field instances**: Create once, use many times
2. **Batch operations**: Group multiple operations together
3. **Pre-compute constants**: Calculate once, store result
4. **Use native BigInt**: Faster than string conversion

## Dependencies

None - this is a standalone package.

## TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import type { F1Field } from "@zk-kit/utils"
```

## Related Documentation

- [Baby JubJub](/docs/packages/javascript/baby-jubjub) - Uses field arithmetic
- [EdDSA-Poseidon](/docs/packages/javascript/eddsa-poseidon) - Uses conversions
- [Core Concepts](/docs/core-concepts/zero-knowledge-basics) - ZK fundamentals

## Common Use Cases

- ✅ Field arithmetic in finite fields
- ✅ Number format conversions
- ✅ Data serialization/deserialization
- ✅ Cryptographic operations
- ✅ Circuit input preparation
- ✅ Value validation

## Source

- **GitHub**: [zk-kit/packages/utils](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/utils)
- **NPM**: [@zk-kit/utils](https://www.npmjs.com/package/@zk-kit/utils)
- **License**: MIT

## Community

- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- 📚 [Examples](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/utils/examples)



