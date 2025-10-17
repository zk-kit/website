---
sidebar_position: 8
title: Contributing
---

# Contributing to ZK-Kit

Thank you for your interest in contributing to ZK-Kit! This guide will help you get started.

## Ways to Contribute

There are many ways to contribute to ZK-Kit:

- 🔧 **Work on open issues**: [Browse issues](https://github.com/privacy-scaling-explorations/zk-kit/contribute)
- 📦 **Suggest new packages**: [Create package request](https://github.com/privacy-scaling-explorations/zk-kit/issues/new?assignees=&labels=feature+%3Arocket%3A&template=---package.md&title=)
- 🚀 **Share ideas for new features**: [Feature request](https://github.com/privacy-scaling-explorations/zk-kit/issues/new?assignees=&labels=feature+%3Arocket%3A&template=---feature.md&title=)
- 🐛 **Report bugs**: [Bug report](https://github.com/privacy-scaling-explorations/zk-kit/issues/new?assignees=&labels=bug+%F0%9F%90%9B&template=---bug.md&title=)

## Creating a New Package

ZK-Kit provides pre-configured development tools. You only need to focus on:
- Your code
- Tests
- Documentation

### Steps

**1. Fork and clone:**

```bash
git clone https://github.com/privacy-scaling-explorations/zk-kit.git
cd zk-kit
```

**2. Copy existing package as template:**

```bash
cp -r packages/smt packages/my-package
cd packages/my-package && rm -fr node_modules dist
grep -r -l "smt" . | xargs sed -i 's/smt/my-package/'
```

**3. Update files:**

- Edit `README.md` with your package description
- Edit `package.json` with your package details
- Write your code in `src/` folder
- Write tests in `tests/` folder

**4. Create issue and PR:**

- [Create an issue](https://github.com/privacy-scaling-explorations/zk-kit/issues/new?assignees=&labels=feature+%3Arocket%3A&template=---package.md&title=) for your package
- Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 16+
- Yarn
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/privacy-scaling-explorations/zk-kit.git
cd zk-kit

# Install dependencies
yarn

# Build all packages
yarn build

# Run tests
yarn test
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/my-feature
```

### 2. Make Changes

- Write code
- Write tests
- Update documentation
- Follow existing code style

### 3. Run Quality Checks

```bash
yarn build        # Build packages
yarn test         # Run tests
yarn lint         # Check linting
yarn format       # Check formatting
```

### 4. Commit Changes

```bash
yarn commit       # Interactive commit with conventional commits
```

### 5. Push and Create PR

```bash
git push origin feature/my-feature
```

Then open a Pull Request on GitHub.

## Code Guidelines

### TypeScript

- Use TypeScript for all code
- Define proper types and interfaces
- Avoid `any` type
- Export public types

**Example:**

```typescript
export interface TreeNode {
  value: bigint
  left?: TreeNode
  right?: TreeNode
}

export class MerkleTree {
  private root: TreeNode
  
  constructor(leaves: bigint[]) {
    // implementation
  }
}
```

### Testing

- Write tests for all new features
- Test edge cases
- Use descriptive test names
- Aim for 80%+ coverage

**Example:**

```typescript
describe("MerkleTree", () => {
  it("should create a tree from leaves", () => {
    const leaves = [1n, 2n, 3n, 4n]
    const tree = new MerkleTree(leaves)
    
    expect(tree.root).toBeDefined()
  })
  
  it("should verify valid proofs", () => {
    const tree = new MerkleTree([1n, 2n])
    const proof = tree.createProof(0)
    
    expect(tree.verifyProof(proof)).toBe(true)
  })
})
```

### Documentation

- Add JSDoc comments for public APIs
- Include usage examples
- Update README for new features
- Keep documentation in sync with code

**Example:**

```typescript
/**
 * Creates a Merkle proof for a leaf at the specified index.
 * 
 * @param index - The index of the leaf to create a proof for
 * @returns A proof object containing siblings and path indices
 * 
 * @example
 * ```typescript
 * const tree = new MerkleTree([1n, 2n, 3n])
 * const proof = tree.createProof(0)
 * ```
 */
createProof(index: number): MerkleProof {
  // implementation
}
```

## Pull Request Guidelines

### Before Submitting

- ✅ All tests pass
- ✅ Code is formatted
- ✅ No linting errors
- ✅ Documentation updated
- ✅ Changelog updated (if applicable)

### PR Description

Include:
- What the PR does
- Why the change is needed
- Any breaking changes
- Related issues

**Example:**

```markdown
## Description
Adds batch insertion support to IMT package

## Motivation
Inserting many leaves one-by-one is slow. Batch insertion improves performance by 10x.

## Changes
- Added `insertMany()` method
- Updated tests
- Added documentation

## Breaking Changes
None

## Related Issues
Closes #123
```

### PR Review Process

1. **Automated checks** run (tests, linting)
2. **Maintainer review** (may request changes)
3. **Approval** and merge

## Publishing a New Version

**Note:** Only maintainers can publish packages.

### Step 1: Bump Version

```bash
yarn version:bump <package-name> <version>

# Example:
yarn version:bump utils 2.0.0
```

This creates:
- A commit with version change
- A git tag

### Step 2: Push to Main

```bash
git push origin main
```

### Step 3: Push the Git Tag

```bash
git push origin <package-name>-<version>

# Example:
git push origin utils-v2.0.0
```

### Step 4: Automatic Deployment

After pushing the tag:
- GitHub Actions workflow triggers automatically
- Package is published to [npm](https://www.npmjs.com/)
- GitHub release is created with changelogs

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different viewpoints
- Follow the [Code of Conduct](https://github.com/privacy-scaling-explorations/zk-kit/blob/main/CODE_OF_CONDUCT.md)

### Communication

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Pull Requests**: Code contributions

## Getting Help

- 📚 [Documentation](/docs)
- 💬 [GitHub Discussions](https://github.com/privacy-scaling-explorations/zk-kit/discussions)
- 🐛 [Report Issues](https://github.com/privacy-scaling-explorations/zk-kit/issues)

## Recognition

Contributors are recognized in:
- Package README files
- Release notes
- GitHub contributors page

Thank you for making ZK-Kit better! 🎉

## Resources

- [GitHub Repository](https://github.com/privacy-scaling-explorations/zk-kit)
- [Development Tools](/docs/development-tools)
- [Packages Overview](/docs/packages/overview)
- [Quick Start](/docs/getting-started/quick-start)

