import { Slider } from "./Slider"
import { twMerge } from "tailwind-merge"
import { Children } from "react"
import { useMediaQuery } from "react-responsive"

interface ResponsiveSliderProps {
    children: React.ReactNode[]
    className?: string
    desktopClassName?: string
    mobileClassName?: string
    showNavigation?: boolean
    autoSlide?: boolean
    autoSlideInterval?: number
    onSlideChange?: (index: number) => void
    slidesToShow?: number
    gap?: string
    withDivider?: boolean
}

export const ResponsiveSlider = ({
    children,
    className,
    desktopClassName = "grid grid-cols-1 gap-[30px] lg:grid-cols-4",
    mobileClassName,
    showNavigation = true,
    autoSlide = false,
    autoSlideInterval = 3000,
    onSlideChange,
    slidesToShow = 1,
    gap = "20px",
    withDivider = true
}: ResponsiveSliderProps) => {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" })
    
    const validChildren = isMobile 
        ? Children.toArray(children).filter(child => {
            if (child && typeof child === 'object' && 'type' in child) {
                return (child.type as any)?.name !== 'AboutCardImage'
            }
            return child != null
        })
        : children
    
    return (
        <div className={className}>
            {/* Desktop view - Grid layout */}
            <div className={twMerge("!hidden md:block", desktopClassName)}>
                {children}
            </div>

            {/* Mobile view - Slider */}
            <Slider
                className={mobileClassName}
                showNavigation={showNavigation}
                autoSlide={autoSlide}
                autoSlideInterval={autoSlideInterval}
                onSlideChange={onSlideChange}
                slidesToShow={slidesToShow}
                withDivider={withDivider}
                gap={gap}
            >
                {validChildren}
            </Slider>
        </div>
    )
}