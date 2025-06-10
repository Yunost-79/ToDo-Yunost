import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FC } from 'react'
import { COLORS } from '../../../../globalVariables/styledVariables'
import Button from '../../../UI/Buttons/Button'
import Input from '../../../UI/Inputs/Input'

type ContextEditProps = {
    value: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSaveEdit?: () => void
    handleCloseEdit?: () => void
}

const ContextEdit: FC<ContextEditProps> = ({
    value,
    onChange,
    handleSaveEdit,
    handleCloseEdit,
}) => {
    return (
        <StyledContextEdit>
            <Input
                customStyles={StyledEditInput}
                type="text"
                placeholder={value}
                value={value}
                onChange={onChange}
            />

            <Button customStyles={StyledSaveButton} onClick={handleSaveEdit}>
                Save
            </Button>
            <Button customStyles={StyledCloseButton} onClick={handleCloseEdit}>
                Close
            </Button>
        </StyledContextEdit>
    )
}

const StyledContextEdit = styled.div`
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

const StyledEditInput = css`
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
        color: ${COLORS.BLACK};
    }
`

const StyledSaveButton = css`
    ${CssEditButton}

    &:hover {
        background-color: ${COLORS.LIGHT_GREEN};
    }
`
const StyledCloseButton = css`
    ${CssEditButton}

    &:hover {
        background-color: ${COLORS.LIGHT_ALARM_RED};
    }
`

export default ContextEdit
