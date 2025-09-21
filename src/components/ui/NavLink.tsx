import { twMerge } from "tailwind-merge"
import { Icons } from "./Icons"

interface NavLinkProps {
    href: string
    label: string
    isActive?: boolean
    isExternal?: boolean
    className?: string
    ariaLabel?: string
}

export const NavLink = ({ href, label, isActive = false, isExternal = false, className, ariaLabel }: NavLinkProps) => {
    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-label={ariaLabel || (isExternal ? `${label} (opens in new tab)` : label)}
            aria-current={isActive ? "page" : undefined}
            className={twMerge(
                "group flex items-center gap-2 text-font-grotesk text-sm uppercase px-5 py-[30px] lg:p-2 tracking-[1.12px] border-b border-app-color-border lg:border-0 focus:outline-none focus:ring-0 active:outline-none",
                className,
                isActive
                    ? "!text-app-color-primary font-medium"
                    : "!text-app-color-text-base font-normal hover:!text-app-color-primary transition-colors duration-200"
            )}
        >
            {label}
            {isExternal && (
                <Icons.ExternalLink className="w-2 h-2 text-app-color-text-base group-hover:text-app-color-primary transition-colors duration-200" />
            )}
        </a>
    )
}
