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
    desktopSlidesToShow?: number
    gap?: string
    desktopGap?: string
    withDivider?: boolean
    forceSlider?: boolean
    controlsPosition?: "top" | "bottom"
    showControls?: boolean
    infinite?: boolean
    // Alias props for convenience
    autoPlay?: boolean
    autoPlaySpeed?: number
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
    desktopSlidesToShow,
    gap = "0px",
    desktopGap = "30px",
    withDivider = true,
    forceSlider = false,
    controlsPosition = "bottom",
    showControls = true,
    infinite = false,
    // Alias props for convenience
    autoPlay = false,
    autoPlaySpeed = 3000
}: ResponsiveSliderProps) => {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

    const validChildren =
        isMobile || forceSlider
            ? Children.toArray(children).filter((child) => {
                  if (child && typeof child === "object" && "type" in child) {
                      return (child.type as any)?.name !== "AboutCardImage"
                  }
                  return child != null
              })
            : children

    // Determine current slidesToShow and gap based on screen size
    const currentSlidesToShow = isMobile ? slidesToShow : (desktopSlidesToShow ?? slidesToShow)
    const currentGap = isMobile ? gap : (desktopGap ?? gap)

    return (
        <div className={className}>
            {/* Desktop view - Grid layout (only when not forcing slider and not mobile) */}
            {!forceSlider && !isMobile && <div className={desktopClassName}>{children}</div>}

            {/* Mobile view - Slider (or forced desktop slider) */}
            {(isMobile || forceSlider) && (
                <Slider
                    className={mobileClassName}
                    showNavigation={showNavigation}
                    autoSlide={autoSlide || autoPlay}
                    autoSlideInterval={autoSlideInterval || autoPlaySpeed}
                    onSlideChange={onSlideChange}
                    slidesToShow={currentSlidesToShow}
                    gap={currentGap}
                    withDivider={withDivider}
                    controlsPosition={controlsPosition}
                    forceSlider={forceSlider}
                    showControls={showControls}
                    infinite={infinite}
                >
                    {validChildren}
                </Slider>
            )}
        </div>
    )
}
