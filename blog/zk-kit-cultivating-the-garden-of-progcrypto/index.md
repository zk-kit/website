---
authors: team
title: "ZK-Kit: Cultivating the Garden of ProgCrypto" #
image: "/articles/zk-kit-cultivating-the-garden-of-progcrypto/cover.webp"
tldr: "ZK-Kit is a collection of secure and easy-to-use libraries that make building privacy tools safer and faster. PSE has grown it, and now we invite the community to expand it together."
date: "2025-09-23"
tags: ["zero-knowledge", "ZK-Kit"]
projects: ["zk-kit", "semaphore", "maci"]
canonical: "https://pse.dev/blog/zk-kit-cultivating-the-garden-of-progcrypto"
---

ProgCrypto has [conquered](https://l2beat.com/scaling/summary) scalability, but privacy still has ways to go. By improving our tooling, we expedite the journey towards a more privacy-conscious future.

Software libraries shy away behind an interface but they pack a lot of heat. They are a developer's best friend: boosting productivity without imposing too much of an opinion on the overall application -unlike their fiesty loud sibling, SDKs.

ProgCrypto libraries are _especially_ special because they shield developers from security and soundness minefields had they rolled their own cryptography -an ever present concern.

But that is only true when libraries are:

- Open-sourced for maximal eye-ball attention and bug detection
- Well-tested and audited
- Carefully designed to avoid accidental mishaps that can result from poorly designed interfaces and leaky data-function encapsulations
- Well-documented not only to minimize onboarding overhead on developers but also ensure proper use and understanding of security assumptions

At PSE, we love ProgCrypto libraries.

We lift modular components from the [projects we build](https://pse.dev/en/projects), put them through dedicated security reviews, benchmarking, and thorough and continous testing. We also put emphasis on cleanly standardized interfaces across different implementations of the same functionality in different languages -_learn it once, use it everywhere_.

This effort has culminated into our garden of ProgCrypto libraries: [ZK-Kit](https://github.com/zk-kit). Since its early days, we have only increasingly doubled-down on this conscious effort, leading to:

- 23 packages in 5 supported languages
- ~200 users by repository counts
- ~30 contributors (~7 from PSE)
- ~1500 commits

### The Mathematics of Zero-Knowledge

Zero-knowledge proofs rely on sophisticated mathematical foundations. At their core, they enable proving knowledge of a secret $w$ such that $(x, w) \in R$ for some relation $R$, without revealing $w$.

The security of these systems often depends on computational assumptions like the discrete logarithm problem: given $g$ and $h = g^w$ in a group $\mathbb{G}$, it's computationally infeasible to find $w$.

Our libraries abstract these complex mathematical operations, allowing developers to focus on application logic rather than cryptographic implementation details.

### We want even more goodness

Today we would like to open the gates to this beautiful garden and welcome a wider community contributors to be part of its journey, pushing it to new heights.

We call upon fellow developers and peer projects in our ecosystem to lift useful modular libraries from their codebases, and plant them in this communal garden.

Having the community coalescing around standardized libraries of common primitives is now a major goal for PSE.

Our standards are high, but we hope the community finds the contribution process and feedback a valuable learning process and a badge of achievement upon a successful merge.

We are more ambitious that ever to:

- Add more libraries while ever increasing quality controls: testing, benchmarking, security reviews, and assessment of interface ergonomics
- Increase awareness and help onboard contributors
- Give active contributors and projects a say in governance, standards and best practices

We invite peer projects in our ecosystem to lift modular components that can be useful to others, and contribute to ZK-Kit. This is a win-win:

- A win for the contributing projects for having extra eyes on their components and having them stress-tested and security-reviewed
- A win for the community of developers to boost their productivity and lean on their new components

We also invite independent developers to proactively contribute to ZK-Kit. Successfully contributing to this garden is not only a learning experience (our standards are high and there will likely be reviews and revisions), but also a chance to leave your mark on countless other projects that may use your code:

- Transplant a Pull Request tree or bring an [issue](https://github.com/zk-kit#-open-issues) flower into the ZK-Kit garden
- Get help and advice about your intended contribution in the [community channel](https://github.com/zk-kit/zk-kit/discussions)
- Raise awareness of ZK-Kit, (re)use it and give feedback

We would like to extend a big thank you to all the contributors and maintainers who made this possible. We are excited to continue supporting ZK-Kit with even more community involvement.
