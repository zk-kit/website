import type { SidebarsConfig } from "@docusaurus/plugin-content-docs"

const sidebars: SidebarsConfig = {
    docs: [
        // Documentation Home
        "intro",
        
        // Introduction Section
        {
            type: "category",
            label: "Introduction",
            collapsed: false,
            items: [
                "introduction/what-is-zk-kit",
                "introduction/why-zero-knowledge",
                "introduction/language-implementations",
                "introduction/comparison",
                "introduction/ecosystem"
            ]
        },

        // Getting Started Section
        {
            type: "category",
            label: "Getting Started",
            collapsed: false,
            items: [
                "getting-started/installation",
                "getting-started/quick-start",
                "getting-started/first-proof",
                "getting-started/development-setup",
                "getting-started/typescript-setup"
            ]
        },

        // Core Concepts Section
        {
            type: "category",
            label: "Core Concepts",
            collapsed: true,
            items: [
                "core-concepts/zero-knowledge-basics",
                "core-concepts/merkle-trees"
            ]
        },

        // Packages Section
        {
            type: "category",
            label: "Packages",
            collapsed: true,
            items: [
                "packages/overview",
                "packages/choosing-a-package",
                {
                    type: "category",
                    label: "JavaScript Packages",
                    collapsed: true,
                    items: [
                        "packages/javascript/imt",
                        "packages/javascript/lean-imt",
                        "packages/javascript/smt",
                        "packages/javascript/eddsa-poseidon",
                        "packages/javascript/poseidon-cipher",
                        "packages/javascript/baby-jubjub",
                        "packages/javascript/poseidon-proof",
                        "packages/javascript/utils",
                        "packages/javascript/logical-expressions"
                    ]
                },
                {
                    type: "category",
                    label: "Circom",
                    collapsed: true,
                    items: [
                        "packages/circom/overview"
                    ]
                },
                {
                    type: "category",
                    label: "Solidity",
                    collapsed: true,
                    items: [
                        "packages/solidity/overview"
                    ]
                },
                {
                    type: "category",
                    label: "Noir",
                    collapsed: true,
                    items: [
                        "packages/noir/overview"
                    ]
                },
                {
                    type: "category",
                    label: "Rust",
                    collapsed: true,
                    items: [
                        "packages/rust/overview"
                    ]
                }
            ]
        },

        // Development & Contributing
        "development-tools",
        "contributing",
        
        // Research & Resources
        "academic-papers",
        "faq"
    ]
}

export default sidebars
