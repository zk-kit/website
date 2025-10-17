---
sidebar_position: 7
title: poseidon-proof
---

# @zk-kit/poseidon-proof

Library to generate and verify Poseidon proofs.

## Overview

The `@zk-kit/poseidon-proof` package allows you to prove possession of pre-images without revealing them, with integration for Semaphore V4. It includes nullifier generation to prevent double-usage and supports 1-16 inputs.

:::caution Warning
Currently uses insecure trusted setup and has not been audited. Not recommended for production use.
:::

## Features

- Prove possession of pre-images without revealing them
- Integration with Semaphore V4
- Nullifier generation to prevent double-usage
- Supports 1-16 inputs

## Installation

```bash
npm install @zk-kit/poseidon-proof
```

## Basic Usage

```typescript
import { generate, verify } from "@zk-kit/poseidon-proof"

const scope = "scope"
const messages = [1, 2]

// Generate proof
const fullProof = await generate(messages, scope)
// { scope, digest, nullifier, proof }

// Verify proof
const isValid = await verify(fullProof)
console.log(isValid) // true
```

## API

### `generate(messages, scope)`

Generates a Poseidon proof for the given messages and scope.

**Parameters:**
- `messages`: Array of 1-16 numbers to prove
- `scope`: String identifier for the proof scope

**Returns:** Object containing `scope`, `digest`, `nullifier`, and `proof`

### `verify(fullProof)`

Verifies a Poseidon proof.

**Parameters:**
- `fullProof`: The full proof object from `generate()`

**Returns:** Boolean indicating if the proof is valid

## Use Cases

- **Prove Data Without Revealing**: Demonstrate you have certain data without showing it
- **Prevent Replay Attacks**: Use nullifiers to ensure proofs can't be reused
- **Semaphore Integration**: Works with Semaphore V4 protocol

## Security Considerations

:::danger Important
- ⚠️ Uses insecure trusted setup
- ⚠️ Not audited
- ⚠️ Do not use in production
- ⚠️ For testing and development only
:::

## Example: Anonymous Attestation

```typescript
import { generate, verify } from "@zk-kit/poseidon-proof"

async function createAttestation() {
  const secrets = [123, 456] // Your private data
  const appScope = "my-app-v1"
  
  // Create proof
  const proof = await generate(secrets, appScope)
  
  // Proof reveals:
  // - digest: hash of the secrets
  // - nullifier: prevents double use
  // Proof hides:
  // - The actual secret values
  
  return proof
}

async function verifyAttestation(proof: any) {
  const isValid = await verify(proof)
  
  if (isValid) {
    // Check nullifier hasn't been used
    // Grant access/credits/etc
  }
}
```

## Links

- [npm Package](https://www.npmjs.com/package/@zk-kit/poseidon-proof)
- [GitHub Repository](https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/poseidon-proof)

## Next Steps

- [Packages Overview](/docs/packages/overview)
- [Choosing a Package](/docs/packages/choosing-a-package)
- [Quick Start](/docs/getting-started/quick-start)

