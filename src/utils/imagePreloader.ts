import { useEffect } from "react"

interface ImagePreloadConfig {
    src: string
    priority?: "high" | "low"
    fetchPriority?: "high" | "low" | "auto"
}

/**
 * Preloads critical images by adding link preload tags to the document head
 * Following Google PageSpeed guidelines for optimal performance
 */
export const useImagePreload = (images: ImagePreloadConfig[]) => {
    useEffect(() => {
        const preloadLinks: HTMLLinkElement[] = []

        images.forEach(({ src, priority = "low", fetchPriority = "high" }) => {
            // Check if image is already preloaded
            const existingLink = document.querySelector(`link[rel="preload"][href="${src}"]`)
            if (existingLink) return

            // Create preload link
            const link = document.createElement("link")
            link.rel = "preload"
            link.as = "image"
            link.href = src
            
            // Set fetch priority for critical images
            if (fetchPriority !== "auto") {
                link.setAttribute("fetchpriority", fetchPriority)
            }

            // Add to document head
            document.head.appendChild(link)
            preloadLinks.push(link)
        })

        // Cleanup: remove preload links when component unmounts
        return () => {
            preloadLinks.forEach(link => {
                if (document.head.contains(link)) {
                    document.head.removeChild(link)
                }
            })
        }
    }, [images])
}

/**
 * Preloads a single critical image
 */
export const preloadImage = (src: string, fetchPriority: "high" | "low" | "auto" = "high") => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    link.setAttribute("fetchpriority", fetchPriority)
    document.head.appendChild(link)
}

/**
 * Gets all critical images for a specific page
 */
export const getPageImages = (page: string): ImagePreloadConfig[] => {
    const imageMap: Record<string, ImagePreloadConfig[]> = {
        home: [
            {
                src: "/img/illustrations/intro-illustration.svg",
                priority: "high",
                fetchPriority: "high"
            },
            {
                src: "/img/vectors/language-vector-1.svg",
                priority: "low",
                fetchPriority: "low"
            },
            {
                src: "/img/vectors/language-vector-1-active.svg",
                priority: "low",
                fetchPriority: "low"
            },
            {
                src: "/img/vectors/language-vector-2.svg",
                priority: "low",
                fetchPriority: "low"
            },
            {
                src: "/img/vectors/language-vector-2-active.svg",
                priority: "low",
                fetchPriority: "low"
            },
            {
                src: "/img/vectors/language-vector-3.svg",
                priority: "low",
                fetchPriority: "low"
            },
            {
                src: "/img/vectors/language-vector-3-active.svg",
                priority: "low",
                fetchPriority: "low"
            },
            {
                src: "/img/vectors/language-vector-4.svg",
                priority: "low",
                fetchPriority: "low"
            },
            {
                src: "/img/vectors/language-vector-4-active.svg",
                priority: "low",
                fetchPriority: "low"
            },
            {
                src: "/img/vectors/language-vector-5.svg",
                priority: "low",
                fetchPriority: "low"
            },
            {
                src: "/img/vectors/language-vector-5-active.svg",
                priority: "low",
                fetchPriority: "low"
            },
            {
                src: "/img/illustrations/join-banner-illustration.svg",
                priority: "low",
                fetchPriority: "low"
            }
        ],
        projects: [
            {
                src: "/img/illustrations/projects-page-illustration.svg",
                priority: "high",
                fetchPriority: "high"
            },
            {
                src: "/img/illustrations/build-projects-illustration.svg",
                priority: "low",
                fetchPriority: "low"
            }
        ],
        contribute: [
            {
                src: "/img/illustrations/contribute-page-illustration.svg",
                priority: "high",
                fetchPriority: "high"
            }
        ],
        about: [
            {
                src: "/img/illustrations/about-page-illustration.svg",
                priority: "high",
                fetchPriority: "high"
            }
        ]
    }

    return imageMap[page] || []
}