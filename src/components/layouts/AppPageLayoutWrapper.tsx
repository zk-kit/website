import useGlobalData from "@docusaurus/useGlobalData"
import { twMerge } from "tailwind-merge"
import { AppNavbar } from "../AppNavbar"
import { AppFooter } from "../AppFooter"

interface AppPageLayoutWrapperProps {
    children: React.ReactNode
    className?: string
    id?: string
}

export const AppPageLayoutWrapper = ({ children, className, id }: AppPageLayoutWrapperProps) => {
    return (
        <main id={id}>
            <AppNavbar />
            <div className="flex flex-col">
                <div className={twMerge("flex flex-col bg-app-color-background pt-14 lg:pt-[140px]", className)}>
                    {children}
                </div>
                <AppFooter />
            </div>
        </main>
    )
}
