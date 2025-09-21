import React, { type ReactNode } from "react"
import Link from "@docusaurus/Link"
import { useBlogPost } from "@docusaurus/plugin-content-blog/client"
import type { Props } from "@theme/BlogPostItem/Header/Title"

import { Label } from "@site/src/components/ui/Label"

export default function BlogPostItemHeaderTitle({ className }: Props): ReactNode {
    const { metadata, isBlogPostPage } = useBlogPost()
    const { permalink, title } = metadata

    return <Label.PageTitle>{isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}</Label.PageTitle>
}
