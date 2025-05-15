import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Component } from 'react'
import { ReactComponent as CheckImg } from '../../../assets/check.svg'
import { COLORS } from '../../../globalVariables/styledVariables'

type TodoContextProps = {
    isEdit: boolean
}

class TodoContext extends Component<TodoContextProps> {
    render() {
        const { isEdit } = this.props
        return (
            <StyledTodoContext>
                <RadioButton>
                    <CheckImg />
                </RadioButton>
                {!isEdit ? (
                    <ContextTitle>Todo title</ContextTitle>
                ) : (
                    <ContextEdit>
                        <EditInput placeholder="Todo title" />
                        <EditSaveButton>Save</EditSaveButton>
                        <EditCloseButton>Close</EditCloseButton>
                    </ContextEdit>
                )}
            </StyledTodoContext>
        )
    }
}

const CssCommonButton = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    padding: 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    opacity: 0.75;
    gap: 6px;
    transition: 0.2s;

    &:hover {
        cursor: pointer;
        opacity: 1;
    }
`

const CssEditButton = css`
    background-color: transparent;
    opacity: 0.75;
    padding: 5px;
    border-radius: 5px;
    transition: 0.2s;
    cursor: pointer;
    // border: solid 1px ${COLORS.HARD_GREY};
    border: none;

    &:hover {
        opacity: 1;
    }
`

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
`

const ContextTitle = styled.span`
    font-size: 18px;
    word-break: break-all;
    color: ${COLORS.HARD_GREY};
    transition: 0.2s;

    &:hover {
        color: ${COLORS.BLACK};
    }
`

const ContextEdit = styled.div`
    ${CssCommonButton}
`
const EditInput = styled.input`
    width: 100%;
    font-size: 18px;
    background-color: transparent;
    border: solid 1px ${COLORS.LIGHT_ORANGE};
    border-radius: 5px;
    padding: 2px 10px 2px 10px;
    outline: none;

    &:hover {
        border: solid 1px ${COLORS.HARD_ORANGE};
    }

    &:focus {
        border: solid 1px ${COLORS.HARD_ORANGE};
        outline: none;
    }
`

const EditSaveButton = styled.button`
    ${CssEditButton}
    &:hover {
        background-color: ${COLORS.LIGHT_GREEN};
        color: ${COLORS.BLACK};
    }
`
const EditCloseButton = styled.button`
    ${CssEditButton}

    &:hover {
        background-color: ${COLORS.LIGHT_ALARM_RED};
        color: ${COLORS.BLACK};
    }
`

export default TodoContext
