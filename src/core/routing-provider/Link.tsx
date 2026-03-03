import type { PropsWithChildren } from "react"
import { Link as LinkTS } from '@tanstack/react-router'
import { Typography } from "../user-interface/typography";



interface LinkProps {
    to: string;
}

export const Link = ({ to, children }: PropsWithChildren<LinkProps>) => {
    return (
        <LinkTS to={to}>
            <Typography variant="caption" color="text.primary">
                {children}
            </Typography>
        </LinkTS>
    )
}