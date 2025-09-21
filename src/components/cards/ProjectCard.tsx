import { Project } from "@site/src/content"
import { Button } from "../ui/Button"
import { Tag } from "../ui/Tag"
import { twMerge } from "tailwind-merge"

export const ProjectCard = ({
    title,
    description,
    languages = [],
    className = ""
}: Project & { className?: string }) => {
    return (
        <div
            className={`cursor-pointer group flex flex-col lg:gap-[60px] border border-app-color-border p-[30px] bg-app-color-background hover:bg-app-color-background-secondary transition-all duration-200 ${className}`}
        >
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1 w-full">
                            {languages.map((tag) => (
                                <Tag key={tag} text={tag} size="sm" withHover={false} />
                            ))}
                        </div>
                        <img
                            className="lg:flex hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            src="/img/icons/card-hover.svg"
                            alt="Card Icons On Hover"
                            height={28}
                            width={45}
                        />
                    </div>
                    <span className="text-[26px] font-satoshi font-medium text-app-color-text-base">{title}</span>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <span className="text-base font-satoshi text-app-color-text-secondary line-clamp-3">{description}</span>
                <Button variant="secondary" withGroupHover>
                    <span className="relative overflow-hidden">
                        <span className="flex w-auto h-auto group-hover:w-auto group-hover:h-auto group-hover:flex transition-all duration-300">
                            View project
                        </span>
                    </span>
                </Button>
            </div>
        </div>
    )
}
