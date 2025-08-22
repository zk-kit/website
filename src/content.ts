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
        title: "Semaphore",
        image: "/img/partners/aztec.svg",
        imageDark: "/img/partners/aztec-dark.svg",
    },
    {
        title: "Semaphore",
        image: "/img/partners/eth.svg",
        imageDark: "/img/partners/eth-dark.svg",
    },
    {
        title: "Semaphore",
        image: "/img/partners/aztec.svg",
        imageDark: "/img/partners/aztec-dark.svg",
    },
    {
        title: "Semaphore",
        image: "/img/partners/eth.svg",
        imageDark: "/img/partners/eth-dark.svg",
    },
    {
        title: "Semaphore",
        image: "/img/partners/aztec.svg",
        imageDark: "/img/partners/aztec-dark.svg",
    },
    {
        title: "Semaphore",
        image: "/img/partners/eth.svg",
        imageDark: "/img/partners/eth-dark.svg",
    }
]

export const languages: Language[] = [
    {
        text: "JavaScript",
        description: "Web & Node.js applications",
        packages: 12,
        link: "https://github.com/privacy-scaling-explorations/zk-kit"
    },
    {
        text: "Circom",
        description: "Zero-Knowledge circuirs",
        packages: 10,
        link: "https://github.com/privacy-scaling-explorations/zk-kit.circom"
    },
    {
        text: "Noir",
        description: "Privacy-focused DSL",
        packages: 9,
        link: "https://github.com/privacy-scaling-explorations/zk-kit.noir"
    },
    {
        text: "Solidity",
        description: "Smart contracts",
        packages: 11,
        link: "https://github.com/privacy-scaling-explorations/zk-kit.solidity"
    },
    {
        text: "Rust",
        description: "High-performance systems",
        packages: 12,
        link: "https://github.com/privacy-scaling-explorations/zk-kit.rust"
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
        description:
            "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.",
        image: "/img/projects/project-1.png",
        languages: ["Javascript", "Circom", "Solidity"],
        useCases: ["Identity", "Voting", "Privacy"],
        featured: true,
        url: "#"
    },
    {
        title: "MACI",
        description:
            "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.",
        image: "/img/projects/project-2.png",
        languages: ["Javascript", "Solidity", "Circom"],
        useCases: ["Voting", "Privacy", "Identity"],
        featured: true,
        url: "#"
    },
    {
        title: "Privacy Pools",
        description:
            "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.",
        image: "/img/projects/project-3.png",
        languages: ["Rust", "Noir", "Solidity"],
        useCases: ["DeFi", "Privacy"],
        featured: true,
        url: "#"
    },
    {
        title: "Project 4",
        description:
            "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.",
        image: "/img/projects/project-4.png",
        languages: ["Noir", "Javascript"],
        useCases: ["Gaming", "Social"],
        featured: true,
        url: "#"
    },

    {
        title: "Project 5",
        description:
            "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.",
        image: "/img/projects/project-5.png",
        languages: ["Circom", "Rust", "Javascript"],
        useCases: ["Identity", "Social", "Privacy"],
        featured: true,
        url: "#"
    },
    {
        title: "Project 6",
        description:
            "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.",
        image: "/img/projects/project-6.png",
        languages: ["Solidity", "Noir"],
        useCases: ["DeFi", "Voting"],
        url: "#"
    },
    {
        title: "Project 7",
        description:
            "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.",
        image: "/img/projects/project-7.png",
        languages: ["Rust", "Circom", "Solidity"],
        useCases: ["Gaming", "Privacy", "Identity"],
        url: "#"
    },
    {
        title: "Project 8",
        description:
            "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.",
        image: "/img/projects/project-8.png",
        languages: ["Javascript", "Noir", "Rust"],
        useCases: ["Social", "DeFi"],
        url: "#"
    },
    {
        title: "Project 9",
        description:
            "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.",
        image: "/img/projects/project-9.png",
        languages: ["Circom", "Solidity"],
        useCases: ["Voting", "Identity", "Gaming"],
        url: "#"
    },
    {
        title: "Project 10",
        description:
            "Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.",
        image: "/img/projects/project-10.png",
        languages: ["Noir", "Rust", "Javascript", "Solidity"],
        useCases: ["Privacy", "Social", "DeFi"],
        url: "#"
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
