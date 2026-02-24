import type { ReactNode } from "react"
import type { BaseIconProps, BaseUserInterfaceProps } from "../../types"
import { useTheme } from "../../context-provider"

export function withImageAdapter(Icon: (props) => ReactNode) {
    return function ({
        size = 'medium'
    }: BaseUserInterfaceProps<BaseIconProps>
    ) {
        const theme = useTheme()
        return (
            <Icon
                style={{
                    height: theme.iconSizes[size],
                    width: theme.iconSizes[size],
                }}
            />
        )
    }
}