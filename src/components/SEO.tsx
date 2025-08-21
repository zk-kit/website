import Head from "@docusaurus/Head"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

interface SEOProps {
    title?: string
    description?: string
    image?: string
    url?: string
    type?: "website" | "article"
    keywords?: string[]
}

export const SEO = ({
    title,
    description,
    image,
    url,
    type = "website",
    keywords = []
}: SEOProps) => {
    const { siteConfig } = useDocusaurusContext()
    
    const pageTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title
    const pageDescription = description || siteConfig.tagline
    const pageUrl = url || siteConfig.url
    const pageImage = image || `${siteConfig.url}/og-share-zk-kot.webp`
    
    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
            
            {/* Open Graph */}
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:image" content={pageImage} />
            <meta property="og:site_name" content={siteConfig.title} />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content={pageImage} />
            
            {/* Additional meta tags */}
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={pageUrl} />
        </Head>
    )
}