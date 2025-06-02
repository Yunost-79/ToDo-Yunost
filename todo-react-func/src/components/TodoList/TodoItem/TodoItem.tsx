import styled from '@emotion/styled'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { Todo } from '../../../globalVariables/typesVariables'
import { changeStatus, changeTodoIsEdit, removeTodo } from '../../../redux/actions/todoActions'
import DragIcon from '../../UI/Icons/DragIcon'
import TodoContext from '../TodoContext/TodoContext'
import TodoControl from '../TodoControl/TodoControl'

type TodoItemProps = {
    todo: Todo
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
    const dispatch = useDispatch()

    const handleRemoveTodo = (taskId: number) => {
        dispatch(removeTodo(taskId))
    }

    const handleTodoStatus = (taskId: number) => {
        const newStatus =
            todo.status === FILTER_STATUS.active ? FILTER_STATUS.completed : FILTER_STATUS.active

        dispatch(changeStatus(taskId, newStatus))
    }

    const handleTodoIsEdit = (taskId: number) => {
        dispatch(changeTodoIsEdit(taskId))
    }

    return (
        <StyledLi className={todo.status === FILTER_STATUS.completed ? 'completed' : ''}>
            <TodoContext
                todo={todo}
                toggleTodoStatus={() => handleTodoStatus(todo.taskId)}
                handleTodoIsEdit={() => handleTodoIsEdit(todo.taskId)}
            />
            <DragHandle className="drag-handle">
                <DragIcon color={COLORS.BLACK} />
            </DragHandle>
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
    width: 100%;
    list-style-type: none;
    padding: 5px;
    border-radius: 5px;
    transition: 0.2s;

    &.completed {
        background-color: ${COLORS.LIGHT_GREY};
    }
`

const DragHandle = styled.span`
    cursor: grab;
    user-select: none;
    opacity: 0.75;
    transition: 0.2s;

    &:hover {
        opacity: 1;
    }

    &:active {
        cursor: grabbing;
        opacity: 1;
    }
`

export default TodoItem
