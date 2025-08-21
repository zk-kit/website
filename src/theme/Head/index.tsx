import Head from '@docusaurus/Head'

export default function CustomHead(): JSX.Element {
    return (
        <Head>
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
    )
}