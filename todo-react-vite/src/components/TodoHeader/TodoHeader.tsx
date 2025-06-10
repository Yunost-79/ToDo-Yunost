import { styled, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDataRequest } from '../../redux/actions/userActions'
import { RootState } from '../../redux/store'

const TodoHeader = () => {
    const { avatar, username } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserDataRequest())
    }, [dispatch])

    return (
        <StyledTodoHeader>
            <StyledTypography>TODO LIST</StyledTypography>
            {avatar && (
                <UserData>
                    <UserName>{username}</UserName>
                    <UserAvatar src={avatar} />
                </UserData>
            )}
        </StyledTodoHeader>
    )
}

const StyledTodoHeader = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
})

const StyledTypography = styled(Typography)({
    width: '100%',
    textAlign: 'center',
    fontSize: '24px',
    textTransform: 'uppercase',
    fontWeight: 700,
})

const UserData = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
})

const UserName = styled('span')({
    fontSize: '18px',
    whiteSpace: 'nowrap',
})

const UserAvatar = styled('img')({
    width: '30px',
    height: '30px',
    borderRadius: '50%',
})

export default TodoHeader
