---
sidebar_position: 1
title: Installation
description: Install ZK-Kit packages for your project
---

# Installation

Install ZK-Kit packages for your project. Each package is published independently on npm and can be installed separately.

## For Contributors: Monorepo Installation

If you want to contribute to ZK-Kit or work with the source code, clone the repository:

```bash
git clone https://github.com/privacy-scaling-explorations/zk-kit.git
```

Then install the dependencies:

```bash
cd zk-kit && yarn
```

See the [Contributing Guide](https://github.com/privacy-scaling-explorations/zk-kit/blob/main/CONTRIBUTING.md) for more information.

---

## For Developers: Package Installation

### Quick Install

For most use cases, start with the IMT (Incremental Merkle Tree) package:

```bash
npm install @zk-kit/imt
```

:::info Peer Dependencies
Many ZK-Kit packages require hash functions like `poseidon-lite` or `circomlibjs`. Check the package's [npm page](https://www.npmjs.com/org/zk-kit) for specific peer dependencies.
:::

## Package Installation Guide

### Merkle Trees

#### IMT (Incremental Merkle Tree)
Standard choice for membership proofs.

```bash
npm install @zk-kit/imt
```

[Package Details →](https://www.npmjs.com/package/@zk-kit/imt)

#### LeanIMT
Memory-optimized variant for resource-constrained environments.

```bash
npm install @zk-kit/lean-imt
```

[Package Details →](https://www.npmjs.com/package/@zk-kit/lean-imt)

#### SMT (Sparse Merkle Tree)
Key-value storage with non-membership proofs.

```bash
npm install @zk-kit/smt
```

[Package Details →](https://www.npmjs.com/package/@zk-kit/smt)

### Cryptographic Primitives

#### EdDSA-Poseidon
Digital signatures for zero-knowledge circuits.

```bash
npm install @zk-kit/eddsa-poseidon
```

#### Poseidon Cipher
Encryption and decryption for ZK-friendly data.

```bash
npm install @zk-kit/poseidon-cipher
```

#### Baby JubJub
Elliptic curve operations.

```bash
npm install @zk-kit/baby-jubjub
```

#### Poseidon Proof
Generate and verify zero-knowledge proofs.

```bash
npm install @zk-kit/poseidon-proof
```

### Utilities

#### Utils
Field operations, conversions, and scalar arithmetic.

```bash
npm install @zk-kit/utils
```

#### Logical Expressions
Boolean logic in zero-knowledge.

```bash
npm install @zk-kit/logical-expressions
```

## Installation Methods

### npm

```bash
npm install @zk-kit/imt
```

### yarn

```bash
yarn add @zk-kit/imt
```

### pnpm

```bash
pnpm add @zk-kit/imt
```

### bun

```bash
bun add @zk-kit/imt
```

## About Peer Dependencies

:::caution Important
ZK-Kit packages may have peer dependencies that are **not automatically installed**. Always check the specific package's npm page for requirements.
:::

### Common Peer Dependencies

**Hash Functions (for Merkle Trees):**
- `poseidon-lite` - Lightweight Poseidon hash implementation
- `circomlibjs` - Alternative hash implementation from circomlib

**Other Libraries:**
- Check each package's npm page for specific requirements

**Where to Find Dependency Information:**
1. Visit the package on [npmjs.com/org/zk-kit](https://www.npmjs.com/org/zk-kit)
2. Check the "Dependencies" and "Peer Dependencies" sections
3. Read the package README for usage examples

## Full Stack Installation

For a complete ZK application:

```bash
# Core ZK-Kit packages
npm install @zk-kit/imt @zk-kit/eddsa-poseidon

# Peer dependencies (check npm for required versions)
# Example: npm install poseidon-lite

# Blockchain interaction (optional)
npm install ethers

# Proof generation (optional)
npm install snarkjs
```

## TypeScript Configuration

ZK-Kit is built with TypeScript and includes type definitions.

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

## Browser Support

ZK-Kit works in modern browsers with support for:
- ES2020+
- BigInt
- WebAssembly (for some operations)

### Webpack Configuration

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/")
    }
  }
}
```

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ['crypto', 'stream', 'buffer']
    })
  ]
})
```

### Next.js Configuration

```javascript
// next.config.js
module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/')
    }
    return config
  }
}
```

## React Native

Install with native crypto support:

```bash
npm install @zk-kit/imt
# Install peer dependencies as required (check package npm page)

npm install react-native-crypto react-native-randombytes

# Link native modules
cd ios && pod install
```

## Node.js Versions

ZK-Kit requires Node.js 16 or higher.

Check your version:
```bash
node --version
```

If you need to upgrade:
```bash
# Using nvm
nvm install 18
nvm use 18

# Using n
npm install -g n
n 18
```

## Verification

Verify installation:

```typescript
// test.ts
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

const tree = new IMT(poseidon2, 16, 0, 2)
tree.insert(BigInt(1))
console.log("✓ ZK-Kit installed successfully!")
```

Run it:
```bash
npx ts-node test.ts
```

## Common Installation Issues

### Issue: Module not found

**Problem:**
```
Error: Cannot find module '@zk-kit/imt'
```

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Type errors

**Problem:**
```
TS2307: Cannot find module '@zk-kit/imt' or its corresponding type declarations.
```

**Solution:**
Ensure TypeScript is configured correctly:
```bash
npm install --save-dev typescript @types/node
```

### Issue: BigInt not supported

**Problem:**
```
ReferenceError: BigInt is not defined
```

**Solution:**
Update Node.js to version 16+ or add BigInt polyfill for browsers:
```bash
npm install big-integer
```

### Issue: Crypto module not found (browser)

**Problem:**
```
Module not found: Error: Can't resolve 'crypto'
```

**Solution:**
Add crypto polyfill:
```bash
npm install crypto-browserify stream-browserify buffer
```

And configure your bundler (see Browser Support section above).

## Version Management

### Check Installed Version

```bash
npm list @zk-kit/imt
```

### Update to Latest

```bash
npm update @zk-kit/imt
```

### Install Specific Version

```bash
npm install @zk-kit/imt@2.0.0
```

### Use Latest Beta

```bash
npm install @zk-kit/imt@beta
```

## Monorepo Setup

If using a monorepo (Turborepo, Nx, Lerna):

```json
// packages/app/package.json
{
  "dependencies": {
    "@zk-kit/imt": "^2.0.0",
    "poseidon-lite": "^0.2.0"
  }
}
```

Install from root:
```bash
npm install --workspace=packages/app
```

## Docker

Dockerfile for ZK-Kit projects:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

CMD ["node", "dist/index.js"]
```

## CDN Usage (Not Recommended for Production)

For quick prototyping:

```html
<script type="module">
  import { IMT } from 'https://esm.sh/@zk-kit/imt'
  import { poseidon2 } from 'https://esm.sh/poseidon-lite'
  
  const tree = new IMT(poseidon2, 16, 0, 2)
  console.log('Loaded from CDN!')
</script>
```

**⚠️ Warning**: CDN usage is not recommended for production due to:
- Security risks
- Performance concerns
- Version control issues

## Next Steps

- [Quick Start](/docs/getting-started/quick-start) - Build your first proof
- [TypeScript Setup](/docs/getting-started/typescript-setup) - Configure TypeScript
- [Development Setup](/docs/getting-started/development-setup) - Set up your dev environment
- [First Proof](/docs/getting-started/first-proof) - Create your first ZK proof

## Getting Help

- **Installation Issues**: [GitHub Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)
- **Community Support**: [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- **Documentation**: [Browse all docs](/docs)

