import { useMediaQuery } from "react-responsive"

interface AboutCardProps {
    value?: string
    title?: string
    description?: string
    onlyIcon?: boolean
}

const AboutCard = ({ value, title, description, onlyIcon }: AboutCardProps) => {
    return (
        <div className="flex flex-col lg:aspect-square p-[30px] duration-200 hover:bg-app-color-background-secondary max-h-[300px] h-[300px] lg:w-auto lg:max-h-none lg:h-auto">
            <div className="flex flex-col gap-3 mt-auto">
                <h4 className="!font-satoshi !text-5xl !font-medium !mb-0">{value}</h4>
                <div className="flex flex-col gap-1">
                    <span className="font-satoshi text-base text-app-color-text-primary font-normal">{title}</span>
                    <span className="font-satoshi text-sm text-app-color-text-secondary font-normal">
                        {description}
                    </span>
                </div>
            </div>
        </div>
    )
}

const AboutCardImage = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

    if (isMobile) return null

    return (
        <div className="relative flex flex-col aspect-square duration-200 group w-full h-full">
            <div
                className="inset-0 absolute flex lg:mx-[30px] bg-contain bg-center bg-repeat opacity-5 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                    backgroundImage: "url(/img/illustrations/about-us-placeholder.svg)"
                }}
            ></div>
            <img src="" alt="" />
        </div>
    )
}

export { AboutCard, AboutCardImage }
