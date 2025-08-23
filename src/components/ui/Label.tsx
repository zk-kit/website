interface LabelProps {
    children: React.ReactNode
    className?: string
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"
    size?: "lg" | "md" | "sm"
}

const PageTitle = ({ children, className, as = "h1", size = "lg" }: LabelProps) => {
    const sizeClass = {
        lg: "!leading-[52.3px] !text-5xl lg:!text-[80px] lg:!leading-[88px]",
        md: "!text-[38px] lg:!text-[60px] !leading-[38px] lg:!leading-[60px]",
        sm: "!text-2xl lg:!text-[32px]"
    }

    const Component = as
    
    return (
        <Component 
            className={`!font-normal text-app-color-text-base !mb-0 ${className || ""} ${sizeClass[size]}`}
            style={{
                fontFamily: '"ClashGrotesk-Variable", "ClashGrotesk-Medium", system-ui, sans-serif'
            }}
        >
            {children}
        </Component>
    )
}

const SectionTitle = ({ children, className, as = "h2", size = "sm" }: LabelProps) => {
    const sizeClass = {
        lg: "!leading-[52.3px] !text-5xl lg:!text-[80px] lg:!leading-[88px]",
        md: "!text-[38px] lg:!text-[60px] !leading-[38px] lg:!leading-[60px]",
        sm: "!text-2xl lg:!text-[32px]"
    }

    const Component = as
    
    return (
        <Component 
            className={`font-normal text-app-color-text-base !mb-0 ${className || ""} ${sizeClass[size]}`}
        >
            {children}
        </Component>
    )
}

export const Label = {
    PageTitle,
    SectionTitle
}
