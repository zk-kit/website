import React, { type ReactNode } from "react"
import DocSidebar from "@theme-original/DocSidebar"
import type { Props } from "@theme/DocSidebar"

export default function DocSidebarWrapper(props: Props): ReactNode {
    return (
        <div className="flex justify-stretch bg-app-color-background-secondary h-full lg:pt-10">
            <DocSidebar {...props} />
        </div>
    )
}
