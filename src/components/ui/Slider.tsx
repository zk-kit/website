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
    showControls?: boolean
    infinite?: boolean
    yBorder?: boolean
    xBorder?: boolean
    arrowClassName?: string
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
    forceSlider = false,
    showControls = true,
    infinite = false,
    yBorder = false,
    xBorder = false,
    arrowClassName
}: SliderProps) => {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" })
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(true)
    const sliderRef = useRef<HTMLDivElement>(null)

    const totalSlides = children.length
    const maxSlideIndex = infinite ? totalSlides - 1 : Math.max(0, totalSlides - Math.floor(slidesToShow))

    // For infinite scroll, we need to duplicate slides
    const slidesToClone = Math.ceil(slidesToShow)
    const infiniteChildren = infinite
        ? [
              ...children.slice(-slidesToClone), // Clone last items at beginning
              ...children, // Original items
              ...children.slice(0, slidesToClone) // Clone first items at end
          ]
        : children

    const [currentSlide, setCurrentSlide] = useState(infinite ? slidesToClone : 0)

    // Handle seamless infinite transitions
    useEffect(() => {
        if (!infinite || !isTransitioning) return

        const handleTransitionEnd = () => {
            setIsTransitioning(false)
            if (currentSlide >= totalSlides + slidesToClone) {
                setCurrentSlide(slidesToClone)
            } else if (currentSlide < slidesToClone) {
                setCurrentSlide(totalSlides + slidesToClone - 1)
            }
            setTimeout(() => setIsTransitioning(true), 50)
        }

        const slider = sliderRef.current
        if (slider) {
            slider.addEventListener("transitionend", handleTransitionEnd)
            return () => slider.removeEventListener("transitionend", handleTransitionEnd)
        }
    }, [infinite, currentSlide, totalSlides, slidesToClone, isTransitioning])

    useEffect(() => {
        if (!autoSlide || isHovered) return

        const interval = setInterval(() => {
            setCurrentSlide((prev) => {
                if (infinite) {
                    return prev + 1
                } else {
                    return prev >= maxSlideIndex ? 0 : prev + 1
                }
            })
        }, autoSlideInterval)

        return () => clearInterval(interval)
    }, [autoSlide, autoSlideInterval, maxSlideIndex, isHovered, infinite])

    useEffect(() => {
        if (onSlideChange) {
            onSlideChange(currentSlide)
        }
    }, [currentSlide, onSlideChange])

    const goToNext = () => {
        if (!isTransitioning) return
        setCurrentSlide((prev) => {
            if (infinite) {
                return prev + 1
            } else {
                return Math.min(prev + 1, maxSlideIndex)
            }
        })
    }

    const goToPrev = () => {
        if (!isTransitioning) return
        setCurrentSlide((prev) => {
            if (infinite) {
                return prev - 1
            } else {
                return Math.max(prev - 1, 0)
            }
        })
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

    const itemPercent = 100 / slidesToShow
    const currentChildren = infinite ? infiniteChildren : children

    const gapValue = Number.parseFloat(gap) || 0
    const shouldUseGap = slidesToShow > 1 && gapValue > 0
    const totalMarginsPx = shouldUseGap ? (slidesToShow - 1) * gapValue : 0

    const itemWidth = shouldUseGap ? `calc((100% - ${totalMarginsPx}px) / ${slidesToShow})` : `${itemPercent}%`

    const movementIndex = infinite ? (currentSlide - slidesToClone + totalSlides) % totalSlides : currentSlide

    const stepExpr = shouldUseGap
        ? `calc((100% - ${totalMarginsPx}px) / ${slidesToShow} + ${gapValue}px)`
        : `${itemPercent}%`

    const translateExpr = shouldUseGap
        ? `calc(-1 * (${stepExpr}) * ${movementIndex})`
        : `-${movementIndex * itemPercent}%`

    const containerWidth = "100%"

    return (
        <div
            className={twMerge(`flex flex-col gap-5`, controlsPosition === "top" && "flex-col-reverse")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={twMerge("w-full", yBorder && "border-y border-app-color-border")}>
                <div
                    className={twMerge(
                        "flex flex-col gap-5 relative overflow-hidden w-full lg:max-w-screen-xl lg:mx-auto",
                        className
                    )}
                >
                    <div
                        ref={sliderRef}
                        className={twMerge(
                            "flex ease-in-out",
                            isTransitioning ? "transition-transform duration-300" : "",
                            withDivider && "border-l border-app-color-border divide-x divide-app-color-border"
                        )}
                        style={{
                            transform: shouldUseGap
                                ? `translateX(${translateExpr})`
                                : `translateX(-${movementIndex * itemPercent}%)`,
                            width: containerWidth
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {currentChildren.map((child, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 h-full"
                                style={{
                                    width: itemWidth,
                                    flexShrink: 0,
                                    marginLeft: shouldUseGap && index > 0 ? gap : "0px"
                                }}
                            >
                                {child}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showNavigation && maxSlideIndex > 0 && (isMobile || forceSlider) && showControls && (
                <div className="w-full lg:max-w-screen-xl lg:mx-auto">
                    <div
                        className={twMerge(
                            "flex gap-[10px] justify-end lg:max-w-screen-xl lg:mx-auto px-4 lg:px-0",
                            arrowClassName
                        )}
                    >
                        <ActionButton
                            onClick={goToPrev}
                            disabled={!infinite && currentSlide === 0}
                            aria-label="Previous slide"
                            className={"!mx-0 !focus:outline-none !focus:ring-0 !focus:ring-offset-0"}
                        >
                            <Icons.ArrowDown className="rotate-90" />
                        </ActionButton>
                        <ActionButton
                            onClick={goToNext}
                            disabled={!infinite && currentSlide >= maxSlideIndex}
                            aria-label="Next slide"
                            className="!mx-0 !focus:outline-none !focus:ring-0 !focus:ring-offset-0"
                        >
                            <Icons.ArrowDown className="-rotate-90" />
                        </ActionButton>
                    </div>
                </div>
            )}
        </div>
    )
}
