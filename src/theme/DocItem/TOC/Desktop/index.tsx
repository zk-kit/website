import React, { type ReactNode } from "react"
import DocItemTOCDesktop from "@theme-original/DocItem/TOC/Desktop"
import { useDoc } from "@docusaurus/plugin-content-docs/client"

export default function DocItemTOCDesktopWrapper(props: any): ReactNode {
    const { metadata } = useDoc()

    return (
        <div className="custom-toc lg:pt-[30px]">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                On This Page
            </h3>

            <DocItemTOCDesktop {...props} />

            <div className="mt-auto p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    {metadata?.title && (
                        <div className="mb-2">
                            <span className="font-medium">Page:</span> {metadata.title}
                        </div>
                    )}
                    {metadata?.editUrl && (
                        <a
                            href={metadata.editUrl}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Edit this page
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
