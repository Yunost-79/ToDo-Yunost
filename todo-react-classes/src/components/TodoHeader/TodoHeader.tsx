import styled from '@emotion/styled'
import { Component } from 'react'

class TodoHeader extends Component {
    render() {
        return <H1>TODO LIST</H1>
    }
}

const H1 = styled.h1`
    text-align: center;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 700;
`

export default TodoHeader
