import { useState } from "react"
import { projects } from "@site/src/content"
import { MAX_PROJECTS_TO_SHOW } from "@site/src/constants"

export const useProjects = () => {
    const [showAllProjects, setShowAllProjects] = useState(false)

    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
    const [selectedUseCases, setSelectedUseCases] = useState<string[]>([])
    const projectsLanguages = Array.from(new Set(projects.flatMap((project) => project.languages).filter(Boolean)))

    const projectsUseCases = Array.from(new Set(projects.flatMap((project) => project.useCases).filter(Boolean)))

    const toggleLanguageSelection = (language: string) => {
        setSelectedLanguages((prev) => {
            if (prev.includes(language)) {
                return prev.filter((l) => l !== language)
            }
            return [...prev, language]
        })
    }

    const toggleUseCaseSelection = (useCase: string) => {
        setSelectedUseCases((prev) => {
            if (prev.includes(useCase)) {
                return prev.filter((u) => u !== useCase)
            }
            return [...prev, useCase]
        })
    }

    const filteredProjects = projects.filter((project) => {
        const languageMatch = selectedLanguages.length === 0 || selectedLanguages.some((language) => project.languages?.includes(language))
        const useCaseMatch = selectedUseCases.length === 0 || selectedUseCases.some((useCase) => project.useCases?.includes(useCase))
        return languageMatch && useCaseMatch
    })

    const showMoreProjects = filteredProjects.length > MAX_PROJECTS_TO_SHOW

    return {
        showAllProjects,
        setShowAllProjects,
        showMoreProjects,
        projectsLanguages,
        projectsUseCases,
        selectedLanguages,
        toggleLanguageSelection,
        selectedUseCases,
        toggleUseCaseSelection,
        filteredProjects
    }
}
