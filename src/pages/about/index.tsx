import { AppContent } from "@site/src/components/AppContent"
import { AboutCard, AboutCardImage } from "@site/src/components/cards/AboutCard"
import { AppPageLayoutWrapper } from "@site/src/components/layouts/AppPageLayoutWrapper"
import { Label } from "@site/src/components/ui/Label"
import { ResponsiveSlider } from "@site/src/components/ui/ResponsiveSlider"
import { SEO } from "@site/src/components/SEO"
import { FeatureValueCard } from "@site/src/components/cards/FeatureValueCard"
import { SEO_DATA } from "@site/src/constants"
import { useImagePreload, getPageImages } from "@site/src/utils/imagePreloader"

export default function AboutPage() {
    useImagePreload(getPageImages("about"))
    return (
        <>
            <SEO
                title={SEO_DATA.ABOUT_PAGE.TITLE}
                description={SEO_DATA.ABOUT_PAGE.DESCRIPTION}
                keywords={SEO_DATA.ABOUT_PAGE.KEYWORDS}
            />
            <AppPageLayoutWrapper className="flex flex-col gap-10 lg:gap-16">
                <section className="flex flex-col gap-9">
                    <div className="flex flex-col gap-10 lg:gap-20">
                        <AppContent
                            onlyDesktopContainer
                            className="h-[120px] lg:h-[223px] bg-repeat bg-center lg:bg-no-repeat bg-contain"
                            style={{
                                backgroundImage: "url(/img/illustrations/about-page-illustration.svg)"
                            }}
                        />

                        <AppContent className="flex flex-col items-center gap-[10px] text-center">
                            <Label.PageTitle>About us</Label.PageTitle>
                            <span className="font-satoshi text-base text-app-color-text-secondary lg:max-w-[413px]">
                                Here are some key figures that illustrate our growth and commitment to the developer
                                community.
                            </span>
                        </AppContent>

                        <AppContent className="md:border md:border-app-color-border">
                            <ResponsiveSlider
                                desktopClassName="overflow-hidden !grid grid-cols-1 md:grid-cols-3 [&>*:not(:nth-child(3n))]:md:border-r [&>*:nth-child(n+4)]:md:border-t [&>*]:border-app-color-border"
                                mobileClassName="border-x border-app-color-border border-b border-t lg:border-none"
                                slidesToShow={1.1}
                                gap="16px"
                                autoSlide={false}
                            >
                                <AboutCard value="20+" title="Packages" description="Battle-tested" />
                                <AboutCardImage />
                                <AboutCard value="5" title="Languages" description="Multi-language support" />
                                <AboutCard value="1K+" title="Commits" description="Repository Commits" />
                                <AboutCard value="30+" title="Contributors" description="Community developers" />
                                <AboutCardImage />
                            </ResponsiveSlider>
                        </AppContent>

                        <AppContent className="flex flex-col gap-5 lg:max-w-[413px] lg:mx-auto lg:text-center lg:items-center">
                            <Label.PageTitle size="md">Our mission</Label.PageTitle>
                            <span className="font-satoshi text-base text-app-color-text-secondary">
                                ZK-Kit exists to democratize zero-knowledge technology by providing developers with
                                reliable, reusable components that make privacy-preserving applications accessible to
                                everyone.
                                <br />
                                <br />
                                We believe that privacy is a fundamental right, and our tools help developers build
                                applications that respect user privacy without sacrificing functionality.
                            </span>
                        </AppContent>

                        <AppContent className="flex flex-col gap-5 lg:max-w-[490px] lg:mx-auto">
                            <Label.PageTitle className="lg:text-center" size="md">
                                Our values
                            </Label.PageTitle>
                            <div className="flex flex-col gap-[14px] lg:w-full">
                                <FeatureValueCard
                                    title="Open Source"
                                    description="Transparent development with public code"
                                />
                                <FeatureValueCard
                                    title="Community-Driven"
                                    description="Built by and for the developer community"
                                />
                                <FeatureValueCard
                                    title="Security-First"
                                    description="Rigorous testing and security audits"
                                />
                                <FeatureValueCard
                                    title="Developer-Friendly"
                                    description="Easy to use with great documentation"
                                />
                            </div>
                        </AppContent>
                    </div>
                </section>
            </AppPageLayoutWrapper>
        </>
    )
}
