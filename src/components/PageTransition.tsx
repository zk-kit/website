import React, { useEffect, useState } from 'react'
import { useLocation } from '@docusaurus/router'
import { twMerge } from 'tailwind-merge'

interface PageTransitionProps {
    children: React.ReactNode
    className?: string
}

export const PageTransition = ({ children, className }: PageTransitionProps) => {
    const location = useLocation()
    const [isVisible, setIsVisible] = useState(false)
    const [displayLocation, setDisplayLocation] = useState(location)

    useEffect(() => {
        if (location !== displayLocation) {
            setIsVisible(false)
        }
    }, [location, displayLocation])

    useEffect(() => {
        if (location === displayLocation) {
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 50)
            return () => clearTimeout(timer)
        }
    }, [location, displayLocation])

    useEffect(() => {
        if (!isVisible && location !== displayLocation) {
            const timer = setTimeout(() => {
                setDisplayLocation(location)
                setIsVisible(true)
            }, 150)
            return () => clearTimeout(timer)
        }
    }, [isVisible, location, displayLocation])

    useEffect(() => {
        // Set initial visibility
        setIsVisible(true)
    }, [])

    return (
        <div
            className={twMerge(
                'page-transition',
                isVisible ? 'page-transition-visible' : 'page-transition-hidden',
                className
            )}
        >
            {children}
        </div>
    )
}