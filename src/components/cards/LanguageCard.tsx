export type LanguageCardProps = {
    title: string
    description?: string
    image?: React.ReactNode
    packages?: string | number
    link: string
}

export const LanguageCard = ({ title, description, image, packages, link }: LanguageCardProps) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} packages on GitHub (opens in new tab)`}
            className="language-card-link cursor-pointer !border border-app-color-border p-[30px] flex flex-col gap-[30px] items-center text-center duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-app-color-primary"
        >
            <span className="text-app-color-text-base font-satoshi text-2xl leading-none">{title}</span>
            <div className="flex flex-col gap-6">
                <span className="text-app-color-text-secondary font-satoshi text-base">{description}</span>
                <div className="flex flex-col gap-3">
                    <div className="h-[1px] max-w-[136px] mx-auto w-full bg-app-color-border"></div>
                    <span className="font-medium text-xs uppercase leading-none tracking-[0.96px] text-app-color-text-secondary">{`${packages} packages`}</span>
                </div>
            </div>

            {image}
        </a>
    )
}
