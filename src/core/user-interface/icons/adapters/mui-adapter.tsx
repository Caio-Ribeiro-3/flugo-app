import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconTypeMap } from "@mui/material";

import type { BaseIconProps } from "../../types";

export function withMaterialAdapter(Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>) {
    return function ({
        size = 'medium'
    }: BaseIconProps
    ) {
        return <Icon fontSize={size} />
    }
}