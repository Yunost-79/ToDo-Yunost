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
        main: string
    }

    interface Palette {
        btn: {
            main: string
            helper: string
            support: string
            auth: string
            authSupport: string
            agree: string
            agreeSupport: string
            disagree: string
            disagreeSupport: string
            edit: string
            editSupport: string
        }
        input: {
            primary: string
            secondary: string
            tertiary: string
        }
        alarm: {
            primary: string
        }
        loader: {
            primary: string
            secondary: string
            tertiary: string
        }
        shadow: {
            primary: string
        }
    }
    interface PaletteOptions {
        btn?: {
            main: string
            helper: string
            support: string
            auth: string
            authSupport: string
            agree: string
            agreeSupport: string
            disagree: string
            disagreeSupport: string
            edit: string
            editSupport: string
        }

        input?: {
            primary: string
            secondary: string
            tertiary: string
        }
        alarm?: {
            primary: string
        }
        loader?: {
            primary: string
            secondary: string
            tertiary: string
        }
        shadow: {
            primary: string
        }
    }
}
