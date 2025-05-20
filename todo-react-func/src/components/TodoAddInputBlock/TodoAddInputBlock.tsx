import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, setWarning } from '../../redux/actions/todoActions'
import { RootState } from '../../redux/store'
import AddButton from '../UI/Buttons/AddButton'
import AddInput from '../UI/Inputs/AddInput'

const TodoAddInputBlock = () => {
    const warning = useSelector((state: RootState) => state.todos?.warning)
    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState<string>('')

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value
        setInputValue(value)
    }

    const handleAddTodo = (value: string) => {
        if (value.trim() === '') {
            const warningText = 'Input cannot be empty'
            dispatch(setWarning(warningText))
            setInputValue('')
            return
        }

        dispatch(addTodo(value))
        setInputValue('')
    }

    return (
        <StyledTodoAddInputBlock>
            <AddInput
                customStyles={CssInputItem}
                type="text"
                value={inputValue}
                onChange={handleChangeInput}
                warning={warning}
                placeholder={warning.isWarning ? warning.text : 'Enter your todo'}
            />
            <AddButton customStyles={CssInputItem} onClick={() => handleAddTodo(inputValue)}>
                Add
            </AddButton>
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
