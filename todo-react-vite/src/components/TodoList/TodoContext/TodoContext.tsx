import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { styled, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FILTER_STATUS } from '../../../globalVariables/todoVariables'
import { Todo } from '../../../globalVariables/typesVariables'
import { closeAllTodosIsEdit, updateTodoRequest } from '../../../redux/actions/todoActions'
import TodoButton from '../../UI/Buttons/TodoButton'
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
            dispatch(closeAllTodosIsEdit())
            return
        }

        dispatch(updateTodoRequest(taskId, { value }))
    }

    const handleCloseEdit = () => {
        dispatch(closeAllTodosIsEdit())
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEditInputValue(value)
    }

    return (
        <StyledTodoContext>
            <StyledRadioButton
                className={todo.status === FILTER_STATUS.completed ? 'completed' : ''}
                onClick={() => toggleTodoStatus()}
            >
                <CheckOutlinedIcon />
            </StyledRadioButton>
            {!todo.isEdit ? (
                <StyledContextTitle
                    onDoubleClick={handleTodoIsEdit}
                    title="Double click to edit todo"
                    className={todo.status === FILTER_STATUS.completed ? 'completed' : ''}
                >
                    {todo.value}
                </StyledContextTitle>
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

const StyledTodoContext = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '12px',
})

const StyledRadioButton = styled(TodoButton)(({ theme }) => ({
    border: `1px solid ${theme.palette.btn.auth}`,
    borderRadius: '6px',

    '& svg': {
        margin: '1px',
        color: theme.palette.btn.helper,
        height: '23px',
        width: '23px',
        opacity: 0,
        transition: '0.1s',
    },

    '&:hover': {
        '& svg': {
            opacity: 0.75,
        },
    },

    '&.completed': {
        '& svg': {
            opacity: 1,
            color: theme.palette.btn.auth,
        },
    },
}))

const StyledContextTitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    wordBreak: 'break-all',
    color: theme.palette.text.primary,
}))

// const StyledTodoContext = styled.div`
//     width: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
//     gap: 12px;
// `

// const ContextTitle = styled.span`
//     font-size: 18px;
//     word-break: break-all;
//     color: ${COLORS.HARD_GREY};
//     transition: 0.2s;

//     &:hover {
//         color: ${COLORS.BLACK};
//     }

//     &.completed {
//         text-decoration: line-through;
//     }
// `

export default TodoContext
