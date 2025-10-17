---
sidebar_position: 5
title: TypeScript Setup
---

# TypeScript Setup

Configure TypeScript for optimal ZK-Kit development with full type safety and IDE support.

## Basic Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

## Type Definitions

ZK-Kit packages include TypeScript definitions out of the box. No additional `@types` packages needed!

### Using Types

```typescript
import { IMT, MerkleProof } from "@zk-kit/imt"
import type { HashFunction } from "@zk-kit/imt"

// IMT is fully typed
const tree: IMT = new IMT(poseidon2, 16, 0, 2)

// MerkleProof interface available
const proof: MerkleProof = tree.createProof(0)

// Hash function type
const customHash: HashFunction = (values: any[]) => {
  // Your implementation
  return BigInt(0)
}
```

## Type-Safe Wrappers

### Authentication System

```typescript
import { IMT, MerkleProof } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

interface UserData {
  id: string
  commitment: bigint
  index: number
  registeredAt: Date
}

interface ProofData {
  proof: MerkleProof
  nullifier: bigint
  timestamp: number
}

class TypeSafeAuth {
  private tree: IMT
  private users: Map<string, UserData> = new Map()

  constructor(depth: number = 16) {
    this.tree = new IMT(poseidon2, depth, 0, 2)
  }

  register(userId: string, commitment: bigint): UserData {
    if (this.users.has(userId)) {
      throw new Error(`User ${userId} already registered`)
    }

    const index = this.tree.insert(commitment)
    const userData: UserData = {
      id: userId,
      commitment,
      index,
      registeredAt: new Date()
    }

    this.users.set(userId, userData)
    return userData
  }

  createProof(userId: string): ProofData {
    const user = this.users.get(userId)
    if (!user) {
      throw new Error(`User ${userId} not found`)
    }

    const proof = this.tree.createProof(user.index)
    const nullifier = this.generateNullifier(user.commitment)

    return {
      proof,
      nullifier,
      timestamp: Date.now()
    }
  }

  verify(proofData: ProofData): boolean {
    return this.tree.verifyProof(proofData.proof)
  }

  private generateNullifier(commitment: bigint): bigint {
    return poseidon2([commitment, BigInt(Date.now())])
  }

  get root(): bigint {
    return this.tree.root as bigint
  }

  get userCount(): number {
    return this.users.size
  }
}

// Usage with full type checking
const auth = new TypeSafeAuth(20)

const user: UserData = auth.register("alice", BigInt("0x1234"))
const proofData: ProofData = auth.createProof("alice")
const isValid: boolean = auth.verify(proofData)
```

## Generic Types

### Tree Manager

```typescript
import { IMT } from "@zk-kit/imt"

interface TreeConfig {
  depth: number
  zeroValue: any
  arity: number
}

class TreeManager<T extends bigint | string | number> {
  private tree: IMT
  private config: TreeConfig

  constructor(
    hashFn: (values: any[]) => any,
    config: TreeConfig
  ) {
    this.config = config
    this.tree = new IMT(
      hashFn,
      config.depth,
      config.zeroValue,
      config.arity
    )
  }

  insert(value: T): number {
    const leaf = this.normalize(value)
    return this.tree.insert(leaf)
  }

  private normalize(value: T): bigint {
    if (typeof value === 'bigint') return value
    if (typeof value === 'string') return BigInt(value)
    if (typeof value === 'number') return BigInt(value)
    throw new Error('Unsupported type')
  }

  getProof(index: number) {
    return this.tree.createProof(index)
  }

  verify(proof: any): boolean {
    return this.tree.verifyProof(proof)
  }
}

// Type-safe usage
const manager = new TreeManager<bigint>(
  poseidon2,
  { depth: 16, zeroValue: 0, arity: 2 }
)

manager.insert(BigInt(1)) // ✓ OK
manager.insert("0x1234")  // ✓ OK (will be converted)
// manager.insert({ foo: 'bar' }) // ✗ Type error
```

## Utility Types

### Create Custom Types

```typescript
// types.ts
import type { MerkleProof } from "@zk-kit/imt"

export type Commitment = bigint
export type Nullifier = bigint
export type Root = bigint
export type Index = number

export interface ExtendedProof extends MerkleProof {
  timestamp: number
  version: string
}

export type ProofResult = 
  | { success: true; proof: ExtendedProof }
  | { success: false; error: string }

export interface AuthConfig {
  treeDepth: number
  enableNullifiers: boolean
  maxUsers: number
}

export type HashFn = (values: readonly any[]) => bigint

// Usage
import type { Commitment, ProofResult } from './types'

function registerUser(commitment: Commitment): ProofResult {
  try {
    // ...
    return { success: true, proof }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

## Strict Mode Best Practices

### Enable All Strict Checks

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Handle Null/Undefined

```typescript
import { IMT } from "@zk-kit/imt"

class SafeTree {
  private tree: IMT | null = null

  initialize(depth: number): void {
    this.tree = new IMT(poseidon2, depth, 0, 2)
  }

  insert(leaf: bigint): number {
    if (!this.tree) {
      throw new Error('Tree not initialized')
    }
    return this.tree.insert(leaf)
  }

