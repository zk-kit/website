import { twMerge } from "tailwind-merge"
import { Icons } from "./Icons"

interface BulletPointProps {
    className?: string
    title: string
}

export const BulletPoint = ({ className, title }: BulletPointProps) => {
    return (
        <div className={twMerge("flex items-center gap-[10px] lg:gap-3", className)}>
            <Icons.Checked className="text-app-color-button-secondary-background-hover w-[18px] h-[18px] dark:text-app-color-text-secondary" />
            <span className="text-app-color-text-secondary text-base font-satoshi">{title}</span>
        </div>
    )
}
