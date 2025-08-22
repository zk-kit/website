import React, { type ReactNode } from "react"
import { useBlogPost } from "@docusaurus/plugin-content-blog/client"
import Link from "@docusaurus/Link"
import { Tag } from "@site/src/components/ui/Tag"
import { BlogTag } from "@docusaurus/plugin-content-blog"
import { CardBase } from "@site/src/components/cards/CardBase"
import { Button } from "@site/src/components/ui/Button"

export default function BlogCard(): ReactNode {
    const { metadata } = useBlogPost()
    const { tags, date, permalink, title } = metadata

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })

    return (
        <Link to={permalink} style={{ textDecoration: "none" }} className="group">
            <CardBase className="duration-200 hover:bg-app-color-background-secondary cursor-pointer">
                <div className="flex flex-col gap-[60px]">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 flex-wrap">
                            {tags?.map((tag: BlogTag) => (
                                <Tag key={tag.label} text={tag.label} size="sm" withHover={false} />
                            ))}
                        </div>
                        <h2 className="!font-satoshi !text-[26px] !font-medium">{title}</h2>
                    </div>
                    <div className="flex flex-col gap-5">
                        <span className="text-app-color-text-secondary text-base font-satoshi font-normal">
                            {formattedDate}
                        </span>
                        <Button className="w-full" withGroupHover>
                            Read more
                        </Button>
                    </div>
                </div>
            </CardBase>
        </Link>
    )
}
