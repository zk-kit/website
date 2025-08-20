import { Slider } from "./Slider"
import { twMerge } from "tailwind-merge"

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
    return (
        <div className={className}>
            {/* Desktop view - Grid layout */}
            <div className={twMerge("!hidden lg:block", desktopClassName)}>
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
                {children}
            </Slider>
        </div>
    )
}