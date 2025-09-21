import { AppContent } from "../AppContent"

interface AuditSectionCardProps {
    title: string
    description?: string
    icon?: React.ReactNode
    children?: React.ReactNode
    content?: React.ReactNode
    index?: number
    id?: string
}

export const AuditSectionCard = ({
    title,
    description,
    icon = "/img/illustrations/contribute-page-illustration.svg",
    children,
    content,
    index,
    id
}: AuditSectionCardProps) => {
    return (
        <section
            className={`contribute-card border-t border-b border-app-color-border group`}
            data-index={index}
            id={id}
        >
            <AppContent className="grid grid-cols-1 border-x border-y-0 lg:border-y-0 lg:border-x border-app-color-border divide-y lg:divide-y-0 lg:divide-x divide-app-color-border">
                <div className="flex flex-col gap-10 lg:gap-11 py-10 px-5 lg:p-[50px]">
                    <div className="flex flex-col gap-[10px]">
                        {icon}
                        <div className="flex flex-col gap-[26px]">
                            <span className="text-4xl lg:text-6xl text-app-color-text-base font-clash-grotesk font-normal">
                                {title}
                            </span>
                            <span className="text-base text-app-color-text-secondary font-satoshi">{description}</span>
                        </div>
                    </div>
                    {content}
                </div>
            </AppContent>
        </section>
    )
}
