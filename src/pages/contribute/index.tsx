import { Banner } from "@site/src/components/ui/Banner"
import { AppContent } from "@site/src/components/AppContent"
import { Icons } from "@site/src/components/ui/Icons"
import { useState } from "react"
import { Label } from "@site/src/components/ui/Label"
import { AppPageLayoutWrapper } from "@site/src/components/layouts/AppPageLayoutWrapper"
import { ContributeSectionCard } from "@site/src/components/cards/ContributeSectionCard"
import { contribute } from "@site/src/content"
import { ContributeCard } from "@site/src/components/cards/ContributeCard"
import { ResponsiveSlider } from "@site/src/components/ui/ResponsiveSlider"
import { SEO } from "@site/src/components/SEO"

const MAX_PROJECTS_TO_SHOW = 9

export default function ContributePage() {
    const [showAllProjects, setShowAllProjects] = useState(false)

    return (
        <>
            <SEO 
                title="Contribute"
                description="Help ZK-Kit grow and improve. Choose your contribution path - from picking issues to becoming a maintainer or partner."
                keywords={["ZK-Kit", "contribute", "open-source", "community", "maintainer", "partner", "issues", "development"]}
            />
            <AppPageLayoutWrapper>
            <div className="flex flex-col lg:pt-[140px]">
                <div className="flex flex-col gap-14 lg:gap-20">
                    <section className="flex flex-col gap-9">
                        <div className="flex flex-col gap-10 lg:gap-20">
                            <div
                                className="lg:container lg:mx-auto h-[141px] lg:h-[170px]"
                                style={{
                                    backgroundImage: "url(/img/illustrations/contribute-page-illustration.svg)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "repeat-x"
                                }}
                            ></div>

                            <AppContent className="flex flex-col items-center gap-[10px] text-center">
                                <Label.PageTitle>Contribute to ZK-Kit</Label.PageTitle>
                                <span className="font-satoshi text-base text-app-color-text-secondary lg:max-w-[475px]">
                                    For individuals or teams who want to help ZK-Kit grow and improve. Choose the
                                    contribution path that matches your skills and interests.
                                </span>
                            </AppContent>
                        </div>
                    </section>

                    <AppContent>
                        <ResponsiveSlider
                            desktopClassName="grid grid-cols-1 gap-[30px] lg:grid-cols-4"
                            autoSlide={false}
                            slidesToShow={1.2}
                            gap="20px"
                        >
                            {contribute.map((contribute, index) => (
                                <ContributeCard
                                    key={index}
                                    title={contribute.title}
                                    description={contribute.description}
                                    href={contribute.url}
                                    icon={
                                        <Icons.ContributeIcon
                                            width={207}
                                            height={138}
                                            className="text-app-color-tag-background w-full h-auto mx-auto"
                                            index={1}
                                        />
                                    }
                                    index={index + 1}
                                />
                            ))}
                        </ResponsiveSlider>
                    </AppContent>

                    <div className="flex flex-col gap-14 lg:gap-[100px]">
                        <ContributeSectionCard
                            id="pick-an-issue"
                            title="Pick an Issue"
                            description="Perfect for developers who want to contribute code, fix bugs, or add new features. We maintain a curated list of issues suitable for different skill levels."
                            icon={
                                <Icons.ContributeIcon
                                    width={80}
                                    height={54}
                                    className="text-app-color-tag-background"
                                    index={1}
                                />
                            }
                            index={1}
                        ></ContributeSectionCard>

                        <ContributeSectionCard
                            title="Become a Partner"
                            id="become-a-partner"
                            description="Perfect for businesses and organizations that use ZK-Kit in production and want to contribute resources, funding, or strategic guidance to help the project grow and evolve."
                            icon={
                                <Icons.ContributeIcon
                                    width={80}
                                    height={54}
                                    className="text-app-color-tag-background"
                                    index={2}
                                />
                            }
                            index={2}
                        ></ContributeSectionCard>

                        <ContributeSectionCard
                            title="Become a Maintainer"
                            description="Join our core team as a package maintainer and help shape the technical direction of ZK-Kit. Perfect for individual developers who want to take ownership of specific components and work closely with the community."
                            icon={
                                <Icons.ContributeIcon
                                    width={80}
                                    height={54}
                                    className="text-app-color-tag-background"
                                    index={3}
                                />
                            }
                            index={3}
                        ></ContributeSectionCard>

                        <ContributeSectionCard
                            title="Audit a Package"
                            description="Help ensure the security and reliability of ZK-Kit components through community-led code reviews and security audits. These are volunteer contributions that help maintain trust in the ecosystem and ensure the highest quality standards for all users."
                            icon={
                                <Icons.ContributeIcon
                                    width={80}
                                    height={54}
                                    className="text-app-color-tag-background"
                                    index={4}
                                />
                            }
                            index={4}
                        ></ContributeSectionCard>
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
