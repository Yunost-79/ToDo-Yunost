import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import { COLORS } from './globalVariables/styledVariables'
import TodoPage from './pages/TodoPage'

const App = () => {
    return (
        <>
            <Global styles={globalStyles} />
            <StyledWrapper>
                <TodoPage />
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
    }
`

const StyledWrapper = styled.div`
    width: 100%;
`

export default App
