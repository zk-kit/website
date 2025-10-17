---
sidebar_position: 4
title: Development Setup
---

# Development Setup

Set up your development environment for building ZK applications with ZK-Kit.

## Project Structure

Recommended folder structure for ZK-Kit projects:

```
my-zk-app/
├── src/
│   ├── circuits/         # Circom circuits (if using)
│   ├── contracts/        # Smart contracts (if using)
│   ├── lib/
│   │   ├── auth.ts      # Authentication logic
│   │   ├── proofs.ts    # Proof generation
│   │   └── trees.ts     # Merkle tree management
│   ├── utils/
│   │   └── crypto.ts    # Cryptographic utilities
│   └── index.ts         # Main entry point
├── test/
│   ├── auth.test.ts
│   └── proofs.test.ts
├── examples/
│   └── basic-proof.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Initial Setup

### 1. Create Project

```bash
mkdir my-zk-app && cd my-zk-app
npm init -y
```

### 2. Install Dependencies

```bash
# ZK-Kit packages
npm install @zk-kit/imt @zk-kit/eddsa-poseidon
# + peer dependencies (check npm pages for each package)

# Development dependencies
npm install --save-dev typescript @types/node ts-node nodemon

# Testing
npm install --save-dev jest @types/jest ts-jest

# Linting
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier
```

### 3. TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

### 4. Package Scripts

Update `package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "nodemon --exec ts-node src/index.ts",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write \"src/**/*.ts\"",
    "clean": "rm -rf dist"
  }
}
```

## Testing Setup

### Jest Configuration

Create `jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

### Example Test

Create `test/proofs.test.ts`:

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

describe('Proof Generation', () => {
  let tree: IMT

  beforeEach(() => {
    tree = new IMT(poseidon2, 16, 0, 2)
  })

  test('should create valid proof', () => {
    const leaf = BigInt(1)
    const index = tree.insert(leaf)
    const proof = tree.createProof(index)
    
    expect(tree.verifyProof(proof)).toBe(true)
  })

  test('should reject invalid proof', () => {
    tree.insert(BigInt(1))
    const proof = tree.createProof(0)
    proof.leaf = BigInt(999) // Tamper with proof
    
    expect(tree.verifyProof(proof)).toBe(false)
  })
})
```

## Linting Setup

### ESLint Configuration

Create `.eslintrc.json`:

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_"
    }]
  }
}
```

### Prettier Configuration

Create `.prettierrc`:

```json
{
  "semi": false,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

## Environment Variables

Create `.env.example`:

```bash
# Application
NODE_ENV=development
PORT=3000

# Blockchain (if using)
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_private_key_here

# ZK Configuration
TREE_DEPTH=20
ZERO_VALUE=0

# Database (if using)
DATABASE_URL=postgresql://user:pass@localhost:5432/zkapp
```

Create `.env`:
```bash
cp .env.example .env
# Edit .env with your values
```

Add to `.gitignore`:
```
.env
node_modules/
dist/
coverage/
*.log
```

## Development Workflow

### 1. Create a Feature

```typescript
// src/lib/auth.ts
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

export class AuthSystem {
  private tree: IMT

  constructor(depth: number = 16) {
    this.tree = new IMT(poseidon2, depth, 0, 2)
  }

  register(commitment: bigint): number {
    return this.tree.insert(commitment)
  }

  createProof(index: number) {
    return this.tree.createProof(index)
  }

  verify(proof: any): boolean {
    return this.tree.verifyProof(proof)
  }

  get root() {
    return this.tree.root
  }
}
```

### 2. Write Tests

```typescript
// test/auth.test.ts
import { AuthSystem } from '../src/lib/auth'
import { poseidon2 } from 'poseidon-lite'

describe('AuthSystem', () => {
  let auth: AuthSystem

  beforeEach(() => {
    auth = new AuthSystem()
  })

  test('should register users', () => {
    const commitment = poseidon2([BigInt(1)])
    const index = auth.register(commitment)
    expect(index).toBe(0)
  })

  test('should verify proofs', () => {
    const commitment = poseidon2([BigInt(1)])
    const index = auth.register(commitment)
    const proof = auth.createProof(index)
    expect(auth.verify(proof)).toBe(true)
  })
})
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Run Tests

```bash
npm test
```

## Debugging

### VS Code Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug TypeScript",
      "program": "${workspaceFolder}/src/index.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "runtimeArgs": ["-r", "ts-node/register"]
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand", "--no-cache"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Debug Logging

```typescript
// src/utils/logger.ts
export function debug(label: string, data: any) {
  if (process.env.DEBUG === 'true') {
    console.log(`[${label}]`, data)
  }
}

// Usage
import { debug } from './utils/logger'

const tree = new IMT(poseidon2, 16, 0, 2)
debug('tree-root', tree.root.toString())
```

## Performance Monitoring

```typescript
// src/utils/benchmark.ts
export function benchmark<T>(
  name: string,
  fn: () => T
): T {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  console.log(`${name}: ${(end - start).toFixed(2)}ms`)
  return result
}

// Usage
import { benchmark } from './utils/benchmark'

benchmark('proof-generation', () => {
  const proof = tree.createProof(0)
  return proof
})
```

## Git Workflow

### .gitignore

```
# Dependencies
node_modules/

# Build
dist/
build/

# Environment
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
logs/
*.log

# Testing
coverage/
.nyc_output/

# OS
.DS_Store
Thumbs.db
```

### Commit Hooks

Install husky:

```bash
npm install --save-dev husky lint-staged
npx husky install
```

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.ts": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

Create hook:

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/test.yml`:

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linter
        run: npm run lint
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
```

## Docker Setup

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

CMD ["node", "dist/index.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./data:/app/data
```

## Best Practices

### 1. Type Safety

```typescript
// Define types for your domain
export interface UserCommitment {
  commitment: bigint
  index: number
  timestamp: number
}

export interface ProofData {
  proof: any
  nullifier: bigint
  root: bigint
}
```

### 2. Error Handling

```typescript
export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

// Usage
if (!tree.verifyProof(proof)) {
  throw new AuthError('Invalid proof provided')
}
```

### 3. Configuration Management

```typescript
// src/config.ts
export const config = {
  tree: {
    depth: parseInt(process.env.TREE_DEPTH || '20'),
    zeroValue: parseInt(process.env.ZERO_VALUE || '0')
  },
  server: {
    port: parseInt(process.env.PORT || '3000')
  }
}
```

## Next Steps

- [TypeScript Setup](/docs/getting-started/typescript-setup) - Advanced TypeScript configuration
- [Core Concepts](/docs/core-concepts/zero-knowledge-basics) - Learn ZK fundamentals
- [Packages](/docs/packages/overview) - Explore available packages
- [Your First Proof](/docs/getting-started/first-proof) - Build your first proof

## Resources

- [GitHub Repository](https://github.com/zk-kit/zk-kit)
- [GitHub Discussions](https://github.com/orgs/zk-kit/discussions)
- [Quick Start Guide](/docs/getting-started/quick-start)

