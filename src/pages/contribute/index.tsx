import { AppContent } from "@site/src/components/AppContent"
import { Icons } from "@site/src/components/ui/Icons"
import { Label } from "@site/src/components/ui/Label"
import { AppPageLayoutWrapper } from "@site/src/components/layouts/AppPageLayoutWrapper"
import { ContributeSectionCard } from "@site/src/components/cards/ContributeSectionCard"
import { AuditSectionCard } from "@site/src/components/cards/AuditSectionCard"
import { contribute } from "@site/src/content"
import { ContributeCard } from "@site/src/components/cards/ContributeCard"
import { SEO } from "@site/src/components/SEO"
import { FeatureValueCard } from "@site/src/components/cards/FeatureValueCard"
import { ActionButton, Button } from "@site/src/components/ui/Button"
import { CardBase } from "@site/src/components/cards/CardBase"
import { BulletPoint } from "@site/src/components/ui/BulletPoint"
import { GITHUB_DATA, LINKS, SEO_DATA } from "@site/src/constants"
import { useImagePreload, getPageImages } from "@site/src/utils/imagePreloader"

const IssueData = () => {
    return (
        <div className="flex flex-col gap-[10px] ml-auto">
            <div className="flex items-center gap-1 justify-end">
                <span className="text-app-color-primary text-xs tracking-[0.96px] font-medium font-clash-grotesk">
                    BROWSE
                </span>
                <Icons.ExternalLink className="text-app-color-primary" />
            </div>
        </div>
    )
}

