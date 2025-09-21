interface LabelProps {
    children: React.ReactNode
    className?: string
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"
    size?: "lg" | "md" | "sm"
}

const PageTitle = ({ children, className, as = "h1", size = "lg" }: LabelProps) => {
    const Component = as

    return <Component className={`label-page-title label-page-title-${size} ${className || ""}`}>{children}</Component>
}

const SectionTitle = ({ children, className, as = "h2", size = "sm" }: LabelProps) => {
    const Component = as

    return (
        <Component className={`label-section-title label-page-title-${size} ${className || ""}`}>{children}</Component>
    )
}

export const Label = {
    PageTitle,
    SectionTitle
}
