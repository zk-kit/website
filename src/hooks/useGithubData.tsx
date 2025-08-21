import { useState, useEffect } from "react"
import { LINKS } from "@site/src/constants"

interface IssueCategory {
    url: string
    total: number
}

interface GitHubData {
    goodFirstIssues: IssueCategory
    bugFixes: IssueCategory
    featureRequests: IssueCategory
    documentationIssues: IssueCategory
}

export const useGithubData = () => {
    const [data, setData] = useState<GitHubData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                setLoading(true)

                // Use search API with single request to avoid rate limiting
                const response = await fetch(
                    `${LINKS.GITHUB_API_BASE_URL.replace("/repos/", "/search/issues?q=repo:")}/zk-kit+is:open+is:issue`
                )
                const searchResults = await response.json()

                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`)
                }

                const issues = searchResults.items || []

                // Filter issues by labels (matching exact GitHub label names)
                const goodFirstIssues = issues.filter((issue: any) =>
                    issue.labels.some((label: any) => label.name === "good first issue")
                )
                const bugIssues = issues.filter((issue: any) =>
                    issue.labels.some((label: any) => label.name === "bug 🐛")
                )
                const featureIssues = issues.filter((issue: any) =>
                    issue.labels.some((label: any) => label.name === "feature :rocket:")
                )
                const docIssues = issues.filter((issue: any) =>
                    issue.labels.some((label: any) => label.name === "documentation  📖")
                )

                setData({
                    goodFirstIssues: {
                        url: `${LINKS.GITHUB_URL}/zk-kit/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22`,
                        total: goodFirstIssues.length
                    },
                    bugFixes: {
                        url: `${LINKS.GITHUB_URL}/zk-kit/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22bug%20%F0%9F%90%9B%22`,
                        total: bugIssues.length
                    },
                    featureRequests: {
                        url: `${LINKS.GITHUB_URL}/zk-kit/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22feature%20%3Arocket%3A%22`,
                        total: featureIssues.length
                    },
                    documentationIssues: {
                        url: `${LINKS.GITHUB_URL}/zk-kit/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22documentation%20%20%F0%9F%93%96%22`,
                        total: docIssues.length
                    }
                })
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch GitHub data")
                // Provide fallback data to avoid empty state
                setData({
                    goodFirstIssues: {
                        url: `${LINKS.GITHUB_URL}/zk-kit/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22`,
                        total: 0
                    },
                    bugFixes: {
                        url: `${LINKS.GITHUB_URL}/zk-kit/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22bug%20%F0%9F%90%9B%22`,
                        total: 0
                    },
                    featureRequests: {
                        url: `${LINKS.GITHUB_URL}/zk-kit/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22feature%20%3Arocket%3A%22`,
                        total: 0
                    },
                    documentationIssues: {
                        url: `${LINKS.GITHUB_URL}/zk-kit/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22documentation%20%20%F0%9F%93%96%22`,
                        total: 0
                    }
                })
            } finally {
                setLoading(false)
            }
        }

        fetchGithubData()
    }, [])

    return { data, loading, error }
}
