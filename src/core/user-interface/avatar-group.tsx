import type { PropsWithChildren } from "react";

import MUIAvatarGroup from '@mui/material/AvatarGroup';

import type { BaseUserInterfaceProps } from "./types";
import { Base } from "./base";

export const AvatarGroup = ({ _css, children }: PropsWithChildren<BaseUserInterfaceProps>) => (
    <Base _css={{ width: 'fit-content', display: 'flex' }}>
        <MUIAvatarGroup
            max={3}
            sx={{
                alignSelf: 'flex-start',
                ..._css
            }}  >
            {children}
        </MUIAvatarGroup>
    </Base>
)