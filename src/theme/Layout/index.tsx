import React, { type ReactNode, useEffect } from "react"
import OriginalLayout from "@theme-original/Layout"

interface Props {
    children: ReactNode
}

export default function Layout({ children }: Props): ReactNode {
    useEffect(() => {
        document.body.classList.add("page-loaded")
    }, [])

    return <OriginalLayout>{children}</OriginalLayout>
}
