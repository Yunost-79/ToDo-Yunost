import { styled } from '@mui/material/styles'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { PATHS } from './globalVariables/pathsVariables'
import PersistState from './hooks/PersistState/PersistState'
import CustomThemeProvider from './hooks/ThemeProvider/ThemeProvider'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import TodoPage from './pages/TodoPage'
import PrivateRoutes from './utils/routes/PrivateRoute'
import PublicRoutes from './utils/routes/PublicRoute'

const App = () => {
    return (
        <CustomThemeProvider>
            <StyledWrapper>
                <PersistState />
                <Router
                    future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true,
                    }}
                >
                    <Routes>
                        <Route element={<PrivateRoutes />}>
                            <Route path={PATHS.MAIN} element={<TodoPage />} />
                        </Route>

                        <Route element={<PublicRoutes />}>
                            <Route path={PATHS.SIGN_IN} element={<SignInPage />} />
                            <Route path={PATHS.SIGN_UP} element={<SignUpPage />} />
                        </Route>
                    </Routes>
                </Router>
            </StyledWrapper>
        </CustomThemeProvider>
    )
}

const StyledWrapper = styled('div')(({ theme }) => ({
    width: '100%',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.paper,
}))

export default App
