import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../globalVariables/pathsVariables'
import { COLORS } from '../../globalVariables/styledVariables'
import { signOutRequest } from '../../redux/actions/authActions'
import Button from '../UI/Buttons/Button'
import TodoSignOutModal from './TodoSignOutModal/TodoSignOutModal'

const TodoSignOut = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = () => {
        try {
            dispatch(signOutRequest())
            navigate(PATHS.SIGN_IN)
        } catch (e) {
            const err = e as Error
            console.error('Error in logout:', err)
        }
    }

    const handleOpenModal = () => {
        setIsOpenModal(true)
    }

    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

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
    top: 25px;
    right: 25px;
`
const StyledSignOutButton = css`
    background-color: ${COLORS.LIGHT_ORANGE};
    border: none;
    font-size: 20px;
    padding: 7px;
`

export default TodoSignOut
