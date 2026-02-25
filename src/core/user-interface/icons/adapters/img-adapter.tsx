import type React from "react"
import type { BaseIconProps, BaseUserInterfaceProps } from "../../types"
import { useTheme } from "../../context-provider"

export function withImageAdapter<T extends { style?: React.CSSProperties }>(Icon: React.ComponentType<T>) {
    return function ({
        size = 'medium',
        ...rest
    }: BaseUserInterfaceProps<BaseIconProps> & Partial<T>
    ) {
        const theme = useTheme()
        return (
            <Icon
                {...(rest as T)}
                style={{
                    height: theme.iconSizes[size],
                    width: theme.iconSizes[size],
                    ...((rest as any).style || {}),
                }}
            />
        )
    }
}