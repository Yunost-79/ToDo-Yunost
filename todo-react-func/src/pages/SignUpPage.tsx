import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AuthFooter from '../components/AuthFooter/AuthFooter'
import AuthHeader from '../components/AuthHeader/AuthHeader'
import AuthButton from '../components/UI/Buttons/AuthButton/AuthButton'
import AuthInput from '../components/UI/Inputs/AuthInput/AuthInput'
import MainLoader from '../components/UI/Loaders/MainLoader'
import ErrorSpan from '../components/UI/Spans/ErrorSpan'
import { AUTH_VARS } from '../globalVariables/authVariables'
import { PATHS } from '../globalVariables/pathsVariables'
import { COLORS } from '../globalVariables/styledVariables'
import { SignUpUserData } from '../globalVariables/typesVariables'
import { removeAuthErrorAndLoading, signUpRequest } from '../redux/actions/authActions'
import { RootState } from '../redux/store'
import { signUpValidSchema } from '../utils/yup/yupSchemas'

const SignUpPage = () => {
    const dispatch = useDispatch()
    const { isLoading, error, token } = useSelector((state: RootState) => state.auth)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(removeAuthErrorAndLoading())
    }, [dispatch])

    useEffect(() => {
        if (token) {
            navigate(PATHS.MAIN)
        }
    }, [token])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            rePassword: '',
        },
        validationSchema: signUpValidSchema,
        onSubmit: (values) => {
            const signUpUserData: SignUpUserData = {
                username: values.username.trim(),
                password: values.password.trim(),
            }

            try {
                dispatch(signUpRequest(signUpUserData))
            } catch (e) {
                navigate(PATHS.SIGN_UP)

                const err = e as Error
                console.error('Error in sign in page', err)
            }

            console.log('token', token)
        },
    })

    return (
        <StyledContainer>
            <StyledTodoContainer>
                <AuthHeader title="Sign Up" />
                <Form onSubmit={formik.handleSubmit}>
                    <AuthInput
                        name={AUTH_VARS.username}
                        type="text"
                        placeholder="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <AuthInput
                        name={AUTH_VARS.password}
                        type="password"
                        placeholder="Enter your password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <AuthInput
                        name={AUTH_VARS.rePassword}
                        type="password"
                        placeholder="Enter your password again"
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
                        helperText={formik.touched.rePassword && formik.errors.rePassword}
                    />

                    {error && <ErrorSpan>{error}</ErrorSpan>}

                    <AuthButton customStyles={StyledAuthButton} type="submit" disabled={isLoading}>
                        {isLoading ? <MainLoader customStyles={StyledMainLoader} /> : 'Sign up'}
                    </AuthButton>
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
    background-color: ${COLORS.WHITE};
    width: 100%;
    padding: 24px;
    border-radius: 8px;
    gap: 25px;

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
const StyledAuthButton = css`
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled,
    &[disabled] {
        background-color: ${COLORS.MAIN_GREY};
        color: ${COLORS.HARD_GREY};

        &:hover {
            opacity: 0.75;
        }
    }
`

const StyledMainLoader = css`
    width: 20px;
    border: 3px solid ${COLORS.LIGHT_GREY};
    border-right-color: ${COLORS.HARD_GREY};
`
export default SignUpPage
