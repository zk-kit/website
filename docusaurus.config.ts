import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: "ZK-Kit",
    tagline: "A set of reusable libraries for zero-knowledge technologies.",
    favicon: "img/zk-kit-logo.svg",

    // Set the production url of your site here
    url: "https://zkkit.org",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "zk-kit", // Usually your GitHub org/user name.
    projectName: "zk-kit", // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"]
    },

    headTags: [
        {
            tagName: "meta",
            attributes: {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
            }
        },
        {
            tagName: "meta",
            attributes: {
                name: "theme-color",
                content: "#000000"
            }
        }
        // Add google-site-verification meta tag here when you get it from Google Search Console
    ],

    stylesheets: [
        {
            href: "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css",
            type: "text/css",
            integrity: "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
            crossorigin: "anonymous"
        }
    ],

    plugins: ["./src/plugins/tailwind-config.ts"],

    // Moved to local fonts to avoid blocking external requests

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    routeBasePath: "docs",
                    path: "docs",
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: "https://github.com/zk-kit/website",
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex]
                },
                blog: {
                    routeBasePath: "/blog",
                    showReadingTime: true,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true
                    },
                    editUrl: "https://github.com/zk-kit/website",
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "warn",
                    blogSidebarCount: 0,
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex]
                },
                theme: {
                    customCss: "./src/css/custom.css"
                },
                pages: {
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex]
                },
                sitemap: {
                    changefreq: "weekly",
                    priority: 0.5,
                    ignorePatterns: [
                        "/tags/**",
                        "/blog/authors/**",
                        "/blog/archive",
                        "/blog/tags/**",
                        "/tutorial-basics/**",
                        "/tutorial-extras/**",
                        "/markdown-page"
                    ],
                    filename: "sitemap.xml",
                    createSitemapItems: async (params) => {
                        const { defaultCreateSitemapItems, ...rest } = params
                        const items = await defaultCreateSitemapItems(rest)

                        // Use current date as lastmod for all pages
                        const lastModDate = new Date().toISOString()

                        return items.map((item) => {
                            const url = item.url

                            // Homepage - highest priority
                            if (url === "https://zkkit.org/" || url === "https://zkkit.org") {
                                return {
                                    ...item,
                                    priority: 1.0,
                                    changefreq: "weekly",
                                    lastmod: lastModDate
                                }
                            }

                            // Main sections for sitelinks - high priority
                            if (
                                url === "https://zkkit.org/projects/" ||
                                url === "https://zkkit.org/projects" ||
                                url === "https://zkkit.org/contribute/" ||
                                url === "https://zkkit.org/contribute" ||
                                url === "https://zkkit.org/about/" ||
                                url === "https://zkkit.org/about" ||
                                url === "https://zkkit.org/blog" ||
                                url === "https://zkkit.org/blog/"
                            ) {
                                return {
                                    ...item,
                                    priority: 0.9,
                                    changefreq: "weekly",
                                    lastmod: lastModDate
                                }
                            }

                            // Documentation main pages - high priority for sitelinks
                            if (
                                url === "https://zkkit.org/docs" ||
                                url === "https://zkkit.org/docs/" ||
                                url === "https://zkkit.org/docs/introduction/what-is-zk-kit" ||
                                url === "https://zkkit.org/docs/getting-started/installation"
                            ) {
                                return {
                                    ...item,
                                    priority: 0.9,
                                    changefreq: "weekly",
                                    lastmod: lastModDate
                                }
                            }

                            // Blog posts - medium priority
                            if (url.includes("/blog/") && !url.includes("/tags/") && !url.includes("/authors/")) {
                                return {
                                    ...item,
                                    priority: 0.6,
                                    changefreq: "monthly",
                                    lastmod: lastModDate
                                }
                            }

                            // Docs pages - medium-high priority (when docs are enabled)
                            if (url.includes("/docs/")) {
                                return {
                                    ...item,
                                    priority: 0.7,
                                    changefreq: "weekly",
                                    lastmod: lastModDate
                                }
                            }

                            // All other pages - lower priority
                            return {
                                ...item,
                                priority: 0.5,
                                changefreq: "monthly",
                                lastmod: lastModDate
                            }
                        })
                    }
                }
            } satisfies Preset.Options
        ]
    ],

    themeConfig: {
        // Open Graph / social card image
        image: "og-share-zk-kot.webp",
        metadata: [
            {
                name: "description",
                content: "ZK-Kit is an innovative toolkit that provides reference implementations of cryptographic primitives across multiple programming languages."
            },
            {
                name: "keywords",
                content: "zero-knowledge, zk-kit, cryptography, privacy, blockchain, zkp, zk-snarks, merkle trees, semaphore, rollup"
            },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: "ZK-Kit" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:site", content: "@zkkitDevs" }
        ],
        colorMode: {
            defaultMode: "dark",
            disableSwitch: false,
            respectPrefersColorScheme: false
        },
        // Navbar is overridden by custom theme component but config needed for AppNavbar
        navbar: {
            title: "",
            logo: {
                alt: "ZK-Kit Logo",
                src: "img/zk-kit-full-logo.svg"
            },
            items: [
                {
                    to: "/",
                    label: "Home"
                },
                {
                    to: "/projects",
                    label: "Projects"
                },
                {
                    to: "/contribute",
                    label: "Contribute"
                },
                {
                    to: "/about",
                    label: "About"
                },
                {
                    to: "/blog",
                    label: "Blog",
                },
                {
                    to: "/docs",
                    label: "Documentation",
                    position: "right"
                },
            ]
        },
        // Footer is overridden by custom theme component
        footer: undefined,
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['rust', 'solidity', 'python', 'javascript', 'typescript', 'json', 'bash']
        },
        markdown: {
            format: 'detect',
            mermaid: false
        },
        tableOfContents: {
            minHeadingLevel: 2,
            maxHeadingLevel: 3
        }
    } satisfies Preset.ThemeConfig
}

export default config
