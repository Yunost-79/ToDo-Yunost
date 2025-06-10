export declare module '@mui/material/styles' {
    interface Theme {
        customColors: typeof COLORS
    }
    interface ThemeOptions {
        customColors?: typeof COLORS
    }

    interface TypeText {
        support: string
        tertiary: string
    }

    interface Palette {
        btn: {
            main: string
            support: string
            auth: string
            authSupport: string
        }
        input: {
            primary: string
            secondary: string
            tertiary: string
        }
        alarm: {
            primary: string
        }
    }
    interface PaletteOptions {
        btn?: {
            main: string
            support: string
            auth: string
            authSupport: string
        }

        input?: {
            primary: string
            secondary: string
            tertiary: string
        }
        alarm: {
            primary: string
        }
    }
}
