import { memo, type PropsWithChildren } from "react";

import { Box } from "@mui/material";

import type { BaseUserInterfaceProps } from "./types";

export const Base = memo(({
    children,
    _css
}: PropsWithChildren<BaseUserInterfaceProps>) => {
    return (
        <Box
            sx={_css}
        >
            {children}
        </Box>
    )
})