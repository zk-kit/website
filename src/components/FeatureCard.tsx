export type FeatureCardProps = {
    icon: any
    text: string
    description: string
}

export default function FeatureCard({ icon, text, description }: FeatureCardProps) {
    return (
        <div className="flex p-4">
            <div className="space-y-2">
                <div className="text-2xl text-[#48b532]">{icon}</div>
                <div className="text-xl font-semibold">{text}</div>
                <div className="text-gray-600 dark:text-gray-400">{description}</div>
            </div>
        </div>
    )
}
