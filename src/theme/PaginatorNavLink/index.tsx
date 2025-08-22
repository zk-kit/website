import React, { type ReactNode } from "react"
import clsx from "clsx"
import Link from "@docusaurus/Link"
import type { Props } from "@theme/PaginatorNavLink"

export default function PaginatorNavLink(props: Props): ReactNode {
    const { permalink, title, subLabel, isNext } = props
    return (
        <Link
            className={clsx("group", isNext ? "pagination-nav__link--next" : "pagination-nav__link--prev")}
            style={{ padding: "0px", border: "none" }}
            to={permalink}
        >
            <div
                className={clsx(
                    "!border !border-app-color-border !bg-app-color-background !p-[30px] !rounded-none group-hover:!bg-app-color-background-secondary transition-opacity duration-200"
                )}
            >
                {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
                <div className="pagination-nav__label">{title}</div>
            </div>
        </Link>
    )
}
