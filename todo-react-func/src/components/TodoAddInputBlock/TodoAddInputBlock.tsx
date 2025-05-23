import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../../globalVariables/styledVariables'
import { TodoState, Warning } from '../../globalVariables/typesVariables'
import { horizontalShake } from '../../helpers/animations'
import { asyncAddTodo } from '../../redux/actions/todoActions'
import { RootState } from '../../redux/store'
import Button from '../UI/Buttons/Button'
import Input from '../UI/Inputs/Input'

const TodoAddInputBlock = () => {
    const dispatch = useDispatch()
    const todoState: TodoState = useSelector((state: RootState) => state.todos)

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

        // dispatch(addTodo(value))
        dispatch(asyncAddTodo(value))
        setWarning({ isWarning: false, warningText: '' })
        setAddInputValue('')
    }

    useEffect(() => {
        setWarning({ isWarning: false, warningText: '' })
    }, [todoState.filter, todoState.todos])

    return (
        <StyledTodoAddInputBlock>
            <Input
                customStyles={StyledAddInput}
                type="text"
                value={addInputValue}
                onChange={handleChangeInput}
                className={warning?.isWarning ? 'warning' : ''}
                placeholder={warning?.isWarning ? warning.warningText : 'Enter your todo'}
            />

            <Button customStyles={StyledAddButton} onClick={() => handleAddTodo(addInputValue)}>
                Add
            </Button>
        </StyledTodoAddInputBlock>
    )
}

const StyledTodoAddInputBlock = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

const StyledAddInputBlock = css`
    border-radius: 5px;
    font-size: 20px;
    white-space: nowrap;
`

const StyledAddButton = css`
    ${StyledAddInputBlock}
    background-color: ${COLORS.LIGHT_ORANGE};
    padding: 7px;
    cursor: pointer;
    transition: 0.2s;
    border: none;

    &:hover {
        background-color: ${COLORS.HARD_ORANGE};
    }
`

const StyledAddInput = css`
    ${StyledAddInputBlock}
    border: solid 2px ${COLORS.MAIN_GREY};
    width: 100%;
    padding: 5px;
    transition: 0.25s;
    outline: none;

    &:hover {
        border-color: ${COLORS.HARD_GREY};

        &::placeholder {
            color: ${COLORS.BLACK};
        }
    }

    &:focus {
        border: solid 2px ${COLORS.HARD_GREY};
    }

    &::placeholder {
        color: ${COLORS.HARD_GREY};
        transition: 0.25s;
    }

    &.warning {
        border: solid 2px ${COLORS.MEDIUM_ALARM_RED};
        animation: ${horizontalShake} 0.25s ease-in-out;

        &::placeholder {
            color: ${COLORS.MEDIUM_ALARM_RED};
        }

        &:hover {
            border-color: ${COLORS.HARD_ALARM_RED};

            &::placeholder {
                color: ${COLORS.HARD_GREY};
            }
        }

        &:focus {
            border: solid 2px ${COLORS.HARD_ALARM_RED};
        }
    }
`

export default TodoAddInputBlock
