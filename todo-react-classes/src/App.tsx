import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import { Component } from 'react'
import { COLORS } from './globalVariables/styledVariables'
import TodoPage from './pages/TodoPage'

// injectGlobal`
//     body{
//         background-color: ${COLORS.MAIN_GREY};
//         font-family: 'Helvetica', Sans-Serif;
//     }
// `

class App extends Component {
    render() {
        return (
            <>
                <Global styles={globalStyles} />
                <StyledWrapper>
                    <TodoPage />
                </StyledWrapper>
            </>
        )
    }
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
