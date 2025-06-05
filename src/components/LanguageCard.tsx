import { LuExternalLink } from "react-icons/lu"

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
            className="flex items-center space-x-2 border border-[#9fe491] dark:border-[#2d7520] rounded-xl py-6 px-10 dark:bg-[#285d1e] bg-[#caf1c1] dark:hover:bg-[#2d7520] dark:hover:border-[#369524] hover:bg-[#9fe491] hover:border-[#5dca47] hover:!no-underline"
        >
            <div className="text-xl font-semibold dark:text-gray-100 text-gray-800">{text}</div>
            <div className="dark:text-gray-100 text-gray-800">
                <LuExternalLink />
            </div>
        </a>
    )
}
