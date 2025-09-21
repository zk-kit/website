import { twMerge } from "tailwind-merge"

interface FeatureValueCardProps {
    title: string
    description?: string
    value?: React.ReactNode
    href?: string
}

export const FeatureValueCard = ({ title, description, value, href = "" }: FeatureValueCardProps) => {
    const Component = href?.length > 0 ? "a" : "div"
    const withHover = href?.length > 0

    return (
        <Component
            href={href ? href : undefined}
            target={withHover ? "_blank" : undefined}
            rel={withHover ? "noopener noreferrer" : undefined}
            className={twMerge(
                "p-5 border border-app-color-border flex lg:flex-row flex-col w-full lg:items-center lg:justify-between gap-2 bg-app-color-background transition-colors duration-300 hover:bg-app-color-background-secondary",
                withHover && "cursor-pointer duration-200"
            )}
        >
            <div className="flex flex-col gap-[6px]">
                <span className="text-app-color-text-base text-xl font-satoshi">{title}</span>
                {description && (
                    <span className="text-app-color-text-secondary text-sm font-satoshi">{description}</span>
                )}
            </div>
            {value &&
                (typeof value === "string" ? (
                    <span className="text-app-color-text-secondary lg:text-base text-sm font-satoshi">{value}</span>
                ) : (
                    value
                ))}
        </Component>
    )
}
