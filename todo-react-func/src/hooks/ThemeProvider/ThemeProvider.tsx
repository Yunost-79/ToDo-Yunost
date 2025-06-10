import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { FC, ReactNode, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { darkTheme, lightTheme } from '../../theme/mainTheme'

type CustomThemeProviderProps = {
    children: ReactNode
}

const CustomThemeProvider: FC<CustomThemeProviderProps> = ({ children }) => {
    const { modeTheme } = useSelector((state: RootState) => state.theme)

    const theme = useMemo(() => {
        return modeTheme ? darkTheme : lightTheme
    }, [modeTheme])
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default CustomThemeProvider
