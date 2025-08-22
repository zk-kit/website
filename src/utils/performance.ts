/**
 * Performance optimization utilities
 */

/**
 * Lazy load JavaScript modules when needed
 */
export const lazyLoadModule = async <T>(
    importFn: () => Promise<T>,
    delay: number = 0
): Promise<T> => {
    if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay))
    }
    return importFn()
}

/**
 * Defer execution until idle time
 */
export const requestIdleCallback = (
    callback: () => void,
    options?: { timeout?: number }
): void => {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, options)
    } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(callback, 1)
    }
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Optimize animations based on user preference
 */
export const getAnimationConfig = (defaultDuration: number = 300) => {
    return {
        duration: prefersReducedMotion() ? 0 : defaultDuration,
        easing: prefersReducedMotion() ? 'linear' : 'ease-in-out'
    }
}

/**
 * Preload critical resources
 */
export const preloadResource = (
    href: string, 
    as: string, 
    type?: string,
    crossorigin?: string
): void => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (type) link.type = type
    if (crossorigin) link.crossOrigin = crossorigin
    document.head.appendChild(link)
}

/**
 * Remove unused CSS from the DOM
 */
export const removeUnusedStyles = (selectors: string[]): void => {
    requestIdleCallback(() => {
        const stylesheets = Array.from(document.styleSheets)
        
        stylesheets.forEach(stylesheet => {
            if (!stylesheet.href || stylesheet.href.includes(window.location.origin)) {
                try {
                    const rules = Array.from(stylesheet.cssRules || [])
                    rules.forEach((rule, index) => {
                        if (rule.type === CSSRule.STYLE_RULE) {
                            const styleRule = rule as CSSStyleRule
                            if (selectors.some(selector => styleRule.selectorText?.includes(selector))) {
                                stylesheet.deleteRule(index)
                            }
                        }
                    })
                } catch (e) {
                    // Silently fail for cross-origin stylesheets
                }
            }
        })
    })
}

/**
 * Optimize images by setting proper loading attributes
 */
export const optimizeImages = (): void => {
    requestIdleCallback(() => {
        const images = document.querySelectorAll('img:not([loading])')
        images.forEach((img, index) => {
            // First few images should load immediately (above fold)
            if (index < 3) {
                img.setAttribute('loading', 'eager')
            } else {
                img.setAttribute('loading', 'lazy')
            }
        })
    })
}