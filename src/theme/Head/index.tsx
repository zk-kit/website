import Head from "@docusaurus/Head"
import { TOCFix } from "@site/src/components/TOCFix"

export default function CustomHead(): JSX.Element {
    return (
        <>
            <TOCFix />
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    // Immediate fix for clientHeight error - runs before any React code
                    (function() {
                        // Patch querySelector immediately to redirect .navbar queries to nav
                        var originalQS = document.querySelector;
                        document.querySelector = function(sel) {
                            if (sel === '.navbar') {
                                var nav = originalQS.call(document, 'nav');
                                if (nav) {
                                    return nav;
                                }
                                // Fallback: create a temporary element if nav doesn't exist yet
                                var fallback = document.createElement('nav');
                                fallback.style.cssText = 'height:100px;position:fixed;top:0;width:100%;';
                                return fallback;
                            }
                            return originalQS.call(document, sel);
                        };
                        
                        // Also patch querySelectorAll for completeness
                        var originalQSA = document.querySelectorAll;
                        document.querySelectorAll = function(sel) {
                            if (sel === '.navbar') {
                                var nav = originalQS.call(document, 'nav');
                                return nav ? [nav] : [];
                            }
                            return originalQSA.call(document, sel);
                        };
                    })();
                `
                    }}
                />
                {/* Preload critical Variable fonts */}
                <link
                    rel="preload"
                    href="/static/fonts/ClashGrotesk-Variable.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/static/fonts/Satoshi-Variable.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                {/* Preload fallback fonts */}
                <link
                    rel="preload"
                    href="/static/fonts/ClashGrotesk-Medium.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/static/fonts/Satoshi-Regular.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />

                {/* Critical resource hints */}
                <link rel="preconnect" href="/static/fonts" crossOrigin="anonymous" />

                {/* DNS prefetch for external resources */}
                <link rel="dns-prefetch" href="//github.com" />
                <link rel="dns-prefetch" href="//pse.dev" />

                {/* Optimize loading */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preload" as="image" href="/img/illustrations/intro-illustration.svg" fetchpriority="high" />

                {/* Preload Open Graph image */}
                <link rel="preload" as="image" href="/og-share-zk-kot.webp" />

                {/* Open Graph image dimensions (recommended) */}
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/webp" />

                {/* Twitter card specifics */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@zkkit" />
                <meta name="twitter:creator" content="@zkkit" />
            </Head>
        </>
    )
}