  // Alternative with assertion
  getRoot(): bigint {
    if (!this.tree) {
      throw new Error('Tree not initialized')
    }
    return this.tree.root as bigint
  }
}
```

## Path Mapping

### Organize Imports

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@lib/*": ["src/lib/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

Usage:

```typescript
// Instead of
import { AuthSystem } from '../../../lib/auth'

// Use
import { AuthSystem } from '@lib/auth'
import type { ProofData } from '@types/proofs'
```

## Declaration Files

### Create Type Definitions

```typescript
// src/types/index.d.ts
declare module 'my-zk-utils' {
  export interface TreeOptions {
    depth: number
    arity?: number
  }

  export function createTree(options: TreeOptions): any
}
```

## Type Guards

### Runtime Type Checking

```typescript
import type { MerkleProof } from "@zk-kit/imt"

function isValidProof(obj: unknown): obj is MerkleProof {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'root' in obj &&
    'leaf' in obj &&
    'siblings' in obj &&
    'pathIndices' in obj
  )
}

// Usage
function processProof(data: unknown) {
  if (isValidProof(data)) {
    // TypeScript knows data is MerkleProof here
    console.log('Root:', data.root)
  } else {
    throw new Error('Invalid proof format')
  }
}
```

## Enums and Constants

### Type-Safe Configuration

```typescript
enum TreeDepth {
  Small = 16,
  Medium = 20,
  Large = 24,
  ExtraLarge = 28
}

enum TreeArity {
  Binary = 2,
  Quinary = 5
}

const TREE_CONFIGS = {
  development: {
    depth: TreeDepth.Small,
    arity: TreeArity.Binary
  },
  production: {
    depth: TreeDepth.Large,
    arity: TreeArity.Binary
  }
} as const

type Environment = keyof typeof TREE_CONFIGS

function getConfig(env: Environment) {
  return TREE_CONFIGS[env]
}
```

## Integration with IDEs

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}
```

### IntelliSense

```typescript
// Hover over any ZK-Kit type for documentation
const tree = new IMT(poseidon2, 16, 0, 2)
//    ^--- Shows: const tree: IMT

const proof = tree.createProof(0)
//    ^--- Shows: const proof: MerkleProof
```

## Error Handling with Types

```typescript
class TreeError extends Error {
  constructor(
    message: string,
    public code: TreeErrorCode,
    public details?: unknown
  ) {
    super(message)
    this.name = 'TreeError'
  }
}

enum TreeErrorCode {
  NotInitialized = 'NOT_INITIALIZED',
  IndexOutOfBounds = 'INDEX_OUT_OF_BOUNDS',
  InvalidProof = 'INVALID_PROOF',
  TreeFull = 'TREE_FULL'
}

type TreeResult<T> = 
  | { ok: true; value: T }
  | { ok: false; error: TreeError }

function safeCreateProof(
  tree: IMT,
  index: number
): TreeResult<MerkleProof> {
  try {
    const proof = tree.createProof(index)
    return { ok: true, value: proof }
  } catch (error) {
    return {
      ok: false,
      error: new TreeError(
        'Failed to create proof',
        TreeErrorCode.InvalidProof,
        error
      )
    }
  }
}
```

## Testing with Types

```typescript
import { IMT, MerkleProof } from "@zk-kit/imt"

// Type-safe test helpers
function createTestTree(): IMT {
  return new IMT(poseidon2, 16, 0, 2)
}

function createTestProof(tree: IMT, index: number): MerkleProof {
  return tree.createProof(index)
}

// Tests
describe('Type-safe tests', () => {
  let tree: IMT
  
  beforeEach(() => {
    tree = createTestTree()
  })

  it('should create valid proof', () => {
    tree.insert(BigInt(1))
    const proof: MerkleProof = createTestProof(tree, 0)
    
    expect(tree.verifyProof(proof)).toBe(true)
  })
})
```

## Advanced Types

### Conditional Types

```typescript
type TreeType = 'IMT' | 'LeanIMT' | 'SMT'

type TreeInstance<T extends TreeType> = 
  T extends 'IMT' ? IMT :
  T extends 'LeanIMT' ? LeanIMT :
  T extends 'SMT' ? SMT :
  never

function createTree<T extends TreeType>(
  type: T,
  depth: number
): TreeInstance<T> {
  switch (type) {
    case 'IMT':
      return new IMT(poseidon2, depth, 0, 2) as TreeInstance<T>
    case 'LeanIMT':
      return new LeanIMT(...) as TreeInstance<T>
    case 'SMT':
      return new SMT(...) as TreeInstance<T>
    default:
      throw new Error('Unknown tree type')
  }
}

// Type is inferred correctly
const imt = createTree('IMT', 16) // Type: IMT
const lean = createTree('LeanIMT', 16) // Type: LeanIMT
```

## Next Steps

- [Development Setup](/docs/getting-started/development-setup) - Complete dev environment
- [Core Concepts](/docs/core-concepts/zero-knowledge-basics) - Learn ZK fundamentals
- [Packages Overview](/docs/packages/overview) - Explore all packages
- [GitHub Examples](https://github.com/zk-kit/zk-kit) - See code in action

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [ZK-Kit GitHub](https://github.com/zk-kit/zk-kit)
- [Type Definitions](https://github.com/zk-kit/zk-kit/tree/main/packages)

