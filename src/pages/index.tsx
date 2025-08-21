import type { ReactNode } from "react"
import { FeatureCard } from "@site/src/components/cards/FeatureCard"
import { AppContent } from "../components/AppContent"
import { LanguageCard } from "../components/cards/LanguageCard"
import { features, languages } from "../content"
import { Banner } from "../components/ui/Banner"
import { Button } from "../components/ui/Button"
import { Icons } from "../components/ui/Icons"
import { AppPageLayoutWrapper } from "../components/layouts/AppPageLayoutWrapper"
import { SEO } from "../components/SEO"
import { Label } from "../components/ui/Label"
import { SEO_DATA } from "../constants"

export default function HomePage(): ReactNode {
    return (
        <>
            <SEO
                title={SEO_DATA.INDEX_PAGE.TITLE}
                description={SEO_DATA.INDEX_PAGE.DESCRIPTION}
                keywords={SEO_DATA.INDEX_PAGE.KEYWORDS}
            />
            <AppPageLayoutWrapper>
                <div className="flex flex-col gap-10 lg:gap-[140px]">
                    <AppContent as="section" className="flex flex-col gap-16">
                        <div className="flex flex-col gap-5 lg:gap-0 lg:grid lg:grid-cols-[minmax(0,600px)_400px] lg:items-center lg:justify-between">
                            <span className="text-5xl text-app-color-text-base lg:text-[80px] font-normal font-clash-grotesk w-4/5 lg:w-full text-left">
                                Zero-Knowledge Development Libraries
                            </span>
                            <div className="flex flex-col gap-9">
                                <span className="text-base text-app-color-text-base font-satoshi">
                                    ZK-Kit is a set of libraries (algorithms, utility functions and data structures)
                                    that can be reused in different projects and zero-knowledge protocols.
                                </span>
                                <Button variant="primary" className="w-fit" withShadow>
                                    Use ZK-Kit
                                </Button>
                            </div>
                        </div>
                        <img
                            src="/img/illustrations/intro-illustration.svg"
                            alt="Zero-Knowledge Development Libraries"
                            className="w-full"
                            fetchPriority="high"
                            loading="eager"
                        />
                    </AppContent>

                    <section className="flex flex-col gap-10 lg:gap-16">
                        <AppContent>
                            <div className="flex flex-col gap-5 lg:gap-0 lg:grid lg:grid-cols-[minmax(0,600px)_400px] lg:items-center lg:justify-between">
                                <Label.PageTitle as="h3" size="md">
                                    Key Features
                                </Label.PageTitle>
                                <span className="text-base text-app-color-text-base font-satoshi">
                                    Everything you need to build robust, privacy-preserving applications.
                                </span>
                            </div>
                        </AppContent>
                        <div className="border-t border-b border-app-color-border">
                            <AppContent>
                                <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-app-color-border border-r border-l border-app-color-border">
                                    {features.map((feature, index) => (
                                        <FeatureCard
                                            key={index}
                                            text={feature.text}
                                            description={feature.description}
                                            image={feature.image}
                                        />
                                    ))}
                                </div>
                            </AppContent>
                        </div>
                    </section>

                    <AppContent as="section" className="flex flex-col gap-10 lg:gap-16">
                        <div className="flex flex-col gap-5 lg:gap-0 lg:grid lg:grid-cols-[minmax(0,600px)_400px] lg:items-center lg:justify-between">
                            <Label.PageTitle as="h3" size="md">
                                Supported Languages
                            </Label.PageTitle>
                            <span className="text-base text-app-color-text-base font-satoshi">
                                Native implementations across popular languages and frameworks.
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                            {languages.map((language, index) => (
                                <LanguageCard
                                    key={index}
                                    title={language.text}
                                    description={language.description}
                                    image={language.image}
                                    packages={language.packages}
                                    link={language.link}
                                />
                            ))}
                        </div>
                    </AppContent>

                    <Banner
                        title="Join the community"
                        description="Connect with other contributors, get help, and stay updated on the latest developments."
                        illustration="/img/illustrations/join-banner-illustration.svg"
                        illustrationWidth={234}
                    >
                        <div className="flex lg:flex-row flex-col gap-3">
                            <Button className="mx-auto w-fit" icon={<Icons.Github />}>
                                <span>GitHub</span>
                            </Button>
                            <Button className="mx-auto w-fit" icon={<Icons.Signal />}>
                                <span>Signal</span>
                            </Button>
                        </div>
                    </Banner>
                </div>
            </AppPageLayoutWrapper>
        </>
    )
}
