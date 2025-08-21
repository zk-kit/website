import React, { type ReactNode } from "react"
import clsx from "clsx"
import { useBlogPost } from "@docusaurus/plugin-content-blog/client"
import { ThemeClassNames } from "@docusaurus/theme-common"
import EditMetaRow from "@theme/EditMetaRow"
import TagsListInline from "@theme/TagsListInline"
import ReadMoreLink from "@theme/BlogPostItem/Footer/ReadMoreLink"
import { Tag } from "@site/src/components/ui/Tag"
import type { BlogTag } from "@docusaurus/plugin-content-blog"
import { Button } from "@site/src/components/ui/Button"

export default function BlogPostItemFooter(): ReactNode {
    const { metadata, isBlogPostPage } = useBlogPost()
    const { tags, title, editUrl, hasTruncateMarker, lastUpdatedBy, lastUpdatedAt } = metadata

    // A post is truncated if it's in the "list view" and it has a truncate marker
    const truncatedPost = !isBlogPostPage && hasTruncateMarker

    const tagsExists = tags.length > 0

    const renderFooter = tagsExists || truncatedPost || editUrl

    if (!renderFooter) {
        return null
    }

    // BlogPost footer - details view
    if (isBlogPostPage) {
        const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy)

        return (
            <footer className="mt-10 lg:mt-16">
                {tagsExists && (
                    <div className="flex flex-col gap-2  mb-10">
                        <h3 className="text-app-color-text-base text-xl lg:text-2xl font-satoshi font-medium !mb-0">
                            Tags
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                            {tags.map((tag: BlogTag) => (
                                <Tag key={tag.label} text={tag.label} size="md" withHover={false} />
                            ))}
                        </div>
                    </div>
                )}
                <Button size="sm" href={editUrl} isExternal className="w-fit">
                    Edit this page
                </Button>
            </footer>
        )
    } else {
        return (
            <footer className="row docusaurus-mt-lg">
                {tagsExists && (
                    <div className={clsx("col", { "col--9": truncatedPost })}>
                        {tags.map((tag: BlogTag) => (
                            <Tag key={tag.label} text={tag.label} size="md" withHover={false} />
                        ))}
                    </div>
                )}
                {truncatedPost && (
                    <div
                        className={clsx("col text--right", {
                            "col--3": tagsExists
                        })}
                    >
                        <ReadMoreLink blogPostTitle={title} to={metadata.permalink} />
                    </div>
                )}
            </footer>
        )
    }
}
