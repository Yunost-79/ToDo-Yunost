import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Warning } from '../../globalVariables/typesVariables'
import { addTodo } from '../../redux/actions/todoActions'
import AddTodoButton from '../UI/Buttons/AddTodoButton'
import AddTodoInput from '../UI/Inputs/AddTodoInput'

const TodoAddInputBlock = () => {
    const dispatch = useDispatch()

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

        dispatch(addTodo(value))
        setWarning({ isWarning: false, warningText: '' })
        setAddInputValue('')
    }

    return (
        <StyledTodoAddInputBlock>
            <AddTodoInput
                customStyles={CssInputItem}
                type="text"
                value={addInputValue}
                onChange={handleChangeInput}
                warning={warning}
                placeholder={warning?.isWarning ? warning.warningText : 'Enter your todo'}
            />
            <AddTodoButton customStyles={CssInputItem} onClick={() => handleAddTodo(addInputValue)}>
                Add
            </AddTodoButton>
        </StyledTodoAddInputBlock>
    )
}

const CssInputItem = css`
    border-radius: 5px;
    font-size: 20px;
    white-space: nowrap;
`

const StyledTodoAddInputBlock = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
`

export default TodoAddInputBlock
