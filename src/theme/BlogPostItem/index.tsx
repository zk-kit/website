import React, { type ReactNode } from "react"
import clsx from "clsx"
import { useBlogPost } from "@docusaurus/plugin-content-blog/client"
import BlogPostItemContainer from "@theme/BlogPostItem/Container"
import BlogPostItemHeader from "@theme/BlogPostItem/Header"
import BlogPostItemContent from "@theme/BlogPostItem/Content"
import BlogPostItemFooter from "@theme/BlogPostItem/Footer"
import BlogCard from "../BlogCard"
import type { Props } from "@theme/BlogPostItem"

function useContainerClassName() {
    const { isBlogPostPage } = useBlogPost()
    return !isBlogPostPage ? "margin-bottom--xl" : undefined
}

export default function BlogPostItem({ children, className }: Props): ReactNode {
    const containerClassName = useContainerClassName()
    const { isBlogPostPage } = useBlogPost()

    if (!isBlogPostPage) {
        return <BlogCard />
    }

    return (
        <BlogPostItemContainer className={clsx(containerClassName, className)}>
            <BlogPostItemHeader />
            <BlogPostItemContent>{children}</BlogPostItemContent>
            <BlogPostItemFooter />
        </BlogPostItemContainer>
    )
}
