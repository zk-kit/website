import React from "react"
import { useLocation } from "@docusaurus/router"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { AppContent } from "./AppContent"
import { twMerge } from "tailwind-merge"
import { Icons } from "./ui/Icons"
import { useState, useEffect } from "react"
import { NavLink } from "./ui/NavLink"
import { ActionButton } from "./ui/Button"
import { useMediaQuery } from "react-responsive"

interface NavbarConfig {
    logo: {
        src: string
        alt: string
    }
    items: {
        label: string
        to: string
        position?: "left" | "right"
    }[]
}

const NavItems = ({
    items,
    className,
    currentPath
}: {
    items: NavbarConfig["items"]
    className?: string
    currentPath: string
}) => {
    return (
        <ul
            className={twMerge(
                "flex lg:flex-row flex-col lg:items-center gap-0 lg:gap-6 xl:gap-14 lg:justify-center h-full !p-0 !m-0",
                className
            )}
        >
            {items.map((item) => {
                const isActive = (() => {
                    if (item.to === "/") {
                        return currentPath === "/"
                    }

                    if (item.to === "/docs/intro") {
                        return currentPath === item.to || currentPath.startsWith("/docs/")
                    }

                    return currentPath === item.to || currentPath.startsWith(item.to + "/")
                })()
                return (
                    <li key={item.label}>
                        <NavLink href={item.to} label={item.label} isActive={isActive} />
                    </li>
                )
            })}
        </ul>
    )
}

export const AppNavbar = () => {
    const location = useLocation()
    const currentPath = location.pathname

    const data = useDocusaurusContext()
    const siteConfig = data?.siteConfig
    const navbarConfig = siteConfig?.themeConfig?.navbar as NavbarConfig
    const navItems = navbarConfig?.items?.filter((item) => item?.position === "left" || !item.position)
    const sideNavItems = navbarConfig?.items?.filter((item) => item?.position === "right")
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const isMobile = useMediaQuery({ query: "(max-width: 1023px)" })

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

    // Handle body scroll lock when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add("mobile-menu-open")
            document.body.style.overflow = "hidden"
            // iOS Safari specific fix
            document.body.style.position = "fixed"
            document.body.style.width = "100%"
        } else {
            document.body.classList.remove("mobile-menu-open")
            document.body.style.overflow = "unset"
            document.body.style.position = "unset"
            document.body.style.width = "unset"
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove("mobile-menu-open")
            document.body.style.overflow = "unset"
            document.body.style.position = "unset"
            document.body.style.width = "unset"
        }
    }, [isMobileMenuOpen])

    // Close mobile menu on desktop
    useEffect(() => {
        if (!isMobile && isMobileMenuOpen) {
            setIsMobileMenuOpen(false)
        }
    }, [isMobile, isMobileMenuOpen])

    const toggleColorMode = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        document.documentElement.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
        setTheme(newTheme)
    }

    const DesktopNavbar = () => {
        return (
            <>
                <NavItems className="hidden lg:flex" items={navItems} currentPath={currentPath} />
                <div className="hidden lg:flex gap-10 items-center ml-auto h-full">
                    <NavItems items={sideNavItems} currentPath={currentPath} />
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
            </>
        )
    }

    const MobileNavbar = () => {
        return (
            <div className="flex items-center gap-10 h-full">
                <ActionButton
                    className="ml-4 rounded-[6px] !border-none !bg-app-color-tag-background"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Icons.Menu className="text-app-color-primary-base" />
                </ActionButton>
            </div>
        )
    }

    const MobileMenu = () => {
        return (
            <div
                className={twMerge(
                    "fixed inset-0 bg-app-color-background z-50 transition-opacity duration-300 ease-in-out mobile-menu-height",
                    isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <div className="flex flex-col mobile-menu-height">
                    <div className="border-b border-app-color-border">
                        <AppContent className="h-[100px] flex items-center justify-between">
                            <a href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                <Icons.LogoFilled />
                                <Icons.ZkKit className="text-app-color-text-base" />
                            </a>
                            <div className="flex h-full flex-row border-l border-app-color-border divide-x divide-app-color-border">
                                <div className="flex items-center px-4">
                                    <button
                                        onClick={toggleColorMode}
                                        className="flex items-center justify-center !w-9 !h-9 mx-auto rounded-[6px] group cursor-pointer bg-app-color-tag-background hover:bg-app-color-tag-background-hover transition-all duration-200"
                                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                                    >
                                        {theme === "dark" ? (
                                            <Icons.Sun className="text-app-color-text-base" />
                                        ) : (
                                            <Icons.Moon className="text-app-color-text-base" />
                                        )}
                                    </button>
                                </div>
                                <div className="flex items-center pl-4">
                                    <ActionButton
                                        className="flex items-center justify-center !w-9 !h-9 rounded-[6px] !border-none !bg-app-color-button-secondary-background-hover"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Icons.Close className="text-app-color-tag-background-hover" />
                                    </ActionButton>
                                </div>
                            </div>
                        </AppContent>
                    </div>

                    <div className="flex-1">
                        <NavItems
                            className="flex flex-col"
                            items={[...navItems, ...sideNavItems]}
                            currentPath={currentPath}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* avoid getClientHeight error from docusaurus */}
            <div className="navbar !h-0 !p-0 !m-0"></div>

            <nav className="border-b border-app-color-border overflow-hidden sticky top-0 z-50">
                <AppContent
                    containerClassName="h-[100px] bg-app-color-background"
                    className="grid grid-cols-[1fr_auto] lg:grid-cols-[minmax(0,250px)_1fr_minmax(0,250px)] lg:items-center divide-x divide-app-color-border h-[100px]"
                >
                    <a href="/" className="flex items-center gap-2 h-full lg:pr-[40px] xl:pr-[90px] group">
                        <Icons.LogoFilled />
                        <Icons.ZkKit className="text-app-color-text-base group-hover:text-app-color-primary transition-all duration-200" />
                    </a>

                    {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
                </AppContent>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobile && <MobileMenu />}
        </>
    )
}
