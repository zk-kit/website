import { AppContent } from "@site/src/components/AppContent"
import { AboutCard, AboutCardImage } from "@site/src/components/cards/AboutCard"
import { AppPageLayoutWrapper } from "@site/src/components/layouts/AppPageLayoutWrapper"
import { Label } from "@site/src/components/ui/Label"
import { ResponsiveSlider } from "@site/src/components/ui/ResponsiveSlider"
import { useMediaQuery } from "react-responsive"
import { SEO } from "@site/src/components/SEO"

export default function AboutPage() {
    return (
        <>
            <SEO
                title="About Us"
                description="Learn about ZK-Kit, our growth, and commitment to the developer community. Discover our key figures and statistics."
                keywords={["ZK-Kit", "about", "zero-knowledge", "cryptography", "developer tools", "statistics"]}
            />
            <AppPageLayoutWrapper className="flex flex-col gap-10 lg:gap-16">
                <section className="flex flex-col gap-9">
                    <div className="flex flex-col gap-10 lg:gap-20">
                        <div
                            className="lg:container lg:mx-auto h-[141px] lg:h-[223px] mx-auto lg:w-auto w-full  bg-repeat bg-center lg:bg-no-repeat lg:bg-contain bg-cover"
                            style={{
                                backgroundImage: "url(/img/illustrations/about-page-illustration.svg)"
                            }}
                        ></div>

                        <AppContent className="flex flex-col items-center gap-[10px] text-center">
                            <Label.PageTitle>About us</Label.PageTitle>
                            <span className="font-satoshi text-base text-app-color-text-secondary lg:max-w-[413px]">
                                Here are some key figures that illustrate our growth and commitment to the developer
                                community.
                            </span>
                        </AppContent>

                        <AppContent className="lg:border lg:border-app-color-border">
                            <ResponsiveSlider
                                desktopClassName="lg:!grid !grid-cols-1 md:!grid-cols-3 lg:divide-x lg:divide-y lg:divide-app-color-border"
                                slidesToShow={1.2}
                                gap="16px"
                                autoSlide={false}
                            >
                                <AboutCard value="50+" title="ZK Components" description="Battle-tested packages" />
                                <AboutCardImage />
                                <AboutCard value="5" title="Languages" description="Multi-language support" />
                                <AboutCard value="10K+" title="Downloads" description="Monthly package downloads" />
                                <AboutCard value="200+" title="Contributors" description="Community developers" />
                                <AboutCardImage />
                                <AboutCardImage />
                                <AboutCard value="15" title="Countries" description="Global developer reach" />
                                <AboutCard value="95%" title="Uptime" description="Infrastructure reliability" />
                            </ResponsiveSlider>
                        </AppContent>
                    </div>
                </section>
            </AppPageLayoutWrapper>
        </>
    )
}
