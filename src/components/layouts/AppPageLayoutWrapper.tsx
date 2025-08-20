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
        <main className={twMerge("flex flex-col bg-app-color-background", className)}>
            <AppNavbar />
            {children}
            <AppFooter />
        </main>
    )
}
