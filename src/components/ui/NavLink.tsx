import { twMerge } from "tailwind-merge"
import { Icons } from "./Icons"

interface NavLinkProps {
    href: string
    label: string
    isActive?: boolean
    isExternal?: boolean
}

export const NavLink = ({ href, label, isActive = false, isExternal = false }: NavLinkProps) => {
    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={twMerge(
                "group flex items-center gap-2 text-font-grotesk text-sm uppercase p-2 tracking-[1.12px]",
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
