import { NavLink } from "./ui/NavLink"
import { LINKS } from "@site/src/constants"

export const AppFooter = () => {
    return (
        <footer className="grid border-t border-app-color-border lg:grid-cols-[300px_1fr_300px] divide-x divide-app-color-border h-full lg:h-[100px] bg-app-color-background">
            <div className="flex items-center justify-center">
                <NavLink href={LINKS.GITHUB_URL} label="Github" isExternal />
            </div>
            <div></div>
            <div className="flex items-center justify-center">
                <NavLink href="/docs/intro" label="Documentation" />
            </div>
        </footer>
    )
}
