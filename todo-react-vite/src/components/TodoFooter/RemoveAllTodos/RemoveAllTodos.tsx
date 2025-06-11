import { styled } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodoRequest } from '../../../redux/actions/todoActions'
import { RootState } from '../../../redux/store'
import TodoButton from '../../UI/Buttons/TodoButton'
import FooterRemoveAllModal from '../FooterRemoveAllModal/FooterRemoveAllModal'

const RemoveAllTodos = ({}) => {
    const { todos } = useSelector((state: RootState) => state.todos)
    const dispatch = useDispatch()

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const handleRemoveAllTodos = () => {
        dispatch(removeTodoRequest('all'))

        setIsOpenModal(false)
    }

    const handleOpenModal = () => {
        setIsOpenModal(true)
    }

    const handleCloseModal = () => {
        setIsOpenModal(false)
    }
    return (
        <>
            <StyledRemoveButton disabled={todos.length <= 0} onClick={handleOpenModal}>
                Remove all todos
            </StyledRemoveButton>

            <FooterRemoveAllModal
                isOpenModal={isOpenModal}
                handleRemoveAllTodos={handleRemoveAllTodos}
                handleCloseModal={handleCloseModal}
            />
        </>
    )
}

const StyledRemoveButton = styled(TodoButton)(({ theme }) => ({
    backgroundColor: theme.palette.btn.auth,
    color: theme.palette.text.primary,
    padding: '5px 10px',
    borderRadius: '5px',

    '&:hover': {
        backgroundColor: theme.palette.btn.authSupport,
    },

    '&:disabled, &[disable]': {
        backgroundColor: theme.palette.btn.support,
    },
}))

export default RemoveAllTodos
