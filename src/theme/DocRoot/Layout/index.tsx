import React, { type ReactNode, useState } from "react"
import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client"
import DocRootLayoutSidebar from "@theme/DocRoot/Layout/Sidebar"
import type { Props } from "@theme/DocRoot/Layout"
import { AppContent } from "@site/src/components/AppContent"

export default function DocRootLayout({ children }: Props): ReactNode {
    const sidebar = useDocsSidebar()
    const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false)

    return (
        <div
            id="doc-root-layout"
            className="min-h-screen grid grid-cols-1 lg:grid-cols-[300px_1fr] divide-x divide-app-color-border"
        >
            {/* Sidebar Column */}
            {sidebar && !hiddenSidebarContainer && (
                <div className="sticky top-[100px] h-full bg-app-color-background-secondary overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    <DocRootLayoutSidebar
                        sidebar={sidebar.items}
                        hiddenSidebarContainer={hiddenSidebarContainer}
                        setHiddenSidebarContainer={setHiddenSidebarContainer}
                    />
                </div>
            )}

            {children}
        </div>
    )
}
