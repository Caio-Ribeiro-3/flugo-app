import type { Theme } from "./types";

class AppTheme implements Theme {
    DEFAULT_SPACING;
    iconSizes;
    spacing;
    palette;
    typography;
    borders;
    boxShadow;
    components;

    constructor() {
        this.DEFAULT_SPACING = 8

        this.iconSizes = {
            small: 16,
            medium: 24,
            large: 32
        }

        this.spacing = (value: number): string => {
            return `${this.DEFAULT_SPACING * value}px`
        }

        this.palette = {
            primary: {
                main: '#22C55E'
            },
            text: {
                primary: '#212B36',
                secondary: '#637381',
                disabled: '#919EAB'
            },
            divider: 'rgba(145, 158, 171, 0.2)',
            success: {
                main: '#118D57',
            },
            error: {
                main: '#B71D18',
            },
        }

        this.typography = {
            fontFamily: 'Public Sans, sans-serif',
            body: {
                fontSize: 14,
                lineHeight: 36 / 14,
                fontWeight: 700,
                color: this.palette.text.secondary
            },
            body2: {
                fontSize: 14,
                lineHeight: 36 / 24,
                fontWeight: 700,
                color: this.palette.text.secondary
            },
            h4: {
                fontSize: 24,
                lineHeight: 36 / 24,
                fontWeight: 700,
                color: this.palette.text.primary
            }
        }

        this.borders = {
            dashed: '1px dashed rgba(145, 158, 171, 0.2)'
        }

        this.boxShadow = {
            light: '0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)'
        }

        this.components = {
            table: {
                tableHeader: {
                    bgColor: '#F4F6F8'
                }
            }
        }
    }
}

export const theme = new AppTheme()