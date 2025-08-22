import { Banner } from "@site/src/components/ui/Banner"
import { ProjectCard } from "@site/src/components/cards/ProjectCard"
import { AppContent } from "@site/src/components/AppContent"
import { Icons } from "@site/src/components/ui/Icons"
import { Label } from "@site/src/components/ui/Label"
import { ActionButton, Button } from "@site/src/components/ui/Button"
import { AppPageLayoutWrapper } from "@site/src/components/layouts/AppPageLayoutWrapper"
import { SEO } from "@site/src/components/SEO"
import { LINKS, MAX_PROJECTS_TO_SHOW, SEO_DATA } from "@site/src/constants"
import { useProjects } from "@site/src/hooks/useProjects"
import { Tag } from "@site/src/components/ui/Tag"

export default function ProjectsPage() {
    const {
        filteredProjects: projects,
        showAllProjects,
        setShowAllProjects,
        showMoreProjects,
        projectsLanguages,
        projectsUseCases,
        toggleLanguageSelection,
        toggleUseCaseSelection,
        selectedLanguages,
        selectedUseCases
    } = useProjects()

    return (
        <>
            <SEO
                title={SEO_DATA.PROJECTS_PAGE.TITLE}
                description={SEO_DATA.PROJECTS_PAGE.DESCRIPTION}
                keywords={SEO_DATA.PROJECTS_PAGE.KEYWORDS}
            />
            <AppPageLayoutWrapper>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-14 lg:gap-20">
                        <section className="flex flex-col gap-9 ">
                            <div className="flex flex-col gap-10 lg:gap-20">
                                <AppContent
                                    onlyDesktopContainer
                                    className="h-[141px] lg:h-[170px]"
                                    style={{
                                        backgroundImage: "url(/img/illustrations/projects-page-illustration.svg)",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "repeat-x"
                                    }}
                                ></AppContent>

                                <AppContent className="flex flex-col items-center gap-[10px] text-center">
                                    <Label.PageTitle className="w-2/3 lg:w-full">Built with ZK - Kit</Label.PageTitle>
                                    <span className="font-satoshi text-base text-app-color-text-secondary lg:max-w-[410px]">
                                        Discover a curated showcase of innovative projects and applications built with
                                        ZK-Kit.
                                    </span>
                                </AppContent>
                            </div>
                            <div className="mx-auto">
                                <Button className="w-fit" href={LINKS.SUBMIT_PROJECT} isExternal>
                                    Submit your project
                                </Button>
                            </div>
                        </section>

                        <div className="flex flex-col gap-10 lg:gap-[140px]">
                            <section className="border-t border-b border-app-color-border divide-y divide-app-color-border">
                                <AppContent className="grid grid-cols-1 lg:divide-y-0 divide-y divide-app-color-border lg:grid-cols-[1fr_1fr] lg:gap-[30px] border-r border-l border-app-color-border">
                                    <div className="p-5 lg:p-[30px] flex flex-col gap-5 lg:border-r lg:border-app-color-border">
                                        <span className="text-[28px] text-app-color-text-base font-clash-grotesk font-normal">
                                            All Languages
                                        </span>
                                        <div className="flex gap-[10px] flex-wrap">
                                            {projectsLanguages.map((language) => {
                                                const isSelected = selectedLanguages.includes(language)
                                                return (
                                                    <Tag
                                                        key={language}
                                                        text={language}
                                                        size="sm"
                                                        onClick={() => toggleLanguageSelection(language)}
                                                        isActive={isSelected}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="p-5 lg:p-[30px] flex flex-col gap-5 lg:border-l lg:border-app-color-border">
                                        <span className="text-[28px] text-app-color-text-base font-clash-grotesk font-normal">
                                            All Use Cases
                                        </span>
                                        <div className="flex gap-[10px] flex-wrap">
                                            {projectsUseCases.map((useCase) => {
                                                const isSelected = selectedUseCases.includes(useCase)
                                                return (
                                                    <Tag
                                                        key={useCase}
                                                        text={useCase}
                                                        size="sm"
                                                        onClick={() => toggleUseCaseSelection(useCase)}
                                                        isActive={isSelected}
                                                    />
                                                )
                                            })}
                                        </div>
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
                                                <a href={project.url || "#"} key={index} target="_blank" rel="noopener noreferrer">
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
                    >
                        <Button className="w-fit" href={LINKS.SUBMIT_PROJECT} isExternal>
                            Submit your project
                        </Button>
                    </Banner>
                </div>
            </AppPageLayoutWrapper>
        </>
    )
}
