import { Button } from "../ui/Button"

interface ContributeCardProps {
    index?: number
    title: string
    description: string
    icon?: React.ReactNode
    href?: string
    id?: string
}

export const ContributeCard = ({ index, title, description, icon, href, id }: ContributeCardProps) => {
    return (
        <a
            href={href}
            className="contribute-card flex flex-col text-center gap-9 p-[30px] group border border-app-color-border duration-200 hover:!bg-app-color-background-secondary"
            data-index={index}
            id={id}
        >
            <div className="flex flex-col gap-[30px]">
                <span className="text-app-color-text-base text-2xl font-satoshi font-normal">{title}</span>
                <span className="text-base text-app-color-text-secondary font-satoshi">{description}</span>
            </div>
            <div className="opacity-0 group-hover:cursor-pointer pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 w-fit mx-auto">
                <Button className="group-hover:!bg-app-color-button-primary-background group-hover:!text-app-color-button-primary-text">
                    Learn More
                </Button>
            </div>
            {icon}
        </a>
    )
}
