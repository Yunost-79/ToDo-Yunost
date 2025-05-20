import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Component } from 'react'
import { COLORS } from '../../../../globalVariables/styledVariables'

type ContextEditProps = {
    id: number
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSaveEdit: () => void
    handleCloseEdit: () => void
}

class ContextEdit extends Component<ContextEditProps> {
    render() {
        const { value, onChange, handleSaveEdit, handleCloseEdit } = this.props
        return (
            <StyledContextEdit>
                <EditInput type="text" placeholder={value} value={value} onChange={onChange} />
                <EditSaveButton onClick={handleSaveEdit}>Save</EditSaveButton>
                <EditCloseButton onClick={handleCloseEdit}>Close</EditCloseButton>
            </StyledContextEdit>
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
    border: none;

    &:hover {
        opacity: 1;
    }
`

const StyledContextEdit = styled.div`
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

export default ContextEdit
