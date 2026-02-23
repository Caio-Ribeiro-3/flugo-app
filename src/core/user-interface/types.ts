export interface Theme {
    DEFAULT_SPACING: number;
    iconSizes: Record<('small' | 'medium' | 'large'), number>
    spacing(value: number): string
    typography: {
        fontFamily?: string;
    } & Record<string, { fontSize: number; fontWeight: number; lineHeight: number; color: string; }>
    palette: {
        primary: {
            main: string
        },
        text: {
            primary: string,
            secondary: string
        },
        divider: string
        success: {
            main: string
        },
        error: {
            main: string
        },
    },
    borders: {
        dotted: {
            main: string;
        },
    },
    boxShadow: {
        light: string
    }
}

type Directions = 'y' | 'x' | 't' | 'r' | 'b' | 'l'

type Spacing<Prefix extends string, Suffix extends Directions | never = Directions> = Partial<
    Record<
        (Prefix | `${Prefix}${Suffix}`),
        (string | number | ((payload: Pick<Theme, 'spacing'>) => ReturnType<Theme['spacing']>))
    >
>

export type BaseUserInterfaceProps<ComponentProps = unknown> = ComponentProps & {
    _css?: React.CSSProperties & {
        display?: 'flex';
        alignItems?: 'flex-start' | 'center' | 'flex-end';
        justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
        gap?: number | ((payload: Pick<Theme, 'spacing'>) => ReturnType<Theme['spacing']>);
        flexShrink?: number;
        flexGrow?: number;
        flexBasis?: number;
        flexDirection?: 'column' | 'row';
    } & Spacing<'m'>
    & Spacing<'p'>
}

export interface BaseIconProps {
    size?: keyof Theme['iconSizes']
}