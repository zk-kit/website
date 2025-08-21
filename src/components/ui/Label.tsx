import { twMerge } from "tailwind-merge"
import { createElement } from "react"

interface LabelProps {
    children: React.ReactNode
    className?: string
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"
    size?: "lg" | "md" | "sm"
}

const PageTitle = ({ children, className, as = "h1", size = "lg" }: LabelProps) => {
    const sizeClass = {
        lg: "!text-5xl lg:!text-[80px]",
        md: "!text-[38px] lg:!text-[60px]",
        sm: "!text-2xl lg:!text-[32px]"
    }

    return createElement(
        as,
        {
            className: twMerge(
                "!font-normal !font-clash-grotesk text-app-color-text-base !mb-0",
                className,
                sizeClass[size]
            )
        },
        children
    )
}

export const Label = {
    PageTitle
}
