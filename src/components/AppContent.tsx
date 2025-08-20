import { twMerge } from "tailwind-merge"
import { createElement, JSX } from "react"

export const AppContent = ({
    children,
    className = "",
    containerClassName = "",
    as = "div",
    style
}: {
    children: React.ReactNode
    className?: string
    containerClassName?: string
    as?: keyof JSX.IntrinsicElements
    style?: React.CSSProperties
}) => {
    return createElement(
        as,
        { className: `${containerClassName}` },
        <div className="container">
            <div className={twMerge("w-full", className)} style={style}>
                {children}
            </div>
        </div>
    )
}
