/**
 * JSON-LD Structured Data for SEO
 * This helps Google understand the site structure and generate sitelinks
 */

const SITE_URL = "https://zkkit.org"

export const websiteStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": ["WebSite", "SoftwareSourceCode"],
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "ZK-Kit",
            alternateName: "Zero-Knowledge Kit",
            description: "A set of reusable libraries for zero-knowledge technologies",
            inLanguage: "en-US",
            potentialAction: {
                "@type": "SearchAction",
                target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${SITE_URL}/docs?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
            },
            publisher: {
                "@id": `${SITE_URL}/#organization`
            }
        },
        {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "ZK-Kit",
            alternateName: "Zero-Knowledge Kit",
            url: SITE_URL,
            description: "Building reusable libraries for zero-knowledge technologies",
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/img/zk-kit-full-logo.svg`,
                width: 200,
                height: 60
            },
            foundingDate: "2022",
            sameAs: [
                "https://github.com/zk-kit",
                "https://x.com/zkkitDevs"
            ],
            contactPoint: {
                "@type": "ContactPoint",
                contactType: "Technical Support",
                url: "https://github.com/orgs/zk-kit/discussions"
            }
        },
        {
            "@type": "SoftwareApplication",
            "@id": `${SITE_URL}/#software`,
            name: "ZK-Kit Libraries",
            description: "Zero-knowledge cryptography libraries for JavaScript, TypeScript, Circom, Solidity, Noir, and Rust",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Cross-platform",
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
            },
            author: {
                "@id": `${SITE_URL}/#organization`
            }
        }
    ]
}

export const navigationStructuredData = [
    {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/#navigation-home`,
        name: "Home",
        url: `${SITE_URL}/`
    },
    {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/docs#navigation-docs`,
        name: "Documentation",
        description: "Complete documentation for ZK-Kit libraries and tools",
        url: `${SITE_URL}/docs`
    },
    {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/projects#navigation-projects`,
        name: "Projects",
        description: "Discover projects built with ZK-Kit libraries",
        url: `${SITE_URL}/projects`
    },
    {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/blog#navigation-blog`,
        name: "Blog",
        description: "Updates, tutorials, and insights about zero-knowledge",
        url: `${SITE_URL}/blog`
    },
    {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/contribute#navigation-contribute`,
        name: "Contribute",
        description: "Join the ZK-Kit community and contribute to the project",
        url: `${SITE_URL}/contribute`
    },
    {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/about#navigation-about`,
        name: "About",
        description: "Learn about ZK-Kit mission, values, and community",
        url: `${SITE_URL}/about`
    }
]

// FAQ structured data for better Google search results
export const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/docs/faq#faqpage`,
    mainEntity: [
        {
            "@type": "Question",
            "@id": `${SITE_URL}/docs/faq#general-questions`,
            name: "What is ZK-Kit?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "ZK-Kit is a set of libraries (algorithms or utility functions) that can be reused in different projects and zero-knowledge protocols, making it easier for developers to access user-friendly, tested, and documented code for common tasks."
            }
        },
        {
            "@type": "Question",
            "@id": `${SITE_URL}/docs/faq#which-programming-languages-does-zk-kit-support`,
            name: "Which programming languages does ZK-Kit support?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "ZK-Kit provides implementations in multiple languages: JavaScript/TypeScript, Circom (for ZK circuits), Solidity (for smart contracts), Noir (for Aztec Network), and Rust (for performance-critical applications)."
            }
        },
        {
            "@type": "Question",
            "@id": `${SITE_URL}/docs/faq#is-zk-kit-production-ready`,
            name: "Is ZK-Kit production-ready?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Some packages have been audited, while others are still in beta or unaudited. Audited packages include @zk-kit/eddsa-poseidon, @zk-kit/baby-jubjub, @zk-kit/utils, @zk-kit/imt, @zk-kit/lean-imt, and @zk-kit/smt. Check each package's audit status before using in production."
            }
        },
        {
            "@type": "Question",
            "@id": `${SITE_URL}/docs/faq#which-merkle-tree-should-i-use`,
            name: "Which Merkle Tree should I use?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Use Incremental Merkle Tree (IMT) for frequent additions and small-medium trees. Use Lean IMT for memory efficiency and fastest updates. Use Sparse Merkle Tree (SMT) for proof of non-membership and large datasets with key-value functionality."
            }
        },
        {
            "@type": "Question",
            "@id": `${SITE_URL}/docs/faq#how-do-i-get-support-for-zk-kit`,
            name: "How do I get support for ZK-Kit?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "You can get support through GitHub Issues for bug reports and questions, GitHub Discussions for community discussions, or by consulting the documentation at zkkit.org."
            }
        }
    ]
}

