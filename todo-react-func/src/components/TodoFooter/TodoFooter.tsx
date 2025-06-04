import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../../globalVariables/styledVariables'
import { removeTodoRequest } from '../../redux/actions/todoActions'
import { RootState } from '../../redux/store'
import Button from '../UI/Buttons/Button'
import Filters from './Filters/Filters'
import FooterRemoveAllModal from './FooterRemoveAllModal/FooterRemoveAllModal'
import TodoCounter from './TodoCounter/TodoCounter'

const TodoFooter = () => {
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
        <StyledTodoFooter>
            <TodoCounter />
            <Filters />

            <Button
                customStyles={StyledRemoveButton}
                disabled={todos?.length <= 0}
                onClick={() => handleOpenModal()}
                title="Empty todo list"
            >
                Remove all todos
            </Button>

            <FooterRemoveAllModal
                isOpenModal={isOpenModal}
                handleRemoveAllTodos={handleRemoveAllTodos}
                handleCloseModal={handleCloseModal}
            />
        </StyledTodoFooter>
    )
}

const StyledTodoFooter = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
const StyledRemoveButton = css`
    opacity: 0.75;
    background-color: ${COLORS.LIGHT_GREY};
    color: ${COLORS.HARD_GREY};
    padding: 7px;
    font-size: 14px;
    border-radius: 5px;
    border: none;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        opacity: 0.95;
        background-color: ${COLORS.LIGHT_ALARM_RED};
        color: ${COLORS.HARD_ALARM_RED};
    }

    &:disabled,
    &[disabled] {
        background-color: ${COLORS.MAIN_GREY};
        color: ${COLORS.HARD_GREY};

        &:hover {
            opacity: 0.75;
        }
    }
`

export default TodoFooter
