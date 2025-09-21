import { AppContent } from "@site/src/components/AppContent"
import { AppPageLayoutWrapper } from "@site/src/components/layouts/AppPageLayoutWrapper"
import { Label } from "@site/src/components/ui/Label"
import { Button } from "@site/src/components/ui/Button"
import Link from "@docusaurus/Link"
import { translate } from "@docusaurus/Translate"

export default function NotFoundContent() {
    return (
        <div className="flex flex-col gap-10 lg:gap-16 items-center justify-center min-h-[60vh]">
            <section className="flex flex-col gap-9 items-center text-center">
                <div
                    className="lg:container lg:mx-auto h-[200px] lg:h-[300px] mx-auto lg:w-full w-full bg-repeat bg-center lg:bg-no-repeat lg:bg-contain bg-cover opacity-30"
                    style={{
                        backgroundImage: "url(/img/zk-kit-logo.svg)"
                    }}
                ></div>

                <AppContent className="flex flex-col items-center gap-6 text-center max-w-[500px]">
                    <Label.PageTitle>404</Label.PageTitle>
                    <div className="flex flex-col gap-4">
                        <h2 className="font-clash-grotesk text-2xl lg:text-3xl font-medium text-app-color-text-primary">
                            {translate({
                                id: "theme.NotFound.title",
                                message: "Page Not Found"
                            })}
                        </h2>
                        <span className="font-satoshi text-base text-app-color-text-secondary">
                            {translate({
                                id: "theme.NotFound.p1",
                                message:
                                    "The page you are looking for could not be found. It might have been moved, deleted, or you entered the wrong URL."
                            })}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Link to="/">
                            <Button variant="primary" size="md">
                                Go Home
                            </Button>
                        </Link>
                        <Link to="/projects">
                            <Button variant="secondary" size="md">
                                View Projects
                            </Button>
                        </Link>
                    </div>
                </AppContent>
            </section>
        </div>
    )
}
