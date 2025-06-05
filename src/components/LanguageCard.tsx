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
            className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl py-6 px-10 dark:bg-gray-800 bg-gray-200 dark:hover:bg-gray-700 hover:bg-gray-300 hover:!no-underline"
        >
            <div className="text-xl font-semibold dark:text-gray-100 text-gray-800">{text}</div>
        </a>
    )
}
