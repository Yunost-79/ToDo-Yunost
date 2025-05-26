import styled from '@emotion/styled'
import AuthFooter from '../components/AuthFooter/AuthFooter'
import SignInForm from '../components/AuthForms/SignInForm'
import AuthHeader from '../components/AuthHeader/AuthHeader'
import { PATHS } from '../globalVariables/pathsVariables'
import { COLORS } from '../globalVariables/styledVariables'

const SignInPage = () => {
    return (
        <StyledContainer>
            <StyledTodoContainer>
                <AuthHeader title="Sign In" />
                <SignInForm />
                <AuthFooter to={PATHS.SIGN_UP} />
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

export default SignInPage
