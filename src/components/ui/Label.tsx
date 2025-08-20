import { twMerge } from "tailwind-merge"
import { createElement } from "react"

interface LabelProps {
    children: React.ReactNode
    className?: string
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"
}

const PageTitle = ({ children, className, as = "h1" }: LabelProps) => {
    return createElement(
        as,
        {
            className: twMerge(
                "text-5xl lg:!text-[80px] !font-normal !font-clash-grotesk text-app-color-text-base !mb-0",
                className
            )
        },
        children
    )
}

export const Label = {
    PageTitle,
}