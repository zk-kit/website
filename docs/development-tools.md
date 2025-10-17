---
sidebar_position: 7
title: Development Tools & Workflow
---

# Development Tools & Workflow

ZK-Kit provides pre-configured development tools for maintaining code quality and streamlining the development process.

## Monorepo Structure

ZK-Kit uses **Yarn workspaces** for minimal monorepo package management. This allows:
- Shared dependencies across packages
- Simplified build and test workflows
- Consistent versioning

### Commands

```bash
yarn           # Install all dependencies
yarn build     # Build all packages
yarn docs      # Generate documentation for all packages
```

## Code Quality Tools

### ESLint

Analyzes code and catches bugs automatically.

```bash
yarn lint
```

ESLint configuration ensures:
- Consistent code style
- Early bug detection
- Best practices enforcement

**Features:**
- Automatic error detection
- Code style consistency
- TypeScript integration
- Pre-configured rules

### Prettier

Code formatting for consistency.

```bash
yarn format          # Check formatting rules
yarn format:write    # Automatically format code
```

**Benefits:**
- Consistent code formatting
- No style debates
- Automatic on save (with IDE integration)
- Works with ESLint

## Testing Framework

### Jest

Test framework for all JavaScript libraries.

```bash
yarn test:libraries   # Run all tests
yarn test            # Run tests for current package
```

**Testing best practices:**
- Write tests for all new features
- Maintain high test coverage
- Test edge cases
- Use descriptive test names

**Example Test:**

```typescript
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

describe("IMT", () => {
  it("should create a tree and verify proofs", () => {
    const tree = new IMT(poseidon2, 16, 0, 2)
    tree.insert(BigInt(1))
    
    const proof = tree.createProof(0)
    const isValid = tree.verifyProof(proof)
    
    expect(isValid).toBe(true)
  })
})
```

## Documentation Generation

### Typedocs

Automatically generates documentation from TypeScript code.

```bash
yarn docs
```

**Output location:** `docs/` folder

**Features:**
- Auto-generated API reference
- Type information
- Function signatures
- Usage examples from JSDoc comments

**Writing Documentation Comments:**

```typescript
/**
 * Creates a Merkle tree proof for a specific leaf.
 * @param index The index of the leaf to prove
 * @returns A proof object containing siblings and path
 */
createProof(index: number): MerkleProof {
  // implementation
}
```

## Benchmarking

### Benny

Simple benchmarking framework for JavaScript/TypeScript.

```bash
yarn benchmarks              # Run all benchmarks
yarn benchmarks [filename]   # Run specific benchmark
```

**Creating benchmarks:**

1. Create a file in `benchmarks/` folder
2. Export a benchmark function
3. Add to `benchmarks/index.ts`
4. Results saved in `benchmarks/results/`

**Example Benchmark:**

```typescript
import { add, complete, cycle, save, suite } from "benny"
import { IMT } from "@zk-kit/imt"
import { poseidon2 } from "poseidon-lite"

export default function () {
  return suite(
    "IMT Operations",
    
    add("insert", () => {
      const tree = new IMT(poseidon2, 16, 0, 2)
      return () => tree.insert(BigInt(1))
    }),
    
    add("create proof", () => {
      const tree = new IMT(poseidon2, 16, 0, 2)
      tree.insert(BigInt(1))
      return () => tree.createProof(0)
    }),
    
    cycle(),
    complete(),
    save({ file: "imt", folder: "benchmarks/results" })
  )
}
```

## Commit Workflow

### Conventional Commits

Structured, human and machine-readable commit messages.

```bash
yarn commit
```

**This command:**
- Guides you through commit message creation
- Automatically checks ESLint compliance
- Automatically checks Prettier compliance
- Ensures consistent commit format

**Commit message format:**

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(imt): add batch insertion support

Adds insertMany() method for efficiently inserting multiple leaves at once.

Closes #123
```

```bash
fix(eddsa): correct signature verification edge case

Fixed an issue where signatures with zero values would fail verification.
```

## CI/CD Pipeline

### GitHub Actions

Automated workflows for:
- **Automatic testing** on every push/PR
- **Documentation deployment** on releases
- **Code quality checks** (ESLint, Prettier)
- **npm publishing** when tags are pushed

**Workflow triggers:**
- Push to main branch
- Pull request creation
- Git tag push (for releases)

**Example Workflow:**

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: yarn install
      - run: yarn build
      - run: yarn test
      - run: yarn lint
```

