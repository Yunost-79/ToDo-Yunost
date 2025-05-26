import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AUTH_VARS } from '../../globalVariables/authVariables'
import { PATHS } from '../../globalVariables/pathsVariables'
import { COLORS } from '../../globalVariables/styledVariables'
import { SignUpUserData } from '../../globalVariables/typesVariables'
import { signUpRequest } from '../../redux/actions/authActions'
import { RootState } from '../../redux/store'
import { signUpValidSchema } from '../../utils/yup/yupSchemas'
import AuthButton from '../UI/Buttons/AuthButton/AuthButton'
import Button from '../UI/Buttons/Button'
import HideAndShowButton from '../UI/Buttons/HideAndShowButton'
import AuthInput from '../UI/Inputs/AuthInput/AuthInput'
import MainLoader from '../UI/Loaders/MainLoader'
import ErrorSpan from '../UI/Spans/ErrorSpan'

type Show = {
    password: boolean
    rePassword: boolean
}

const SignUpForm = () => {
    const [show, setShow] = useState<Show>({
        password: false,
        rePassword: false,
    })

    const dispatch = useDispatch()
    const { isLoading, error, token } = useSelector((state: RootState) => state.auth)

    const navigate = useNavigate()

    // useEffect(() => {
    //     dispatch(removeAuthErrorAndLoading())
    // }, [dispatch])

    useEffect(() => {
        if (token) {
            navigate(PATHS.MAIN)
        }
    }, [token, navigate])

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
        },
    })

    return (
        <Form onSubmit={formik.handleSubmit}>
            <AuthInput
                name={AUTH_VARS.username}
                type="text"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={error || (formik.touched.username && Boolean(formik.errors.username))}
                helperText={formik.touched.username && formik.errors.username}
            />
            <AuthInput
                name={AUTH_VARS.password}
                type={show.password ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={error || (formik.touched.password && Boolean(formik.errors.password))}
                helperText={formik.touched.password && formik.errors.password}
                img={
                    <Button
                        type="button"
                        customStyles={ShowButton}
                        onClick={(e) => {
                            e.preventDefault()
                            setShow((prev) => ({ ...prev, password: !prev.password }))
                        }}
                    >
                        <HideAndShowButton
                            show={show.password}
                            error={
                                error ||
                                (formik.touched.password && Boolean(formik.errors.password))
                            }
                        />
                    </Button>
                }
            />
            <AuthInput
                name={AUTH_VARS.rePassword}
                type={show.rePassword ? 'text' : 'password'}
                placeholder="Enter your password again"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
                helperText={formik.touched.rePassword && formik.errors.rePassword}
                img={
                    <Button
                        type="button"
                        customStyles={ShowButton}
                        onClick={(e) => {
                            e.preventDefault()
                            setShow((prev) => ({ ...prev, rePassword: !prev.rePassword }))
                        }}
                    >
                        <HideAndShowButton
                            show={show.rePassword}
                            error={
                                error ||
                                (formik.touched.rePassword && Boolean(formik.errors.rePassword))
                            }
                        />
                    </Button>
                }
            />

            {error && <ErrorSpan>{error}</ErrorSpan>}

            <AuthButton customStyles={StyledAuthButton} type="submit" disabled={isLoading}>
                {isLoading ? <MainLoader customStyles={StyledMainLoader} /> : 'Sign up'}
            </AuthButton>
        </Form>
    )
}

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

const ShowButton = css`
    padding: 0;
    border-radius: 50%;
    border: none;

    svg {
        width: 25px;
        height: 25px;
        opacity: 0.6;
        transition: 0.2s;
    }

    &:hover {
        background-color: transparent;
        border-color: none;

        svg {
            opacity: 1;
        }
    }
`

export default SignUpForm
