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
import { LINKS, SEO_DATA } from "../constants"
import { ResponsiveSlider } from "../components/ui/ResponsiveSlider"
import { useProjects } from "../hooks/useProjects"
import { ProjectCard } from "../components/cards/ProjectCard"

const LanguageVectorMapping = {
    0: (
        <div className="h-[200px] lg:h-[230px] w-full bg-[url('/img/vectors/language-vector-1.svg')] hover:bg-[url('/img/vectors/language-vector-1-active.svg')] bg-contain bg-no-repeat bg-center duration-200" />
    ),
    1: (
        <div className="h-[200px] lg:h-[230px] w-full bg-[url('/img/vectors/language-vector-2.svg')] hover:bg-[url('/img/vectors/language-vector-2-active.svg')] bg-contain bg-no-repeat bg-center duration-200" />
    ),
    2: (
        <div className="h-[200px] lg:h-[230px] w-full bg-[url('/img/vectors/language-vector-3.svg')] hover:bg-[url('/img/vectors/language-vector-3-active.svg')] bg-contain bg-no-repeat bg-center duration-200" />
    ),
    3: (
        <div className="h-[200px] lg:h-[230px] w-full bg-[url('/img/vectors/language-vector-4.svg')] hover:bg-[url('/img/vectors/language-vector-4-active.svg')] bg-contain bg-no-repeat bg-center duration-200" />
    ),
    4: (
        <div className="h-[200px] lg:h-[230px] w-full bg-[url('/img/vectors/language-vector-5.svg')] hover:bg-[url('/img/vectors/language-vector-5-active.svg')] bg-contain bg-no-repeat bg-center duration-200" />
    )
}

export default function HomePage(): ReactNode {
    const { featuredProjects } = useProjects()

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
                            <Label.PageTitle className="w-4/5 lg:w-full text-left">
                                Zero-Knowledge Development Libraries
                            </Label.PageTitle>
                            <div className="flex flex-col gap-9">
                                <span className="text-base text-app-color-text-base font-satoshi">
                                    ZK-Kit is a set of libraries (algorithms, utility functions and data structures)
                                    that can be reused in different projects and zero-knowledge protocols.
                                </span>
                                <Button
                                    variant="primary"
                                    className="w-fit"
                                    withShadow
                                    href={LINKS.USE_ZK_KIT_URL}
                                    isExternal
                                >
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
                                <div className="group grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-app-color-border border-r border-l border-app-color-border">
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
                                    image={LanguageVectorMapping[index]}
                                    packages={language.packages}
                                    link={language.link}
                                />
                            ))}
                        </div>
                    </AppContent>

                    <section className="flex flex-col gap-16">
                        <AppContent className="flex flex-col gap-5 lg:gap-0 lg:grid lg:grid-cols-[minmax(0,600px)_400px] lg:items-center lg:justify-between">
                            <Label.PageTitle as="h3" size="md">
                                Featured Projects
                            </Label.PageTitle>
                            <span className="text-base text-app-color-text-base font-satoshi">
                                Discover what the community is building with ZK-Kit
                            </span>
                        </AppContent>

                        <ResponsiveSlider
                            forceSlider
                            controlsPosition="top"
                            slidesToShow={1.1}
                            desktopSlidesToShow={3.8}
                            withDivider={false}
                            className="pl-4"
                        >
                            {featuredProjects.map((project, index) => {
                                const isLast = index === featuredProjects.length - 1
                                return (
                                    <a key={index} href={project.url ?? "#"} target="_blank" rel="noopener noreferrer">
                                        <ProjectCard
                                            title={project.title}
                                            description={project.description}
                                            image={project.image}
                                            languages={project.languages}
                                            className={`!border-r-[0]  lg:!border-r ${isLast ? "!border-r-0" : ""}`}
                                        />
                                    </a>
                                )
                            })}
                        </ResponsiveSlider>
                    </section>

                    <Banner
                        title="Join the community"
                        description="Connect with other contributors, get help, and stay updated on the latest developments."
                        illustration="/img/illustrations/join-banner-illustration.svg"
                        illustrationWidth={234}
                    >
                        <div className="flex lg:flex-row flex-col gap-3">
                            <Button
                                className="mx-auto w-fit"
                                icon={<Icons.Github className="text-app-color-text-primary" />}
                                href={LINKS.GITHUB_URL}
                                isExternal
                            >
                                <span>GitHub</span>
                            </Button>
                            <Button
                                className="mx-auto w-fit"
                                icon={<Icons.Signal className="text-app-color-text-primary" />}
                                href={LINKS.SIGNAL_URL}
                                isExternal
                            >
                                <span>Signal</span>
                            </Button>
                        </div>
                    </Banner>
                </div>
            </AppPageLayoutWrapper>
        </>
    )
}
