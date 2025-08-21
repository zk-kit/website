import { twMerge } from "tailwind-merge"

interface CardBaseProps {
    children: React.ReactNode
    className?: string
    title?: string
    description?: string
    actions?: React.ReactNode
}

export const CardBase = ({ children, className, title, actions }: CardBaseProps) => {
    return (
        <div className={twMerge("flex flex-col gap-9 p-[30px] border border-app-color-border bg-app-color-background", className)}>
            <div className="flex flex-col gap-[30px]">
                <span className="text-app-color-text-base text-xl lg:text-2xl font-satoshi font-normal">{title}</span>
                {children}
            </div>
            {actions}
        </div>
    )
}
