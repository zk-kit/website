import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { AppContent } from "./AppContent"
import { useLocation } from "@docusaurus/router"
import { twMerge } from "tailwind-merge"
import { Icons } from "./ui/Icons"
import { useState, useEffect } from "react"

interface NavbarConfig {
    logo: {
        src: string
        alt: string
    }
    items: {
        label: string
        href: string
        position?: "left" | "right"
    }[]
}

const NavItems = ({ items }: { items: NavbarConfig["items"] }) => {
    return (
        <ul className="flex items-center lg:gap-14 justify-center !mb-0 h-full">
            {items.map((item) => {
                const isActive = useLocation().pathname === item.href
                return (
                    <li key={item.label} className="p-2">
                        <a
                            href={item.href}
                            className={twMerge(
                                "text-font-grotesk text-sm  uppercase",
                                isActive
                                    ? "!text-app-color-primary font-medium"
                                    : "!text-app-color-text-base font-normal hover:!text-app-color-primary transition-colors duration-200"
                            )}
                        >
                            {item.label}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

export const AppNavbar = () => {
    const data = useDocusaurusContext()
    const siteConfig = data?.siteConfig
    const navbarConfig = siteConfig?.themeConfig?.navbar as NavbarConfig
    const navItems = navbarConfig?.items?.filter((item) => item?.position === "left" || !item.position)
    const sideNavItems = navbarConfig?.items?.filter((item) => item?.position === "right")
    const [theme, setTheme] = useState<"light" | "dark">("light")

    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light"
        setTheme(currentTheme as "light" | "dark")

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
                    const newTheme = document.documentElement.getAttribute("data-theme") || "light"
                    setTheme(newTheme as "light" | "dark")
                }
            })
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"]
        })

        return () => observer.disconnect()
    }, [])

    const toggleColorMode = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        document.documentElement.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
        setTheme(newTheme)
    }

    return (
        <nav className="border-b border-app-color-border overflow-hidden sticky top-0 z-50">
            <AppContent
                containerClassName="h-full lg:h-[100px] bg-app-color-background"
                className="grid lg:grid-cols-[300px_1fr_300px] items-center divide-x divide-app-color-border h-full lg:h-[100px]"
            >
                <a href="/" className="flex items-center gap-2 h-full">
                    <Icons.LogoFilled />
                    <Icons.ZkKit className="text-app-color-tag-text" />
                </a>
                <NavItems items={navItems} />
                <div className="flex gap-10 items-center ml-auto h-full">
                    <NavItems items={sideNavItems} />
                    <button
                        onClick={toggleColorMode}
                        className="p-[10px] mx-auto rounded-[6px] group cursor-pointer bg-app-color-tag-background hover:bg-app-color-tag-background-hover transition-all duration-200"
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? (
                            <Icons.Sun className="text-app-color-text-base" />
                        ) : (
                            <Icons.Moon className="text-app-color-text-base" />
                        )}
                    </button>
                </div>
            </AppContent>
        </nav>
    )
}