export default function ContributePage() {
    useImagePreload(getPageImages("contribute"))

    return (
        <>
            <SEO
                title={SEO_DATA.CONTRIBUTE_PAGE.TITLE}
                description={SEO_DATA.CONTRIBUTE_PAGE.DESCRIPTION}
                keywords={SEO_DATA.CONTRIBUTE_PAGE.KEYWORDS}
            />

            <AppPageLayoutWrapper>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-14 lg:gap-20">
                        <AppContent className="flex flex-col gap-9">
                            <div className="flex flex-col gap-10 lg:gap-20">
                                <AppContent
                                    onlyDesktopContainer
                                    className="h-[141px] lg:h-[170px]"
                                    style={{
                                        backgroundImage: "url(/img/illustrations/contribute-page-illustration.svg)",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "repeat-x"
                                    }}
                                />

                                <AppContent className="flex flex-col items-center gap-[10px] text-center">
                                    <Label.PageTitle className="w-2/3 lg:w-full">Contribute to ZK-Kit</Label.PageTitle>
                                    <span className="font-satoshi text-base text-app-color-text-secondary lg:max-w-[475px]">
                                        For individuals or teams who want to help ZK-Kit grow and improve. Choose the
                                        contribution path that matches your skills and interests.
                                    </span>
                                </AppContent>
                            </div>
                        </AppContent>

                        <AppContent>
                            <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-4">
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
                                                className="text-app-color-tag-background w-full h-[138px] lg:h-auto mx-auto"
                                                index={1}
                                            />
                                        }
                                        index={index + 1}
                                    />
                                ))}
                            </div>
                        </AppContent>

                        <div className="flex flex-col gap-14 lg:gap-[100px]">
                            <ContributeSectionCard
                                index={1}
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
                                content={
                                    <div className="flex flex-col gap-[18px]">
                                        <a
                                            href={GITHUB_DATA?.GOOD_FIRST_ISSUES.URL ?? "#   "}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:[&>div]:bg-app-color-background-secondary"
                                        >
                                            <FeatureValueCard
                                                title="Open Issues"
                                                description="Join the effort"
                                                value={<IssueData />}
                                            />
                                        </a>
                                    </div>
                                }
                            >
                                <CardBase
                                    className="my-auto"
                                    title="Getting Started Checklist"
                                    actions={
                                        <Button href={LINKS.VIEW_ALL_ISSUES} withShadow={true} isExternal>
                                            View issues on Github
                                        </Button>
                                    }
                                >
                                    <div className="flex flex-col gap-[10px]">
                                        <BulletPoint title="Fork the ZK-Kit repository" />
                                        <BulletPoint title="Read the contribution guidelines" />
                                        <BulletPoint title="Set up your development environment" />
                                        <BulletPoint title="Find an issue to work on" />
                                        <BulletPoint title="Create a feature branch" />
                                        <BulletPoint title="Make your changes with tests" />
                                        <BulletPoint title="Submit a pull request" />
                                    </div>
                                </CardBase>
                            </ContributeSectionCard>

                            <ContributeSectionCard
                                index={2}
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
                                content={
                                    <div className="flex flex-col gap-5">
                                        <span className="text-app-color-text-base text-2xl font-satoshi font-normal">
                                            Partnership Benefits
                                        </span>
                                        <div className="flex flex-col gap-[18px]">
                                            <FeatureValueCard
                                                title="Strategic Input"
                                                description="Influence roadmap and feature development priorities"
                                            />
                                            <FeatureValueCard
                                                title="Brand Recognition"
                                                description="Recognition as an official ZK-Kit partner"
                                            />
                                        </div>
                                    </div>
                                }
                            >
                                <CardBase
                                    className="my-auto"
                                    title="Partnership Types"
                                    actions={
                                        <Button href={LINKS.APPLY_TO_BE_A_PARTNER} withShadow={true} isExternal>
                                            Apply to be a partner
                                        </Button>
                                    }
                                >
                                    <div className="flex flex-col gap-[10px]">
                                        <BulletPoint title="Financial sponsorship and funding" />
                                        <BulletPoint title="Infrastructure and hosting resources" />
                                        <BulletPoint title="Developer time and expertise" />
                                        <BulletPoint title="Marketing and community outreach" />
                                    </div>
                                </CardBase>
                            </ContributeSectionCard>

                            <ContributeSectionCard
                                index={3}
                                id="become-a-maintainer"
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
                                content={
                                    <div className="flex flex-col gap-5">
                                        <span className="text-app-color-text-base text-2xl font-satoshi font-normal">
                                            Maintainer Responsabilities
                                        </span>
                                        <div className="flex flex-col gap-[18px]">
                                            <FeatureValueCard
                                                title="Package Ownership"
                                                description="Take ownership of specific ZK-Kit packages and components"
                                            />
                                            <FeatureValueCard
                                                title="Code Review"
                                                description="Review pull requests and provide constructive feedback"
                                            />
                                            <FeatureValueCard
                                                title="Issue Triage"
                                                description="Help categorize and prioritize incoming issues"
                                            />
                                            <FeatureValueCard
                                                title="Release Management"
                                                description="Assist with version releases and changelog maintenance"
                                            />
                                            <FeatureValueCard
                                                title="Community Support"
                                                description="Help answer questions and support community members"
                                            />
                                        </div>
                                    </div>
                                }
                            >
                                <>
                                    <CardBase
                                        className="my-auto"
                                        title="Requirements"
                                        actions={
                                            <Button href={LINKS.APPLY_TO_BE_A_MAINTAINER} withShadow={true} isExternal>
                                                Apply to be a maintainer
                                            </Button>
                                        }
                                    >
                                        <div className="flex flex-col gap-[10px]">
                                            <BulletPoint title="Successfully helped as contributor, or" />
                                            <BulletPoint title="Integrates a new package to ZK-Kit, and" />
                                            <BulletPoint title="Adheres to ZK-Kit Community Guide" />
                                        </div>
                                    </CardBase>
                                </>
                            </ContributeSectionCard>

                            <AuditSectionCard
                                index={4}
                                id="audit-a-package"
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
                                content={
                                    <>
                                        <Button
                                            className="lg:w-max w-full"
                                            href={LINKS.AUDIT_GUIDE}
                                            withShadow={true}
                                            isExternal
                                        >
                                            View All Opportunities
                                        </Button>
                                        <div className="lg:grid lg:grid-cols-2 flex flex-col  gap-[18px]">
                                            <FeatureValueCard
                                                title="Security Audit"
                                                description="Review code for security vulnerabilities and best practices"
                                            />
                                            <FeatureValueCard
                                                title="Code Quality"
                                                description="Assess code structure, documentation, and maintainability"
                                            />
                                            <FeatureValueCard
                                                title="Performance Review"
                                                description="Analyze performance characteristics and optimization opportunities"
                                            />
                                            <FeatureValueCard
                                                title="Compliance Check"
                                                description="Ensure adherence to project standards and guidelinesn"
                                            />
                                        </div>
                                    </>
                                }
                            ></AuditSectionCard>
                            <a href="#" className="flex justify-center items-center w-full gap-2 group">
                                <div className="flex flex-col gap-3">
                                    <ActionButton className="flex flex-col gap-0">
                                        <Icons.ArrowDown className="rotate-180" />
                                    </ActionButton>
                                    <span className="text-app-color-text-secondary text-base font-satoshi group-hover:text-app-color-text-base duration-200">
                                        Back to top
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </AppPageLayoutWrapper>
        </>
    )
}
