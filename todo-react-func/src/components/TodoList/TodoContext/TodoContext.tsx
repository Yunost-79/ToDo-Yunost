import styled from '@emotion/styled'
import { ReactComponent as CheckImg } from '../../../assets/check.svg'
import { COLORS } from '../../../globalVariables/styledVariables'
import { FilterStatus } from '../../../globalVariables/typesVariables'

type TodoContextProps = {
    isEdit: boolean
    value: string
    status: FilterStatus
    id: number
    toggleTodoStatus: (id: number) => void
    handleTodoEdit: () => void
    editTodoContext: (id: number, value: string) => void
    closeAllTodoEdit: () => void
}

type TodoContextState = {
    inputValue: string
}

const TodoContext = () => {
    // state = {
    //     inputValue: this.props.value,
    // }

    // handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value
    //     this.setState({ inputValue: value })
    // }

    // handleSaveEdit = (id: number, inputValue: string) => {
    //     const { value, editTodoContext } = this.props

    //     if (inputValue.trim() === '') return editTodoContext(id, value)

    //     editTodoContext(id, inputValue)
    //     this.setState({ inputValue })
    // }

    // const { isEdit, value, status, id, toggleTodoStatus, handleTodoEdit, closeAllTodoEdit } =
    //     this.props
    // const { inputValue } = this.state

    return (
        <StyledTodoContext>
            <RadioButton
            // className={status === FILTER_STATUS.completed ? 'completed' : ''}
            // onClick={() => toggleTodoStatus(id)}
            >
                <CheckImg />
            </RadioButton>
            {/* {!isEdit ? ( */}
            <ContextTitle
            // onDoubleClick={handleTodoEdit}
            // title="Double click to edit todo"
            // className={status === FILTER_STATUS.completed ? 'completed' : ''}
            >
                {/* {value} */}
                "TEST VALUE"
            </ContextTitle>
            {/* ) : (
                <ContextEdit
                    id={id}
                    value={inputValue}
                    onChange={this.handleChange}
                    handleSaveEdit={() => this.handleSaveEdit(id, inputValue)}
                    handleCloseEdit={() => closeAllTodoEdit()}
                />
            )} */}
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
const RadioButton = styled.button`
    position: relative;
    background-color: transparent;
    border: solid 1px ${COLORS.LIGHT_ORANGE};
    border-radius: 5px;
    width: 22px;
    height: 22px;
    cursor: pointer;

    &:hover {
        border: solid 1px ${COLORS.HARD_ORANGE};

        svg {
            opacity: 0.75;
        }
    }

    svg {
        position: absolute;
        top: -1px;
        left: 0px;
        width: 20px;
        height: 20px;
        opacity: 0;
        transition: 0.2s;
    }

    &.completed {
        svg {
            opacity: 0.75;
        }

        &:hover {
            svg {
                opacity: 1;
            }
        }
    }
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
