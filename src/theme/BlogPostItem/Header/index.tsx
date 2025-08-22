import React, { type ReactNode } from "react"
import BlogPostItemHeaderTitle from "@theme/BlogPostItem/Header/Title"
import BlogPostItemHeaderInfo from "@theme/BlogPostItem/Header/Info"

export default function BlogPostItemHeader(): ReactNode {
    return (
        <header>
            <BlogPostItemHeaderTitle className="!text-[38px] lg:!text-[60px] !leading-[38px] lg:!leading-[60px] !font-normal !font-clash-grotesk text-app-color-text-base !mb-0" />
            <BlogPostItemHeaderInfo />
        </header>
    )
}