// Important documentation pages for better sitelinks
export const documentationStructuredData = [
    {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/docs`,
        url: `${SITE_URL}/docs`,
        name: "ZK-Kit Documentation",
        description: "Complete documentation for ZK-Kit zero-knowledge libraries"
    },
    {
        "@type": "TechArticle",
        "@id": `${SITE_URL}/docs/introduction/what-is-zk-kit`,
        url: `${SITE_URL}/docs/introduction/what-is-zk-kit`,
        name: "What is ZK-Kit?",
        headline: "What is ZK-Kit?",
        description: "Introduction to ZK-Kit and its purpose in zero-knowledge cryptography",
        isPartOf: {
            "@id": `${SITE_URL}/docs`
        }
    },
    {
        "@type": "TechArticle",
        "@id": `${SITE_URL}/docs/getting-started/installation`,
        url: `${SITE_URL}/docs/getting-started/installation`,
        name: "Installation",
        headline: "Getting Started with ZK-Kit Installation",
        description: "Step-by-step guide to install ZK-Kit libraries",
        isPartOf: {
            "@id": `${SITE_URL}/docs`
        }
    },
    {
        "@type": "TechArticle",
        "@id": `${SITE_URL}/docs/getting-started/quick-start`,
        url: `${SITE_URL}/docs/getting-started/quick-start`,
        name: "Quick Start",
        headline: "Quick Start Guide for ZK-Kit",
        description: "Get started quickly with ZK-Kit libraries",
        isPartOf: {
            "@id": `${SITE_URL}/docs`
        }
    },
    {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/docs/faq`,
        url: `${SITE_URL}/docs/faq`,
        name: "Frequently Asked Questions",
        headline: "ZK-Kit FAQ",
        description: "Common questions about ZK-Kit, Merkle trees, and zero-knowledge proofs",
        mainEntity: faqStructuredData.mainEntity,
        isPartOf: {
            "@id": `${SITE_URL}/docs`
        }
    },
    {
        "@type": "TechArticle",
        "@id": `${SITE_URL}/docs/core-concepts/merkle-trees`,
        url: `${SITE_URL}/docs/core-concepts/merkle-trees`,
        name: "Merkle Trees",
        headline: "Understanding Merkle Trees in ZK-Kit",
        description: "Learn about Incremental, Lean, and Sparse Merkle Trees",
        isPartOf: {
            "@id": `${SITE_URL}/docs`
        }
    },
    {
        "@type": "TechArticle",
        "@id": `${SITE_URL}/docs/packages/overview`,
        url: `${SITE_URL}/docs/packages/overview`,
        name: "Packages Overview",
        headline: "ZK-Kit Packages Overview",
        description: "Overview of all available ZK-Kit packages and libraries",
        isPartOf: {
            "@id": `${SITE_URL}/docs`
        }
    }
]


export function getPageStructuredData(pageType: "home" | "projects" | "contribute" | "about" | "docs" | "blog" | "faq") {
    const baseStructuredData = {
        "@context": "https://schema.org",
        "@graph": [
            ...websiteStructuredData["@graph"],
            ...navigationStructuredData,
            ...documentationStructuredData
        ]
    }

    const pageSpecificData: Record<string, any> = {
        home: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/`,
            url: `${SITE_URL}/`,
            name: "ZK-Kit: Zero-Knowledge Development Libraries",
            description: "A set of reusable libraries for zero-knowledge technologies. Build privacy-preserving applications with audited cryptographic primitives in JavaScript, TypeScript, Circom, Solidity, Noir, and Rust.",
            isPartOf: {
                "@id": `${SITE_URL}/#website`
            },
            about: {
                "@id": `${SITE_URL}/#organization`
            },
            primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${SITE_URL}/og-share-zk-kot.webp`,
                width: 1200,
                height: 630
            },
        },
        projects: {
            "@type": "CollectionPage",
            "@id": `${SITE_URL}/projects`,
            url: `${SITE_URL}/projects`,
            name: "Projects Built with ZK-Kit",
            description: "Discover innovative projects and applications built with ZK-Kit libraries. See real-world implementations of zero-knowledge cryptography.",
            isPartOf: {
                "@id": `${SITE_URL}/#website`
            },
        },
        contribute: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/contribute`,
            url: `${SITE_URL}/contribute`,
            name: "Contribute to ZK-Kit",
            description: "Help ZK-Kit grow and improve. Choose your contribution path - from picking issues to becoming a maintainer or partner.",
            isPartOf: {
                "@id": `${SITE_URL}/#website`
            },
        },
        about: {
            "@type": "AboutPage",
            "@id": `${SITE_URL}/about`,
            url: `${SITE_URL}/about`,
            name: "About ZK-Kit",
            description: "Learn about ZK-Kit, our growth, and commitment to the developer community. Discover our mission to make zero-knowledge cryptography accessible.",
            isPartOf: {
                "@id": `${SITE_URL}/#website`
            },
            mainEntity: {
                "@id": `${SITE_URL}/#organization`
            },
        },
        docs: {
            "@type": "TechArticle",
            "@id": `${SITE_URL}/docs`,
            url: `${SITE_URL}/docs`,
            headline: "ZK-Kit Documentation",
            name: "ZK-Kit Documentation",
            description: "Complete documentation for ZK-Kit zero-knowledge libraries. Learn how to build privacy-preserving applications with our comprehensive guides and API references.",
            isPartOf: {
                "@id": `${SITE_URL}/#website`
            },
            about: {
                "@id": `${SITE_URL}/#organization`
            },
        },
        blog: {
            "@type": "CollectionPage",
            "@id": `${SITE_URL}/blog`,
            url: `${SITE_URL}/blog`,
            name: "ZK-Kit Blog",
            description: "Updates, tutorials, and insights about zero-knowledge technology. Stay informed about the latest developments in privacy-preserving cryptography.",
            isPartOf: {
                "@id": `${SITE_URL}/#website`
            },
        },
        faq: {
            "@type": "FAQPage",
            "@id": `${SITE_URL}/docs/faq`,
            url: `${SITE_URL}/docs/faq`,
            name: "Frequently Asked Questions",
            description: "Common questions and answers about ZK-Kit. Find answers about supported languages, Merkle trees, production readiness, and how to get started.",
            isPartOf: {
                "@id": `${SITE_URL}/#website`
            },
            mainEntity: faqStructuredData.mainEntity,
        }
    }

    baseStructuredData["@graph"].push(pageSpecificData[pageType])

    return baseStructuredData
}

