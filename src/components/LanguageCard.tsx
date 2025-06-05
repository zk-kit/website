export type LanguageCardProps = {
    text: string
    link: string
}

export default function LanguageCard({ text, link }: LanguageCardProps) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border border-gray-600 rounded-xl py-6 px-10 bg-gray-800 hover:bg-gray-700 hover:!no-underline"
        >
            <div className="text-xl font-semibold dark:text-gray-100 text-gray-800">{text}</div>
        </a>
    )
}
