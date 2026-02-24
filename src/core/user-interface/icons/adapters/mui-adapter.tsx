import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { SvgIconTypeMap } from "@mui/material";

import type { BaseIconProps, BaseUserInterfaceProps } from "../../types";

export function withMaterialAdapter(Icon: OverridableComponent<SvgIconTypeMap<object, "svg">>) {
    return function ({
        size = 'medium',
        _css
    }: BaseUserInterfaceProps<BaseIconProps>
    ) {
        return <Icon sx={_css} fontSize={size} />
    }
}