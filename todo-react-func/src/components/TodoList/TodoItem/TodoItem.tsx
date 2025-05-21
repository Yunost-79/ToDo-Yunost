import styled from '@emotion/styled'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { Todo } from '../../../globalVariables/typesVariables'
import {
    asyncRemoveTodo,
    changeTodoIsEdit,
    changeTodoStatus,
} from '../../../redux/actions/todoActions'
import TodoContext from '../TodoContext/TodoContext'
import TodoControl from '../TodoControl/TodoControl'

type TodoItemProps = {
    todo: Todo
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
    const dispatch = useDispatch()

    const handleRemoveTodo = (id: number) => {
        // dispatch(removeTodo(id))
        dispatch(asyncRemoveTodo(id))
    }

    const handleTodoStatus = (id: number) => {
        dispatch(changeTodoStatus(id))
    }

    const handleTodoIsEdit = (id: number) => {
        dispatch(changeTodoIsEdit(id))
    }

    return (
        <StyledLi className={todo.status === FILTER_STATUS.completed ? 'completed' : ''}>
            <TodoContext
                todo={todo}
                toggleTodoStatus={() => handleTodoStatus(todo.id)}
                handleTodoIsEdit={() => handleTodoIsEdit(todo.id)}
            />
            <TodoControl
                handleTodoIsEdit={() => handleTodoIsEdit(todo.id)}
                removeTodo={() => handleRemoveTodo(todo.id)}
            />
        </StyledLi>
    )
}

const StyledLi = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    list-style-type: none;
    padding: 5px;
    border-radius: 5px;
    transition: 0.2s;

    &.completed {
        background-color: ${COLORS.LIGHT_GREY};
    }
`

export default TodoItem
