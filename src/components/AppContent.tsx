import { twMerge } from "tailwind-merge"
import { createElement, JSX } from "react"

export const AppContent = ({
    children,
    className = "",
    containerClassName = "",
    onlyDesktopContainer = false,
    as = "div",
    style
}: {
    children?: React.ReactNode
    className?: string
    containerClassName?: string
    onlyDesktopContainer?: boolean
    as?: keyof JSX.IntrinsicElements
    style?: React.CSSProperties
}) => {
    return createElement(
        as,
        { className: `${containerClassName}` },
        <div className={twMerge("", onlyDesktopContainer ? "w-full lg:max-w-screen-xl lg:mx-auto" : "container")}>
            <div className={twMerge("w-full", className)} style={style}>
                {children}
            </div>
        </div>
    )
}
