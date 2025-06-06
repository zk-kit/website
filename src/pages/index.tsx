import type { ReactNode } from "react"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import FeatureCard from "@site/src/components/FeatureCard"
import LanguageCard from "@site/src/components/LanguageCard"
import { TbPackages } from "react-icons/tb"
import { LuPuzzle, LuBookOpen, LuShieldCheck, LuHandshake } from "react-icons/lu"

const features = [
    {
        text: "Language-Specific Packages",
        description:
            "Dedicated libraries for multiple programming languages, making it easy to build in your preferred environment.",
        icon: <TbPackages />
    },
    {
        text: "Modular Design",
        description:
            "Each package is independent and composable, so you can include only the parts relevant to your project.",
        icon: <LuPuzzle />
    },
    {
        text: "Fully Documented",
        description:
            "Comprehensive documentation, usage examples, and test coverage, ensuring a smooth development process.",
        icon: <LuBookOpen />
    },
    {
        text: "Battle-Tested",
        description:
            "Used in real-world ZK apps and protocols, ensuring stability and performance in production environments.",
        icon: <LuShieldCheck />
    },
    {
        text: "Community-Driven",
        description: "Built by and for developers, maintained openly with contributions from across the ecosystem.",
        icon: <LuHandshake />
    }
]

const languages = [
    { text: "Circom", link: "https://github.com/privacy-scaling-explorations/zk-kit.circom" },
    { text: "JavaScript", link: "https://github.com/privacy-scaling-explorations/zk-kit" },
    { text: "Solidity", link: "https://github.com/privacy-scaling-explorations/zk-kit.solidity" },
    { text: "Noir", link: "https://github.com/privacy-scaling-explorations/zk-kit.noir" },
    { text: "Rust", link: "https://github.com/privacy-scaling-explorations/zk-kit.rust" }
]

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center p-14">
                <div className="text-3xl font-medium mb-5">Zero-Knowledge Development Libraries</div>
                <div className="text-xl font-medium max-w-2xl">
                    ZK-Kit is a set of libraries (algorithms, utility functions and data structures) that can be reused
                    in different projects and zero-knowledge protocols.
                </div>
            </div>
            <div className="flex flex-col items-center justify-center p-14">
                <div className="text-3xl font-medium mb-16">Key Features</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            text={feature.text}
                            description={feature.description}
                            icon={feature.icon}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center justify-center p-14">
                <div className="text-3xl font-medium mb-16">Supported Languages</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {languages.map((language, index) => (
                        <LanguageCard key={index} text={language.text} link={language.link} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}
