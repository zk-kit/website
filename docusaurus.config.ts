import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

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
        }
    ],

    plugins: [
        "./src/plugins/tailwind-config.ts"
    ],

    // Moved to local fonts to avoid blocking external requests

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: "https://github.com/zk-kit/website"
                },
                blog: {
                    routeBasePath: '/blog',
                    showReadingTime: true,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true
                    },
                    editUrl: "https://github.com/zk-kit/website",
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "warn",
                    blogSidebarCount: 0
                },
                theme: {
                    customCss: "./src/css/custom.css"
                }
            } satisfies Preset.Options
        ]
    ],

    themeConfig: {
        // Open Graph / social card image
        image: "og-share-zk-kot.webp",
        colorMode: {
            defaultMode: 'dark',
            disableSwitch: false,
            respectPrefersColorScheme: false,
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
                    label: "Home",
                },
                {
                    to: "/projects",
                    label: "Projects",
                },
                {
                    to: "/contribute",
                    label: "Contribute",
                },
                {
                    to: "/about",
                    label: "About",
                },
                 /* TODO: temporary hide documentation and blog section 
                {
                    to: "/blog",
                    label: "Blog",
                },
               
                {
                    to: "/docs/intro",
                    label: "Documentation",
                    position: "right"
                },
                */
            ]
        },
        // Footer is overridden by custom theme component
        footer: undefined,
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula
        },
        tableOfContents: {
            minHeadingLevel: 2,
            maxHeadingLevel: 3,
        }
    } satisfies Preset.ThemeConfig
}

export default config
