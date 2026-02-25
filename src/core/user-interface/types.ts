export interface Theme {
    DEFAULT_SPACING: number;
    iconSizes: Record<('small' | 'medium' | 'large'), number>
    spacing(value: number): string
    typography: {
        fontFamily?: string;
    } & Record<'body' | 'body2' | 'h4', { fontSize: number; fontWeight: number; lineHeight: number; color: string; }>
    palette: {
        primary: {
            main: string
        },
        text: {
            primary: string,
            secondary: string
            disabled: string
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
        dashed: string,
    },
    boxShadow: {
        light: string
    },
    components: {
        table: {
            tableHeader: {
                bgColor: string
            }
        }
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
    _css?: Omit<React.CSSProperties, 'gap'> & {
        display?: 'flex';
        justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
        gap?: (string | number | ((payload: Pick<Theme, 'spacing'>) => ReturnType<Theme['spacing']>));
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