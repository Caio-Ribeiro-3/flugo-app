import type { Theme } from "./types";

class AppTheme implements Theme {
    DEFAULT_SPACING;
    iconSizes;
    spacing;
    palette;
    typography;

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
                secondary: '#637381'
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
    }
}

export const theme = new AppTheme()