import useGlobalData from "@docusaurus/useGlobalData"
import { twMerge } from "tailwind-merge"
import { AppNavbar } from "../AppNavbar"
import { AppFooter } from "../AppFooter"

interface AppPageLayoutWrapperProps {
    children: React.ReactNode
    className?: string
}

export const AppPageLayoutWrapper = ({ children, className }: AppPageLayoutWrapperProps) => {
    return (
        <main>
            <AppNavbar />
            <div className={twMerge("flex flex-col bg-app-color-background py-14 lg:py-[140px]", className)}>
                {children}
            </div>
            <AppFooter />
        </main>
    )
}