## Development Workflow

### Standard Development Flow

1. **Clone the repository:**
   ```bash
   git clone https://github.com/privacy-scaling-explorations/zk-kit.git
   cd zk-kit
   ```

2. **Install dependencies:**
   ```bash
   yarn
   ```

3. **Create a branch:**
   ```bash
   git checkout -b feature/my-feature
   ```

4. **Make changes:**
   - Write code
   - Write tests
   - Update documentation

5. **Run quality checks:**
   ```bash
   yarn build        # Build packages
   yarn test         # Run tests
   yarn lint         # Check linting
   yarn format       # Check formatting
   ```

6. **Commit changes:**
   ```bash
   yarn commit       # Interactive commit
   ```

7. **Push and create PR:**
   ```bash
   git push origin feature/my-feature
   ```

### Package Development

**Working on a specific package:**

```bash
cd packages/imt
yarn test        # Run package tests
yarn build       # Build package
```

**Testing changes in another project:**

```bash
# In the zk-kit package directory
yarn link

# In your project
yarn link @zk-kit/imt
```

## Publishing Workflow

### Bumping Versions

```bash
yarn version:bump <package-name> <version>

# Example:
yarn version:bump utils 2.0.0
```

This creates:
- A commit with version change
- A git tag

### Publishing to npm

**Step 1: Bump version** (see above)

**Step 2: Push to main**
```bash
git push origin main
```

**Step 3: Push the git tag**
```bash
git push origin <package-name>-<version>

# Example:
git push origin utils-v2.0.0
```

**Step 4: Automatic deployment**

After pushing the tag:
- GitHub Actions workflow triggers automatically
- Package is published to [npm](https://www.npmjs.com/)
- GitHub release is created with changelogs

## IDE Setup

### VS Code

**Recommended extensions:**

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

**Settings:**

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### WebStorm/IntelliJ

1. Enable ESLint: `Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint`
2. Enable Prettier: `Settings → Languages & Frameworks → JavaScript → Prettier`
3. Format on save: `Settings → Tools → Actions on Save`

## Debugging

### Node.js Debugging

**VS Code launch.json:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Tests",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Browser Debugging

Use browser DevTools with source maps:

```typescript
// Your code here
debugger; // Breakpoint
```

## Performance Monitoring

### Memory Profiling

```bash
node --inspect-brk node_modules/.bin/jest
# Open chrome://inspect in Chrome
```

### Benchmark Comparison

```bash
# Run benchmarks before changes
yarn benchmarks > before.txt

# Make changes
# Run benchmarks after
yarn benchmarks > after.txt

# Compare
diff before.txt after.txt
```

## Troubleshooting

### Common Issues

**Issue: Tests failing after changes**

```bash
# Clear Jest cache
yarn test --clearCache

# Rebuild packages
yarn build
```

**Issue: Linting errors**

```bash
# Auto-fix where possible
yarn lint --fix

# Format code
yarn format:write
```

**Issue: Type errors**

```bash
# Rebuild TypeScript declarations
yarn build
```

## Best Practices

### Code Style

- Use TypeScript for type safety
- Write descriptive variable names
- Keep functions small and focused
- Comment complex logic
- Follow existing patterns

### Testing

- Test happy path and edge cases
- Use descriptive test names
- Mock external dependencies
- Aim for 80%+ coverage
- Test public API, not implementation

### Documentation

- Document all public APIs
- Include usage examples
- Explain complex algorithms
- Keep README up to date
- Add JSDoc comments

### Performance

- Profile before optimizing
- Benchmark critical paths
- Consider memory usage
- Use appropriate data structures
- Avoid premature optimization

## Resources

- [Yarn Workspaces](https://yarnpkg.com/features/workspaces)
- [Jest Documentation](https://jestjs.io/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions](https://docs.github.com/en/actions)

## Next Steps

- [Contributing Guide](/docs/contributing)
- [Packages Overview](/docs/packages/overview)
- [Quick Start](/docs/getting-started/quick-start)
- [GitHub Repository](https://github.com/privacy-scaling-explorations/zk-kit)

