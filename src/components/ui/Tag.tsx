import { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface TagProps extends HTMLAttributes<HTMLDivElement> {
    text: string
    size?: "sm" | "md"
    isActive?: boolean
    withHover?: boolean
}

export const Tag = ({ text, className = "", size = "md", isActive = false, withHover = true, ...props }: TagProps) => {
    const tagSize = size === "sm" ? "px-2 py-1 font-medium text-xs" : "px-3 py-2 font-normal text-sm"
    return (
        <div
            {...props}
            className={twMerge(
                `cursor-pointer bg-app-color-tag-background rounded-[6px] text-app-color-tag-text font-satoshi ${tagSize} ${className} ${withHover && isActive ? "bg-app-color-button-secondary-background-hover !text-app-color-button-secondary-text-hover" : withHover ? "hover:bg-app-color-button-secondary-background-hover hover:!text-app-color-button-secondary-text-hover" : ""} transition-all duration-200 group-hover:bg-app-color-tag-background-hover`
            )}
        >
            <span>{text}</span>
        </div>
    )
}
