interface FeatureValueCardProps {
    title: string
    description?: string
    value?: React.ReactNode
}

export const FeatureValueCard = ({ title, description, value }: FeatureValueCardProps) => {
    return (
        <div className="p-5 border border-app-color-border flex w-full items-center justify-between gap-2 bg-app-color-background">
            <div className="flex flex-col gap-[6px]">
                <span className="text-app-color-text-base text-xl font-satoshi">{title}</span>
                {description && (
                    <span className="text-app-color-text-secondary text-sm font-satoshi">{description}</span>
                )}
            </div>
            {value &&
                (typeof value === "string" ? (
                    <span className="text-app-color-text-secondary text-base font-satoshi">{value}</span>
                ) : (
                    value
                ))}
        </div>
    )
}
