import React, { type ReactNode } from "react"
import clsx from "clsx"
import { useWindowSize } from "@docusaurus/theme-common"
import { useDoc } from "@docusaurus/plugin-content-docs/client"
import DocItemPaginator from "@theme/DocItem/Paginator"
import DocVersionBanner from "@theme/DocVersionBanner"
import DocVersionBadge from "@theme/DocVersionBadge"
import DocItemFooter from "@theme/DocItem/Footer"
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile"
import DocItemTOCDesktop from "@theme/DocItem/TOC/Desktop"
import DocItemContent from "@theme/DocItem/Content"
import DocBreadcrumbs from "@theme/DocBreadcrumbs"
import ContentVisibility from "@theme/ContentVisibility"
import type { Props } from "@theme/DocItem/Layout"

function useDocTOC() {
    const { frontMatter, toc } = useDoc()
    const windowSize = useWindowSize()

    const hidden = frontMatter.hide_table_of_contents
    const canRender = !hidden && toc.length > 0

    const mobile = canRender ? <DocItemTOCMobile /> : undefined

    const desktop = canRender && (windowSize === "desktop" || windowSize === "ssr") ? <DocItemTOCDesktop /> : undefined

    return {
        hidden,
        mobile,
        desktop
    }
}

export default function DocItemLayout({ children }: Props): ReactNode {
    const docTOC = useDocTOC()
    const { metadata } = useDoc()

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] divide-x divide-app-color-border">
            <div className="py-5 lg:py-[30px] px-4 lg:px-[30px] lg:h-[calc(100vh-200px)] overflow-y-auto">
                <ContentVisibility metadata={metadata} />
                <DocVersionBanner />
                <div className="flex flex-col gap-6">
                    <article>
                        <DocBreadcrumbs />
                        <DocVersionBadge />
                        {docTOC.mobile}
                        <DocItemContent>{children}</DocItemContent>
                        <DocItemFooter />
                    </article>
                    <DocItemPaginator />
                </div>
            </div>
            {docTOC.desktop && <div className="sticky top-[100px] lg:pl-[30px]">{docTOC.desktop}</div>}
        </div>
    )
}
