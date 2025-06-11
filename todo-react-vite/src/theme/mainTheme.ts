import {
    blueGrey,
    common,
    green,
    grey,
    lightGreen,
    orange,
    red,
    yellow,
} from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { COLORS } from '../globalVariables/styledVariables'

const baseTheme = createTheme({
    typography: {
        fontFamily: '"Helvetica", Sans-Serif',
        fontSize: 16,
    },
    customColors: { ...COLORS },
    components: {
        MuiCssBaseline: {
            styleOverrides: (theme) => ({
                'html, body, #root': {
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                },
                '.gu-mirror': {
                    display: 'none !important',
                },

                'input:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
                    WebkitTextFillColor: 'inherit !important',
                    caretColor: 'currentColor !important',
                    transition: 'background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s',
                },
                'input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
                    {
                        WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
                        WebkitTextFillColor: 'inherit !important',
                        caretColor: 'currentColor !important',
                    },
            }),
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    whiteSpace: 'nowrap',
                    padding: 0,
                    minWidth: 0,
                    borderRadius: 0,
                    backgroundColor: 'transparent',
                    transition: '0.1s ease',
                    color: common.black,
                    textTransform: 'none',
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: ({ theme }) => ({
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        color: theme.palette.text.primary,

                        '& .MuiInputBase-input::placeholder': {
                            color: theme.palette.text.secondary,
                            opacity: 2,
                        },

                        '& fieldset': {
                            borderColor: theme.palette.text.primary,
                            borderWidth: 2,
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.text.primary,
                            borderWidth: 2,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.input.secondary,
                            borderWidth: 2,
                        },

                        '&.Mui-error': {
                            '& fieldset': {
                                borderColor: theme.palette.error.main,
                                borderWidth: 3,
                            },
                        },
                    },

                    '& .MuiInputLabel-root': {
                        color: theme.palette.text.primary,

                        '&.Mui-focused': {
                            color: theme.palette.input.secondary,
                        },
                        '&.Mui-error': {
                            color: theme.palette.error.main,
                        },
                    },

                    '& .MuiFormHelperText-root': {
                        color: theme.palette.text.secondary,

                        '&.Mui-error': {
                            color: theme.palette.error.main,
                        },
                    },
                }),
            },
        },

        MuiSvgIcon: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.primary,
                }),
            },
        },
    },
})

export const lightTheme = createTheme(baseTheme, {
    palette: {
        mode: 'light',
        background: {
            default: common.white,
            paper: grey[300],
        },
        primary: {
            main: orange[400],
            contrastText: common.black,
        },
        secondary: {
            main: green[700],
            contrastText: common.white,
        },
        text: {
            primary: grey[800],
            secondary: grey[600],
            tertiary: grey[400],
            main: grey[200],
            support: orange[400],
        },
        btn: {
            main: grey[600],
            helper: grey[400],
            support: grey[200],
            auth: orange[400],
            authSupport: orange[600],
            agree: lightGreen.A200,
            agreeSupport: green[700],
            disagree: red[100],
            disagreeSupport: red[700],
            edit: yellow[800],
            editSupport: yellow[100],
        },
        input: {
            primary: orange[400],
            secondary: orange[600],
            tertiary: orange[800],
        },
        alarm: {
            primary: '#d32f2f',
        },
        loader: {
            primary: grey[600],
            secondary: grey[400],
            tertiary: orange[400],
        },
        shadow: {
            primary: grey[200],
        },
    },
})

export const darkTheme = createTheme(baseTheme, {
    palette: {
        mode: 'dark',
        background: {
            default: blueGrey[700],
            paper: blueGrey[900],
        },
        primary: {
            main: orange[400],
            contrastText: common.black,
        },
        secondary: {
            main: green[700],
            contrastText: common.white,
        },
        text: {
            primary: grey[200],
            secondary: grey[400],
            tertiary: grey[800],
            main: blueGrey[500],
            support: orange[400],
        },
        btn: {
            main: orange[400],
            helper: grey[300],
            support: grey[100],
            auth: orange[400],
            authSupport: orange[600],
            agree: lightGreen.A200,
            agreeSupport: green[700],
            disagree: red[100],
            disagreeSupport: red[700],
            edit: yellow[800],
            editSupport: yellow[100],
        },
        input: {
            primary: orange[400],
            secondary: orange[600],
            tertiary: orange[800],
        },
        alarm: {
            primary: '#d32f2f',
        },

        loader: {
            primary: grey[200],
            secondary: grey[400],
            tertiary: orange[400],
        },
        shadow: {
            primary: blueGrey[900],
        },
    },
})
