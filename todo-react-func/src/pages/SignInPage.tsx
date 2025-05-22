import styled from '@emotion/styled'
import AuthFooter from '../components/AuthFooter/AuthFooter'
import AuthHeader from '../components/AuthHeader/AuthHeader'
import Button from '../components/UI/Buttons/Button'
import Input from '../components/UI/Inputs/Input'
import { PATHS } from '../globalVariables/pathsVariables'
import { COLORS } from '../globalVariables/styledVariables'

const SignInPage = () => {
    return (
        <StyledContainer>
            <StyledTodoContainer>
                <AuthHeader title="Sign In" />
                <Form>
                    <Input placeholder="Login" />
                    <Input placeholder="Password" />
                    <Button>Sign in</Button>
                </Form>

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
    gap: 18px;
    background-color: ${COLORS.WHITE};
    width: 100%;
    padding: 24px;
    border-radius: 8px;

    @media (max-width: 1025px) {
        width: 80%;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 9px;

    width: 100%;
    min-width: 500px;
`

export default SignInPage
