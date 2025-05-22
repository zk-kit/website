import type { ReactNode } from "react"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-14">
                <div className="text-3xl font-medium mb-5">
                    Zero-Knowledge Development Libraries
                </div>
                <div className="text-xl font-medium max-w-2xl">
                    ZK-Kit is a set of libraries (algorithms, utility functions and data structures) that can be reused
                    in different projects and zero-knowledge protocols, making it easier for developers to access
                    user-friendly, tested, and documented code.
                </div>
            </div>
            <div className="flex flex-col items-center justify-center p-14">
                <div className="text-3xl font-medium mb-5">
                    ZK-Kit Features
                </div>
                <div className="text-xl font-medium max-w-2xl">
                    
                </div>
            </div>
            <div className="flex flex-col items-center justify-center p-14">
                <div className="text-3xl font-medium mb-5">
                    ZK-Kit Languages
                </div>
                <div className="text-xl font-medium max-w-2xl">
                    
                </div>
            </div>
        </Layout>
    )
}
