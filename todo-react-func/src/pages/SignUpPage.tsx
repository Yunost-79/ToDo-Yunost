import styled from '@emotion/styled'
import AuthFooter from '../components/AuthFooter/AuthFooter'
import AuthHeader from '../components/AuthHeader/AuthHeader'
import Button from '../components/UI/Buttons/Button'
import Input from '../components/UI/Inputs/Input'
import { PATHS } from '../globalVariables/pathsVariables'
import { COLORS } from '../globalVariables/styledVariables'

const SignUpPage = () => {
    return (
        <StyledContainer>
            <StyledTodoContainer>
                <AuthHeader title="Sign Up" />
                <Form>
                    <Input placeholder="Login" />
                    <Input placeholder="Enter your password" />
                    <Input placeholder="Enter your password again" />
                    <Button>Sign up</Button>
                </Form>
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
    
`

export default SignUpPage
