import styled from '@emotion/styled'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { Todo } from '../../../globalVariables/typesVariables'
import ChangeStatusRadioButton from '../../UI/RadioButtons/ChangeStatusRadioButton'
import ContextEdit from './ContextEdit/ContextEdit'

type TodoContextProps = {
    todo: Todo
    toggleTodoStatus: () => void
    handleTodoIsEdit: () => void
}

const TodoContext: FC<TodoContextProps> = ({ todo, toggleTodoStatus, handleTodoIsEdit }) => {
    const dispatch = useDispatch()

    const [editInputValue, setEditInputValue] = useState<string>(todo.value)

    const handleSaveEdit = (taskId: number, value: string) => {
        if (value.trim() === '') {
            setEditInputValue(todo.value)
            // dispatch(closeAllTodosIsEdit())
            return
        }

        // dispatch(editTodo(taskId, value))
    }

    const handleCloseEdit = () => {
        // dispatch(closeAllTodosIsEdit())
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEditInputValue(value)
    }

    return (
        <StyledTodoContext>
            <ChangeStatusRadioButton
                className={todo.status === FILTER_STATUS.completed ? 'completed' : ''}
                onClick={toggleTodoStatus}
            />
            {!todo.isEdit ? (
                <ContextTitle
                    onDoubleClick={handleTodoIsEdit}
                    title="Double click to edit todo"
                    className={todo.status === FILTER_STATUS.completed ? 'completed' : ''}
                >
                    {todo.value}
                </ContextTitle>
            ) : (
                <ContextEdit
                    value={editInputValue}
                    onChange={(e) => handleChange(e)}
                    handleSaveEdit={() => handleSaveEdit(todo.taskId, editInputValue)}
                    handleCloseEdit={() => handleCloseEdit()}
                />
            )}
        </StyledTodoContext>
    )
}

const StyledTodoContext = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
`

const ContextTitle = styled.span`
    font-size: 18px;
    word-break: break-all;
    color: ${COLORS.HARD_GREY};
    transition: 0.2s;

    &:hover {
        color: ${COLORS.BLACK};
    }

    &.completed {
        text-decoration: line-through;
    }
`

export default TodoContext
