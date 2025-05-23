import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FC, InputHTMLAttributes } from 'react'
import { COLORS } from '../../../../globalVariables/styledVariables'
import { horizontalShake } from '../../../../helpers/animations'
import Input from '../Input'

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean
    helperText?: string | false
}

const AuthInput: FC<AuthInputProps> = ({ error, helperText, ...props }) => {
    return (
        <StyledAuthInputBlock>
            <Input className={error ? 'warning' : ''} customStyles={StyledAuthInput} {...props} />
            {error && helperText && <WarningSpan>{helperText}</WarningSpan>}
        </StyledAuthInputBlock>
    )
}

const StyledAuthInputBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const StyledAuthInput = css`
    width: 100%;
    padding: 5px;
    outline: none;
    border-radius: 5px;
    font-size: 20px;
    white-space: nowrap;
    border: solid 2px ${COLORS.HARD_GREY};
    transition: 0.25s;

    &:hover {
        border-color: ${COLORS.BLACK};

        &::placeholder {
            color: ${COLORS.BLACK};
        }
    }

    &:focus {
        border-color: ${COLORS.HARD_ORANGE};
    }

    &::placeholder {
        color: ${COLORS.HARD_GREY};
        transition: 0.2s;
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

const WarningSpan = styled.span`
    font-size: 12px;
    color: ${COLORS.HARD_ALARM_RED};
`

export default AuthInput
