import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../globalVariables/pathsVariables'
import { COLORS } from '../../globalVariables/styledVariables'
import { signOutRequest } from '../../redux/actions/authActions'
import { RootState } from '../../redux/store'
import { getAccessToken } from '../../utils/cookies/cookies'
import Button from '../UI/Buttons/Button'
import TodoSignOutModal from './TodoSignOutModal/TodoSignOutModal'

const TodoSignOut = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const token = getAccessToken()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { isSignedIn, isSignedUp } = useSelector((state: RootState) => state.auth)

    const handleSignOut = useCallback(() => {
        try {
            dispatch(signOutRequest())
        } catch (e) {
            const err = e as Error
            console.error('Error in logout:', err)
        }
    }, [dispatch])

    const handleOpenModal = () => {
        setIsOpenModal(true)
    }

    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

    useEffect(() => {
        if (!token && !isSignedIn && !isSignedUp) {
            navigate(PATHS.SIGN_IN)
        }
    }, [token, handleSignOut, isSignedIn, isSignedUp, navigate])

    return (
        <StyledSignOutBlock>
            <Button customStyles={StyledSignOutButton} onClick={() => handleOpenModal()}>
                Logout
            </Button>
            <TodoSignOutModal
                isOpenModal={isOpenModal}
                handleCloseModal={handleCloseModal}
                handleSignOut={() => handleSignOut()}
            />
        </StyledSignOutBlock>
    )
}

const StyledSignOutBlock = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`
const StyledSignOutButton = css`
    background-color: ${COLORS.LIGHT_ORANGE};
    border: none;
    font-size: 20px;
    padding: 7px;
`

export default TodoSignOut
