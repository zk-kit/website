import { useState, useEffect, useRef, ImgHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "loading"> {
    src: string
    alt: string
    placeholder?: string
    className?: string
    priority?: boolean
}

export const LazyImage = ({ src, alt, placeholder, className, priority = false, ...props }: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(priority)
    const [imageSrc, setImageSrc] = useState(
        placeholder ||
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjwvc3ZnPg=="
    )
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (priority) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true)
                        observer.unobserve(entry.target)
                    }
                })
            },
            { rootMargin: "50px" }
        )

        if (imgRef.current) {
            observer.observe(imgRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [priority])

    useEffect(() => {
        if (isInView && src !== imageSrc) {
            const img = new Image()
            img.onload = () => {
                setImageSrc(src)
                setIsLoaded(true)
            }
            img.src = src
        }
    }, [isInView, src, imageSrc])

    return (
        <img
            ref={imgRef}
            src={imageSrc}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className={twMerge("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-70", className)}
            {...props}
        />
    )
}
