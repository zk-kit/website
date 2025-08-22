export type FeatureCardProps = {
    image: any
    text: string
    description: string
}

export const FeatureCard = ({ image, text, description }: FeatureCardProps) => {
    return (
        <div className="flex flex-col gap-[30px] p-[30px] text-center">
            <div className="flex flex-col gap-[10px]">
                <img src={image} alt={text} height={45} width={45} className="mx-auto" />
                <div className="text-lg text-app-color-text-base font-satoshi">{text}</div>
            </div>
            <span className="text-base text-app-color-text-secondary font-satoshi">{description}</span>
        </div>
    )
}
