import styled from '@emotion/styled'
import AuthFooter from '../components/AuthFooter/AuthFooter'
import SignUpForm from '../components/AuthForms/SignUpForm'
import AuthHeader from '../components/AuthHeader/AuthHeader'
import { PATHS } from '../globalVariables/pathsVariables'
import { COLORS } from '../globalVariables/styledVariables'

const SignUpPage = () => {
    return (
        <StyledContainer>
            <StyledTodoContainer>
                <AuthHeader title="Sign Up" />
                <SignUpForm />
                <AuthFooter to={PATHS.SIGN_IN} />
            </StyledTodoContainer>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const StyledTodoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${COLORS.WHITE};
    width: 100%;
    padding: 24px;
    border-radius: 8px;
    gap: 25px;

    @media (max-width: 1025px) {
        width: 80%;
    }
`

export default SignUpPage
