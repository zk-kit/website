import { ButtonHTMLAttributes, forwardRef, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type ButtonVariant = "primary" | "secondary"
type ButtonFontWeight = "bold" | "medium" | "regular"
type ButtonSize = "xs" | "sm" | "md" | "lg"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    icon?: React.ReactNode
    isExternal?: boolean
    iconPosition?: "left" | "right"
    className?: string
    loading?: boolean
    variant?: ButtonVariant
    fontWeight?: ButtonFontWeight
    size?: ButtonSize
    withShadow?: boolean
    href?: string
    withGroupHover?: boolean
}

const BUTTON_STYLES = {
    base: [
        "duration-200",
        "font-satoshi px-3 py-2 rounded-[6px]",
        "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap",
        "ring-offset-background transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        "focus:outline-none focus:ring-0 outline-none focus:ring-offset-0"
    ].join(" "),

    variants: {
        primary:
            "bg-app-color-button-primary-background text-app-color-button-primary-text hover:bg-app-color-button-primary-background-hover hover:text-app-color-button-primary-text-hover dark:hover:bg-app-color-button-primary-background dark:hover:text-app-color-button-primary-text",
        secondary:
            "bg-app-color-button-secondary-background text-app-color-button-secondary-text border border-app-color-button-secondary-background hover:bg-app-color-button-secondary-background-hover hover:text-app-color-button-secondary-text-hover"
    } as const,

    fontWeights: {
        bold: "font-bold",
        medium: "font-medium",
        regular: "font-regular"
    } as const,

    withGroupHover: {
        primary:
            "group-hover:bg-app-color-button-primary-background-hover group-hover:text-app-color-button-primary-text-hover",
        secondary:
            "group-hover:bg-app-color-button-secondary-background-hover group-hover:text-app-color-button-secondary-text-hover"
    } as const,

    withShadow: {
        true: "hover:shadow-lg hover:shadow-[0_0_18px_4px_var(--ifm-color-primary-lightest)] dark:hover:shadow-[0_0_18px_4px_color-mix(in_srgb,var(--ifm-color-primary-lightest),transparent_70%)]",
        false: ""
    } as const,

    sizes: {
        sm: "text-sm"
    } as const
} as const

// ===== Helper Functions =====
const createButtonClassName = (
    variant: ButtonVariant,
    fontWeight: ButtonFontWeight,
    size: ButtonSize,
    withShadow: boolean,
    withGroupHover: boolean,
    className?: string
): string => {
    return twMerge(
        BUTTON_STYLES.base,
        BUTTON_STYLES.variants[variant],
        BUTTON_STYLES.fontWeights[fontWeight],
        BUTTON_STYLES.sizes[size],
        withShadow ? BUTTON_STYLES.withShadow.true : BUTTON_STYLES.withShadow.false,
        withGroupHover ? BUTTON_STYLES.withGroupHover[variant] : "",
        className
    )
}

const renderButtonContent = (
    children: React.ReactNode,
    icon: React.ReactNode,
    iconPosition: "left" | "right",
    isExternal: boolean,
    loading: boolean
) => {
    return (
        <>
            {iconPosition === "left" && icon}
            <span>{children}</span>
            {iconPosition === "right" && icon}
            {isExternal && null}
            {loading && null}
        </>
    )
}

export const Button = forwardRef<any, ButtonProps>(
    (
        {
            className,
            asChild = false,
            icon,
            isExternal = false,
            iconPosition = "left",
            loading = false,
            disabled = false,
            variant = "primary",
            fontWeight = "medium",
            size = "sm",
            withShadow = false,
            children,
            href,
            withGroupHover = false,
            ...props
        },
        ref
    ) => {
        const buttonClassName = createButtonClassName(variant, fontWeight, size, withShadow, withGroupHover, className)
        const isDisabled = loading || disabled

        if (href) {
            return (
                <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={isExternal ? `${children} (opens in new tab)` : undefined}
                    className="w-full focus:outline-2 focus:outline-offset-2 focus:outline-app-color-primary"
                >
                    <button
                        ref={ref}
                        className={twMerge("w-full", buttonClassName)}
                        disabled={isDisabled}
                        aria-disabled={isDisabled}
                        tabIndex={-1}
                        {...props}
                    >
                        {renderButtonContent(children, icon, iconPosition, isExternal, loading)}
                    </button>
                </a>
            )
        }

        return (
            <button
                ref={ref}
                className={twMerge(
                    buttonClassName,
                    "focus:outline-2 focus:outline-offset-2 focus:outline-app-color-primary"
                )}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                {...props}
            >
                {renderButtonContent(children, icon, iconPosition, isExternal, loading)}
            </button>
        )
    }
)

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export const ActionButton = ({ children, className, ...props }: ActionButtonProps) => {
    return (
        <button
            className={twMerge(
                "p-[10px] mx-auto border border-app-color-border cursor-pointer group-hover:bg-app-color-background-secondary hover:bg-app-color-background-secondary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-app-color-background",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
