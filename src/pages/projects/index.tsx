import { Banner } from "@site/src/components/ui/Banner"
import { ProjectCard } from "@site/src/components/cards/ProjectCard"
import { AppContent } from "@site/src/components/AppContent"
import { projects } from "@site/src/content"
import { Icons } from "@site/src/components/ui/Icons"
import { useState } from "react"
import { Label } from "@site/src/components/ui/Label"
import { ActionButton, Button } from "@site/src/components/ui/Button"
import { AppPageLayoutWrapper } from "@site/src/components/layouts/AppPageLayoutWrapper"
import { SEO } from "@site/src/components/SEO"
import { MAX_PROJECTS_TO_SHOW } from "@site/src/constants"


export default function ProjectsPage() {
    const [showAllProjects, setShowAllProjects] = useState(false)
    const showMoreProjects = projects.length > MAX_PROJECTS_TO_SHOW

    return (
        <>
            <SEO
                title="Projects"
                description="Discover a curated showcase of innovative projects and applications built with ZK-Kit. See what developers are creating with our zero-knowledge libraries."
                keywords={[
                    "ZK-Kit",
                    "projects",
                    "zero-knowledge",
                    "showcase",
                    "applications",
                    "developer community",
                    "cryptography"
                ]}
            />
            <AppPageLayoutWrapper>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-14 lg:gap-20">
                        <section className="flex flex-col gap-9">
                            <div className="flex flex-col gap-10 lg:gap-20">
                                <div
                                    className="lg:container lg:mx-auto h-[141px] lg:h-[170px]"
                                    style={{
                                        backgroundImage: "url(/img/illustrations/projects-page-illustration.svg)",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "repeat-x"
                                    }}
                                ></div>

                                <AppContent className="flex flex-col items-center gap-[10px] text-center">
                                    <Label.PageTitle>Built with ZK - Kit</Label.PageTitle>
                                    <span className="font-satoshi text-base text-app-color-text-secondary lg:max-w-[410px]">
                                        Discover a curated showcase of innovative projects and applications built with
                                        ZK-Kit.
                                    </span>
                                </AppContent>
                            </div>
                            <Button className="mx-auto w-fit">Submit your project</Button>
                        </section>

                        <div className="flex flex-col gap-10 lg:gap-[140px]">
                            <section className="border-t border-b border-app-color-border divide-y divide-app-color-border">
                                <AppContent className="grid grid-cols-1 lg:divide-y-none divide-y divide-app-color-border lg:grid-cols-[1fr_1fr] lg:gap-[30px] border-r border-l border-app-color-border">
                                    <div className="p-5 lg:p-[30px] flex flex-col gap-5 lg:border-r lg:border-app-color-border">
                                        <span className="text-[28px] text-app-color-text-base font-clash-grotesk font-normal">
                                            All Languages
                                        </span>
                                    </div>
                                    <div className="p-5 lg:p-[30px] flex flex-col gap-5 lg:border-l lg:border-app-color-border">
                                        <span className="text-[28px] text-app-color-text-base font-clash-grotesk font-normal">
                                            All Use Cases
                                        </span>
                                    </div>
                                </AppContent>

                                <AppContent
                                    as="section"
                                    className="flex flex-col gap-10 py-10 lg:py-[90px] border-l border-r border-app-color-border overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] lg:px-[100px]">
                                        {projects
                                            .slice(0, showAllProjects ? projects.length : MAX_PROJECTS_TO_SHOW)
                                            .map((project, index) => (
                                                <a href={project.url || "#"} key={index}>
                                                    <ProjectCard
                                                        className="lg:!border !border-r-0 !border-l-0"
                                                        {...project}
                                                    />
                                                </a>
                                            ))}
                                    </div>
                                    {showMoreProjects && !showAllProjects && (
                                        <ActionButton onClick={() => setShowAllProjects(!showAllProjects)}>
                                            <Icons.ArrowDown />
                                        </ActionButton>
                                    )}
                                </AppContent>
                            </section>
                        </div>
                    </div>

                    <Banner
                        title="Built something amazing?"
                        description="Share your ZK-Kit powered project with the community and inspire other developers."
                        illustration="/img/illustrations/build-projects-illustration.svg"
                        illustrationWidth={117}
                        illustrationOnMobile={2}
                    ></Banner>
                </div>
            </AppPageLayoutWrapper>
        </>
    )
}
