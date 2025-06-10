import { styled } from '@mui/material'
import AuthFooter from '../components/AuthFooter/AuthFooter'
import SignUpForm from '../components/AuthForms/SignUpForm'
import AuthHeader from '../components/AuthHeader/AuthHeader'
import ChangeModeButton from '../components/UI/Buttons/ChangeModeButton'
import { PATHS } from '../globalVariables/pathsVariables'

const SignUpPage = () => {
    return (
        <>
            <ChangeModeButton />
            <StyledContainer>
                <StyledTodoContainer>
                    <AuthHeader title="Sign Up" />
                    <SignUpForm />
                    <AuthFooter to={PATHS.SIGN_IN} />
                </StyledTodoContainer>
            </StyledContainer>
        </>
    )
}

const StyledContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',

    '@media (max-width: 1025px)': {
        width: '80%',
    },
}))

const StyledTodoContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    padding: '24px',
    borderRadius: '8px',
    gap: '25px',
}))

export default SignUpPage
