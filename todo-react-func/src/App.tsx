import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { PATHS } from './globalVariables/pathsVariables'
import { COLORS } from './globalVariables/styledVariables'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import TodoPage from './pages/TodoPage'
import PrivateRoutes from './utils/PrivateRoute'
import PublicRoutes from './utils/PublicRoute'

const App = () => {
    return (
        <>
            <Global styles={globalStyles} />
            <StyledWrapper>
                <Router>
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
        </>
    )
}

const globalStyles = css`
    body {
        background-color: ${COLORS.MAIN_GREY};
        font-family: 'Helvetica', Sans-Serif;
        margin: 0;
        padding: 0;
        overflow: auto;
    }
`

const StyledWrapper = styled.div`
    width: 100%;
`

export default App
