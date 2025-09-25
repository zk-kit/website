import { NavLink } from "./ui/NavLink"
import { LINKS } from "@site/src/constants"
import { Icons } from "./ui/Icons"
import { useLocation } from "@docusaurus/router"
import { AppFooterSpinningLogo } from "./AppFooterSpinningLogo"

export const AppFooter = () => {
    const location = useLocation()
    const currentPath = location.pathname

    const isDocumentationPage = currentPath.startsWith("/docs/")

    return (
        <footer className="flex flex-col bg-app-color-background">
            <div className="mx-auto block bg-app-color-background">
                <AppFooterSpinningLogo />
            </div>
            <div className="h-full lg:h-[100px] grid border-t border-app-color-border lg:grid-cols-[300px_1fr_300px] lg:divide-x divide-app-color-border">
                <div className="flex items-center justify-center">
                    <NavLink href={LINKS.GITHUB_URL} label="Github" isExternal className="w-full justify-center" />
                </div>
                <div className="relative py-5 px-4 lg:px-20">
                    <div className="bg-repeat bg-[length:6px_6px] h-[142px] lg:h-[70px] bg-[url(/img/illustrations/footer-vector-item.svg)]"></div>
                    <Icons.ZkKit
                        height={40}
                        width={170}
                        className="text-app-color-background absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                    />
                </div>
                <div className="flex items-center justify-center border-t lg:border-0 border-app-color-border">
                    <NavLink href={LINKS.X_URL} label="X (Twitter)" isExternal className="w-full justify-center" />
                </div>
            </div>
        </footer>
    )
}
