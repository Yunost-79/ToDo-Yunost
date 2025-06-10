import { styled, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Warning } from '../../globalVariables/typesVariables'
import { horizontalShake } from '../../helpers/animations'
import { addTodoRequest } from '../../redux/actions/todoActions'
import { RootState } from '../../redux/store'
import AddTodoButton from '../UI/Buttons/AddTodoButton'

const TodoAddInputBlock = () => {
    const dispatch = useDispatch()
    const { todos, filter } = useSelector((state: RootState) => state.todos)

    const [addInputValue, setAddInputValue] = useState<string>('')
    const [warning, setWarning] = useState<Warning>({ isWarning: false, warningText: '' })

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value
        setAddInputValue(value)
    }

    const handleAddTodo = (value: string) => {
        if (value.trim() === '') {
            setWarning({ isWarning: true, warningText: 'Input cannot be empty' })
            setAddInputValue('')
            return
        }

        dispatch(addTodoRequest(value))
        setWarning({ isWarning: false, warningText: '' })
        setAddInputValue('')
    }

    useEffect(() => {
        setWarning({ isWarning: false, warningText: '' })
    }, [todos, filter])

    return (
        <StyledTodoAddInputBlock>
            <StyledAddTextField
                type="text"
                size="small"
                value={addInputValue}
                onChange={handleChangeInput}
                className={warning?.isWarning ? 'warning' : ''}
                label={warning?.isWarning ? warning.warningText : 'Enter your todo'}
                error={warning?.isWarning}
            />
            <AddTodoButton onClick={() => handleAddTodo(addInputValue)}></AddTodoButton>
        </StyledTodoAddInputBlock>
    )
}

const StyledTodoAddInputBlock = styled('div')({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
})

const StyledAddTextField = styled(TextField)({
    '&.warning': {
        animation: `${horizontalShake} 0.25s ease-in-out`,
    },
})

export default TodoAddInputBlock
