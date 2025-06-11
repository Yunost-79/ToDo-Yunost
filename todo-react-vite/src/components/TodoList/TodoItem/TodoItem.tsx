import { styled } from '@mui/material'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { Todo } from '../../../globalVariables/typesVariables'
import {
    changeTodoIsEdit,
    removeTodoRequest,
    updateTodoRequest,
} from '../../../redux/actions/todoActions'
import DragIcon from '../../UI/Icons/DragIcon'
import TodoContext from '../TodoContext/TodoContext'
import TodoControl from '../TodoControl/TodoControl'

type TodoItemProps = {
    todo: Todo
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
    const dispatch = useDispatch()

    const handleRemoveTodo = (taskId: number) => {
        dispatch(removeTodoRequest(taskId))
    }

    const handleTodoStatus = (taskId: number) => {
        const newStatus =
            todo.status === FILTER_STATUS.active ? FILTER_STATUS.completed : FILTER_STATUS.active

        dispatch(updateTodoRequest(taskId, { status: newStatus }))
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

const StyledLi = styled('li')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    width: '100%',
    listStyleType: 'none',
    padding: '5px',
    borderRadius: '5px',
    transition: '0.1 ease',

    '&.completed': {
        transition: '0.1 ease',

        backgroundColor: theme.palette.text.main,
    },
}))

const DragHandle = styled('span')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'grab',
    userSelect: 'none',
    opacity: 0.75,

    '&:hover': {
        opacity: 1,
    },

    '&:active': {
        cursor: 'grabbing',
        opacity: 1,
    },
})

export default TodoItem
