"use client"

import { twMerge } from "tailwind-merge"
import { Label } from "./Label"
import { AppContent } from "../AppContent"
import { useMediaQuery } from "react-responsive"

interface BannerProps {
    title: string
    description?: string
    children?: React.ReactNode
    illustration?: string
    illustrationWidth?: number
    illustrationOnMobile?: number
}

export const Banner = ({
    title,
    description,
    children,
    illustration,
    illustrationWidth,
    illustrationOnMobile = 1
}: BannerProps) => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" })

    return (
        <div className="bg-app-color-background-secondary py-14 lg:py-[90px] overflow-hidden">
            <AppContent
                className="grid items-center gap-[30px] px-5 pt-5 lg:px-0 py-10 lg:py-16 lg:gap-[60px] lg:min-h-[350px] bg-app-color-background border border-app-color-border"
                as="div"
                style={{
                    gridTemplateColumns: isMobile
                        ? `1fr`
                        : `minmax(0, ${illustrationWidth}px) 1fr minmax(0, ${illustrationWidth}px)`
                }}
            >
                {!isMobile && (
                    <div
                        className="object-cover h-[350px] lg:h-full "
                        style={{
                            width: `${illustrationWidth}px`,
                            backgroundImage: `url(${illustration})`
                        }}
                    ></div>
                )}

                <div className="flex flex-col gap-[30px] text-center items-center text-app-color-text-base">
                    <Label.PageTitle as="span">{title}</Label.PageTitle>
                    {description && (
                        <span className="text-base text-app-color-text-base font-satoshi mx-auto lg:mx-auto max-w-[410px]">
                            {description}
                        </span>
                    )}
                    {children}
                </div>

                <div
                    className={twMerge(
                        "flex justify-between h-[350px] lg:h-full",
                        isMobile && illustrationOnMobile === 1 && "mx-auto"
                    )}
                >
                    {isMobile && illustrationOnMobile !== 1 && (
                        <div
                            className="object-cover h-full"
                            style={{
                                width: `${illustrationWidth}px`,
                                backgroundImage: `url(${illustration})`,
                                backgroundRepeat: `no-repeat`
                            }}
                        ></div>
                    )}
                    <div
                        className="object-cover h-full"
                        style={{
                            width: `${illustrationWidth}px`,
                            backgroundImage: `url(${illustration})`,
                            transform: `scaleX(-1)`,
                            backgroundRepeat: `no-repeat`
                        }}
                    ></div>
                </div>
            </AppContent>
        </div>
    )
}
