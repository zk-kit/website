import type { LoadContext, Plugin } from '@docusaurus/types'

export default function criticalCssPlugin(context: LoadContext): Plugin {
    return {
        name: 'critical-css-plugin',
        injectHtmlTags() {
            return {
                headTags: [
                    {
                        tagName: 'style',
                        innerHTML: `
                            /* Critical above-the-fold styles */
                            .font-clash-grotesk { 
                                font-family: "ClashGrotesk-Variable", "ClashGrotesk-Medium", system-ui, sans-serif; 
                                text-rendering: geometricPrecision;
                                -webkit-font-smoothing: antialiased;
                                -moz-osx-font-smoothing: grayscale;
                            }
                            .font-satoshi { 
                                font-family: "Satoshi-Variable", "Satoshi-Regular", system-ui, sans-serif; 
                                text-rendering: geometricPrecision;
                                -webkit-font-smoothing: antialiased;
                                -moz-osx-font-smoothing: grayscale;
                            }
                            .text-5xl { font-size: 3rem; line-height: 1; }
                            .lg\\:text-\\[80px\\] { font-size: 80px; }
                            .text-base { font-size: 1rem; line-height: 1.5rem; }
                            .w-full { width: 100%; }
                            @media (min-width: 1024px) {
                                .lg\\:text-\\[80px\\] { font-size: 80px; }
                                .lg\\:grid-cols-\\[minmax\\(0\\,600px\\)_400px\\] {
                                    grid-template-columns: minmax(0, 600px) 400px;
                                }
                            }
                        `
                    },
                    {
                        tagName: 'link',
                        attributes: {
                            rel: 'preload',
                            as: 'style',
                            href: '/assets/css/styles.css',
                            onload: "this.rel='stylesheet'"
                        }
                    },
                    {
                        tagName: 'noscript',
                        innerHTML: '<link rel="stylesheet" href="/assets/css/styles.css">'
                    },
                    {
                        tagName: 'link',
                        attributes: {
                            rel: 'preload',
                            as: 'font',
                            href: '/static/fonts/ClashGrotesk-Variable.woff2',
                            type: 'font/woff2',
                            crossorigin: 'anonymous'
                        }
                    },
                    {
                        tagName: 'link',
                        attributes: {
                            rel: 'preload',
                            as: 'font',
                            href: '/static/fonts/Satoshi-Variable.woff2',
                            type: 'font/woff2',
                            crossorigin: 'anonymous'
                        }
                    }
                ]
            }
        }
    }
}