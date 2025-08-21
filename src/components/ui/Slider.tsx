import { useState, useRef, useEffect } from "react"
import { twMerge } from "tailwind-merge"
import { ActionButton } from "./Button"
import { Icons } from "./Icons"
import { useMediaQuery } from "react-responsive"

interface SliderProps {
    children: React.ReactNode[]
    className?: string
    showNavigation?: boolean
    autoSlide?: boolean
    autoSlideInterval?: number
    onSlideChange?: (index: number) => void
    slidesToShow?: number
    gap?: string
    withDivider?: boolean
    controlsPosition?: "top" | "bottom"
    forceSlider?: boolean
}

export const Slider = ({
    children,
    className,
    showNavigation = true,
    autoSlide = false,
    autoSlideInterval = 3000,
    onSlideChange,
    slidesToShow = 1,
    gap = "0px",
    withDivider = true,
    controlsPosition = "bottom",
    forceSlider = false
}: SliderProps) => {

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" })
    const [currentSlide, setCurrentSlide] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)

    const totalSlides = children.length
    const maxSlideIndex = Math.max(0, totalSlides - slidesToShow)

    useEffect(() => {
        if (!autoSlide) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1))
        }, autoSlideInterval)

        return () => clearInterval(interval)
    }, [autoSlide, autoSlideInterval, maxSlideIndex])

    useEffect(() => {
        if (onSlideChange) {
            onSlideChange(currentSlide)
        }
    }, [currentSlide, onSlideChange])

    const goToNext = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, maxSlideIndex))
    }

    const goToPrev = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe) {
            goToNext()
        } else if (isRightSwipe) {
            goToPrev()
        }

        setTouchStart(0)
        setTouchEnd(0)
    }

    const slideWidth = 100 / slidesToShow
    const translateX = currentSlide * slideWidth

    return (
        <div className={twMerge("flex flex-col gap-5", controlsPosition === "bottom" && "flex-col-reverse")}>
            <div className={twMerge("flex flex-col gap-5 relative overflow-hidden", className)}>
                <div
                    ref={sliderRef}
                    className={twMerge(
                        "flex transition-transform duration-300 ease-in-out",
                        withDivider && "divide-x divide-app-color-border"
                    )}
                    style={{
                        transform: `translateX(-${translateX}%)`,
                        gap: gap
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0"
                            style={{
                                width: `${slideWidth}%`
                            }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
            {showNavigation && maxSlideIndex > 0 && (isMobile || forceSlider) && (
                <div className="flex gap-[10px] ml-auto justify-end">
                    <ActionButton
                        onClick={goToPrev}
                        disabled={currentSlide === 0}
                        aria-label="Previous slide"
                        className="!mx-0"
                    >
                        <Icons.ArrowDown className="rotate-90" />
                    </ActionButton>
                    <ActionButton
                        onClick={goToNext}
                        disabled={currentSlide >= maxSlideIndex}
                        aria-label="Next slide"
                        className="!mx-0"
                    >
                        <Icons.ArrowDown className="-rotate-90" />
                    </ActionButton>
                </div>
            )}
        </div>
    )
}
