import React, { type ReactNode } from "react"
import { useLocation } from "@docusaurus/router"

import type { Props } from "@theme/BlogLayout"
import { AppPageLayoutWrapper } from "@site/src/components/layouts/AppPageLayoutWrapper"
import { AppContent } from "@site/src/components/AppContent"
import { Label } from "@site/src/components/ui/Label"

export default function BlogLayout(props: Props): ReactNode {
    const { toc, children } = props
    const location = useLocation()

    const isBlogListPage = location.pathname === "/blog" || location.pathname === "/blog/"

    if (isBlogListPage) {
        return (
            <AppPageLayoutWrapper className="flex flex-col gap-10 lg:gap-20">
                <div className="flex flex-col gap-10 lg:gap-20">
                    <AppContent
                        onlyDesktopContainer
                        className="h-[120px] lg:h-[223px] bg-repeat bg-center lg:bg-no-repeat bg-contain"
                        style={{
                            backgroundImage: "url(/img/illustrations/blog-page-illustration.svg)"
                        }}
                    />

                    <AppContent className="flex flex-col items-center gap-[10px] text-center">
                        <Label.PageTitle>Our Blog</Label.PageTitle>
                        <span className="font-satoshi text-base text-app-color-text-secondary lg:max-w-[413px]">
                            Stay informed with the latest updates, insights, and resources from our community.
                        </span>
                    </AppContent>
                </div>

                <AppContent className="flex flex-col gap-10 lg:gap-11">
                    <Label.PageTitle size="md">Articles</Label.PageTitle>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">{children}</div>
                </AppContent>
            </AppPageLayoutWrapper>
        )
    }

    return (
        <AppPageLayoutWrapper className="flex flex-col gap-10 lg:gap-20">
            <AppContent className="flex flex-col gap-10 lg:gap-11">
                {children}
                {toc && <div className="col col--2">{toc}</div>}
            </AppContent>
        </AppPageLayoutWrapper>
    )
}
