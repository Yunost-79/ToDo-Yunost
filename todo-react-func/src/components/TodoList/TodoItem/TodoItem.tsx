import styled from '@emotion/styled'
import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { Todo } from '../../../globalVariables/typesVariables'
import { changeStatus, changeTodoIsEdit, removeTodo } from '../../../redux/actions/todoActions'
import { RootState } from '../../../redux/store'
import TodoContext from '../TodoContext/TodoContext'
import TodoControl from '../TodoControl/TodoControl'

type TodoItemProps = {
    todo: Todo
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
    const dispatch = useDispatch()
    const { todos } = useSelector((state: RootState) => state.todos)

    const handleRemoveTodo = (taskId: number) => {
        dispatch(removeTodo(taskId))
        // dispatch(removeTodo(taskId))
        // dispatch(asyncRemoveTodo(taskId))
    }

    const handleTodoStatus = (taskId: number) => {
        console.log('todos', todos)

        if (todo.status === FILTER_STATUS.active) {
            dispatch(changeStatus(taskId, 'completed'))
        } else if (todo.status === FILTER_STATUS.completed) {
            dispatch(changeStatus(taskId, 'active'))
        }

        // dispatch(changeTodoStatus(taskId))
    }

    const handleTodoIsEdit = (taskId: number) => {
        dispatch(changeTodoIsEdit(taskId))

        console.log('todos', todos)
    }

    return (
        <StyledLi className={todo.status === FILTER_STATUS.completed ? 'completed' : ''}>
            <TodoContext
                todo={todo}
                toggleTodoStatus={() => handleTodoStatus(todo.taskId)}
                handleTodoIsEdit={() => handleTodoIsEdit(todo.taskId)}
            />
            <TodoControl
                handleTodoIsEdit={() => handleTodoIsEdit(todo.taskId)}
                removeTodo={() => handleRemoveTodo(todo.taskId)}
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
