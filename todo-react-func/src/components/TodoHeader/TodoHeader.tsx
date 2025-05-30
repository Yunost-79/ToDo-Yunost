import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const TodoHeader = () => {
    const { avatar } = useSelector((state: RootState) => state.user)

    return (
        <StyledTodoHeader>
            <H1>TODO LIST</H1>
            <UserData>
                {/* <UserName>{username}</UserName> */}
                <UserAvatar src={avatar ? avatar : ''} />
            </UserData>
        </StyledTodoHeader>
    )
}

const StyledTodoHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`

const H1 = styled.h1`
    width: 100%;
    text-align: center;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 700;
`

const UserData = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

// const UserName = styled.span`
//     font-size: 18px;
// `

const UserAvatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`

export default TodoHeader
