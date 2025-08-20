interface TagProps {
    text: string
    className?: string
    size?: "sm" | "md"
}

export const Tag = ({ text, className, size = "md" }: TagProps) => {
    const tagSize = size === "sm" ? "px-2 py-1 font-medium text-xs" : "px-3 py-2 font-normal text-sm"
    return (
        <div
            className={`bg-app-color-tag-background rounded-[6px] text-app-color-tag-text font-satoshi ${tagSize} ${className} hover:bg-app-color-tag-background-hover transition-all duration-200 group-hover:bg-app-color-tag-background-hover`}
        >
            {text}
        </div>
    )
}
