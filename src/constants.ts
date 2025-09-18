export const MAX_PROJECTS_TO_SHOW = 9

export const LINKS = {
    BASE_URL: "https://zkkit.org",
    GITHUB_API_BASE_URL: "https://api.github.com/repos/zk-kit/zk-kit",
    USE_ZK_KIT_URL: "/docs/intro",
    CONTRIBUTE: "#",
    AUDIT_GUIDE: "#",
    APPLY_TO_BE_A_MAINTAINER: "#",
    APPLY_TO_BE_A_PARTNER: "#",
    VIEW_ALL_ISSUES: "https://github.com/zk-kit/zk-kit/issues",
    VIEW_ALL_OPPORTUNITIES: "#",
    SUBMIT_PROJECT: "#",
    GITHUB_URL: "https://github.com/zk-kit",
    SIGNAL_URL: "https://signal.org/#signal",
    ZK_IDENTITY_URL: "#",
    ZK_MERKLE_TREE_URL: "#",
    ZK_VOTING_URL: "#"
}

export const SEO_DATA = {
    INDEX_PAGE: {
        TITLE: "Zero-Knowledge Development Libraries",
        DESCRIPTION: "A set of reusable libraries for zero-knowledge technologies.",
        KEYWORDS: [
            "ZK-Kit",
            "zero-knowledge",
            "cryptography",
            "libraries",
            "development tools",
            "privacy",
            "blockchain"
        ]
    },
    CONTRIBUTE_PAGE: {
        TITLE: "Contribute to ZK-Kit",
        DESCRIPTION:
            "Help ZK-Kit grow and improve. Choose your contribution path - from picking issues to becoming a maintainer or partner.",
        KEYWORDS: ["ZK-Kit", "contribute", "open-source", "community", "maintainer", "partner", "issues", "development"]
    },
    PROJECTS_PAGE: {
        TITLE: "Projects",
        DESCRIPTION:
            "Discover a curated showcase of innovative projects and applications built with ZK-Kit. See what developers are creating with our zero-knowledge libraries.",
        KEYWORDS: [
            "ZK-Kit",
            "projects",
            "zero-knowledge",
            "showcase",
            "applications",
            "developer community",
            "cryptography"
        ]
    },
    ABOUT_PAGE: {
        TITLE: "About Us",
        DESCRIPTION:
            "Learn about ZK-Kit, our growth, and commitment to the developer community. Discover our key figures and statistics.",
        KEYWORDS: ["ZK-Kit", "about", "zero-knowledge", "cryptography", "developer tools", "statistics"]
    }
}

export const GITHUB_DATA = {
    GOOD_FIRST_ISSUES: {
        URL: "https://github.com/zk-kit#open-issues",
        TOTAL: undefined
    },
    BUG_FIXES: {
        URL: `${LINKS.GITHUB_URL}/zk-kit/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22bug%20%F0%9F%90%9B%22`,
        TOTAL: undefined
    },
    FEATURE_REQUESTS: {
        URL: `${LINKS.GITHUB_URL}/zk-kit/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22feature%20%3Arocket%3A%22`,
        TOTAL: undefined
    },
    DOCUMENTATION_ISSUES: {
        URL: `${LINKS.GITHUB_URL}/zk-kit/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22documentation%20%20%F0%9F%93%96%22`,
        TOTAL: undefined
    }
}
