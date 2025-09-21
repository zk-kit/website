export interface Language {
    text: string
    description: string
    packages: number
    link: string
}
export interface Feature {
    text: string
    description: string
    image: React.ReactNode
}

export interface Project {
    title: string
    description?: string
    image?: string
    languages?: string[]
    useCases?: string[]
    url?: string
    featured?: boolean
}

export interface Contribute {
    title: string
    description: string
    icon: string
    url: string
}

export interface Partner {
    title: string
    image: string
    imageDark?: string
}

export const partners: Partner[] = [
    {
        title: "Ethereum Foundation",
        image: "/img/partners/eth.svg",
        imageDark: "/img/partners/eth-dark.svg"
    },
    {
        title: "Ethereum Foundation",
        image: "/img/partners/eth.svg",
        imageDark: "/img/partners/eth-dark.svg"
    },
    {
        title: "Ethereum Foundation",
        image: "/img/partners/eth.svg",
        imageDark: "/img/partners/eth-dark.svg"
    },
    {
        title: "Ethereum Foundation",
        image: "/img/partners/eth.svg",
        imageDark: "/img/partners/eth-dark.svg"
    },
    {
        title: "Ethereum Foundation",
        image: "/img/partners/eth.svg",
        imageDark: "/img/partners/eth-dark.svg"
    },
    {
        title: "Ethereum Foundation",
        image: "/img/partners/eth.svg",
        imageDark: "/img/partners/eth-dark.svg"
    }
]

export const languages: Language[] = [
    {
        text: "JavaScript",
        description: "Web & Node.js applications",
        packages: 9,
        link: "https://github.com/zk-kit/zk-kit"
    },
    {
        text: "Circom",
        description: "Zero-Knowledge circuits",
        packages: 5,
        link: "https://github.com/zk-kit/zk-kit.circom"
    },
    {
        text: "Noir",
        description: "Privacy-focused DSL",
        packages: 4,
        link: "https://github.com/zk-kit/zk-kit.noir"
    },
    {
        text: "Solidity",
        description: "Smart contracts",
        packages: 4,
        link: "https://github.com/zk-kit/zk-kit.solidity"
    },
    {
        text: "Rust",
        description: "High-performance systems",
        packages: 3,
        link: "https://github.com/zk-kit/zk-kit.rust"
    }
]

export const features: Feature[] = [
    {
        text: "Language-Specific Packages",
        description:
            "Dedicated libraries for multiple programming languages, making it easy to build in your preferred environment.",
        image: "/img/icons/language-specific-packages-icon.svg"
    },
    {
        text: "Modular Design",
        description:
            "Each package is independent and composable, so you can include only the parts relevant to your project.",
        image: "/img/icons/modular-design-icon.svg"
    },
    {
        text: "Fully Documented",
        description:
            "Comprehensive documentation, usage examples, and test coverage, ensuring smooth development process.",
        image: "/img/icons/fully-documented-icon.svg"
    },
    {
        text: "Battle-Tested",
        description:
            "Used in real-world ZK apps and protocols, ensuring stability and performance in production environments.",
        image: "/img/icons/battle-tested-icon.svg"
    },
    {
        text: "Community-Driven",
        description:
            "Built by and for developers, maintained openly with contributions from members teams and institutions across the ecosystem.",
        image: "/img/icons/community-driven-icon.svg"
    }
]

export const projects: Project[] = [
    {
        title: "Semaphore",
        description: "A zero-knowledge protocol for anonymous proof of membership.",
        image: "/img/projects/project-1.png",
        languages: ["Javascript", "Circom", "Solidity"],
        useCases: ["Identity", "Groups", "Voting", "Privacy"],
        featured: true,
        url: "https://semaphore.pse.dev/"
    },
    {
        title: "MACI",
        description: "Minimal Anti-Collusion Infrastructure (MACI) is a private, on-chain, voting system.",
        image: "/img/projects/project-2.png",
        languages: ["Javascript", "Solidity", "Circom"],
        useCases: ["Voting", "Privacy", "Identity"],
        featured: true,
        url: "https://maci.pse.dev/"
    },
    {
        title: "Privacy Pools",
        description:
            "Privacy Pools is a blockchain protocol that enables private asset transfers. Users can deposit funds publicly and partially withdraw them privately, provided they can prove membership in an approved set of addresses.",
        image: "/img/projects/project-3.png",
        languages: ["Javascript", "Solidity"],
        useCases: ["DeFi", "Privacy"],
        featured: true,
        url: "https://privacypools.com/"
    },
    {
        title: "Zupass",
        description:
            "Software for storing and managing Proof-Carrying Data: any data whose well-formedness and validity are cryptographically verifiable.",
        image: "/img/projects/project-4.png",
        languages: ["Javascript", "Circom"],
        useCases: ["Social", "Privacy"],
        featured: true,
        url: "https://github.com/proofcarryingdata/zupass"
    },
    {
        title: "Self Protocol",
        description: "Prove your humanity seamlessly & privately.",
        image: "/img/projects/project-5.png",
        languages: ["Javascript", "Solidity", "Circom"],
        useCases: ["Identity", "Social", "Privacy"],
        featured: true,
        url: "https://self.xyz/"
    }
]

export const contribute: Contribute[] = [
    {
        title: "Pick an Issue",
        description: "Start with GitHub issues and 'good first issues' to get familiar with the codebase.",
        icon: "/img/icons/contribute-icon.svg",
        url: "/contribute#pick-an-issue"
    },
    {
        title: "Become a Partner",
        description: "For businesses and organizations that use ZK-Kit and want to contribute resources or funding.",
        icon: "/img/icons/contribute-icon.svg",
        url: "/contribute#become-a-partner"
    },
    {
        title: "Become a Maintainer",
        description: "Individual developers who want to help maintain packages and work on core development.",
        icon: "/img/icons/contribute-icon.svg",
        url: "/contribute#become-a-maintainer"
    },
    {
        title: "Audit a Package",
        description: "Volunteer for community-led code reviews and security audits of ZK-Kit components.",
        icon: "/img/icons/contribute-icon.svg",
        url: "/contribute#audit-a-package"
    }
]
