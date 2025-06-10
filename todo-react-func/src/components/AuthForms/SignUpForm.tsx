import { css } from '@emotion/react'
import { IconButton, InputAdornment, styled, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AUTH_VARS } from '../../globalVariables/authVariables'
import { PATHS } from '../../globalVariables/pathsVariables'
import { COLORS } from '../../globalVariables/styledVariables'
import { SignUpUserData } from '../../globalVariables/typesVariables'
import { removeAuthErrorAndLoading, signUpRequest } from '../../redux/actions/authActions'
import { RootState } from '../../redux/store'
import { generateHashPassword } from '../../utils/bcrypt/bcrypt'
import { signUpValidSchema } from '../../utils/yup/yupSchemas'
import AuthButton from '../UI/Buttons/AuthButton/AuthButton'
import ShowIcon from '../UI/Icons/ShowIcon'
import MainLoader from '../UI/Loaders/MainLoader'
import ErrorSpan from '../UI/Spans/ErrorSpan'

type Show = {
    password: boolean
    rePassword: boolean
}

const SignUpForm = () => {
    const [isShow, setIsShow] = useState<Show>({
        password: false,
        rePassword: false,
    })

    const dispatch = useDispatch()
    const { isLoading, error, isSignedUp } = useSelector((state: RootState) => state.auth)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(removeAuthErrorAndLoading())
    }, [dispatch])

    useEffect(() => {
        if (isSignedUp) {
            navigate(PATHS.SIGN_IN)
        }
    }, [isSignedUp, navigate])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            rePassword: '',
        },
        validationSchema: signUpValidSchema,
        onSubmit: (values) => {
            const hashedPassword = generateHashPassword(values.password.trim())

            const signUpUserData: SignUpUserData = {
                username: values.username.trim(),
                password: hashedPassword,
            }

            try {
                dispatch(signUpRequest(signUpUserData))
            } catch (e) {
                const err = e as Error
                console.error('Error in sign in page', err)
            }
        },
    })

    const handleShow = (field: keyof Show) => {
        setIsShow((prev) => ({
            ...prev,
            [field]: !prev[field],
        }))
    }

    return (
        <StyledForm onSubmit={formik.handleSubmit}>
            <TextField
                name={AUTH_VARS.username}
                type="text"
                label={
                    formik.touched.username && formik.errors.username
                        ? formik.touched.username && formik.errors.username
                        : 'Username'
                }
                size="small"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={error || (formik.touched.username && Boolean(formik.errors.username))}
            />

            <TextField
                name={AUTH_VARS.password}
                type={isShow.password ? 'text' : 'password'}
                label={
                    formik.touched.password && formik.errors.password
                        ? formik.touched.password && formik.errors.password
                        : 'Enter your password'
                }
                size="small"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={error || (formik.touched.password && Boolean(formik.errors.password))}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleShow('password')}>
                                    <ShowIcon isShow={isShow.password} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <TextField
                name={AUTH_VARS.rePassword}
                type={isShow.rePassword ? 'text' : 'password'}
                label={
                    formik.touched.rePassword && formik.errors.rePassword
                        ? formik.touched.rePassword && formik.errors.rePassword
                        : 'Enter your password again'
                }
                size="small"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={error || (formik.touched.rePassword && Boolean(formik.errors.rePassword))}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleShow('rePassword')}>
                                    <ShowIcon isShow={isShow.rePassword} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />

            {error && <ErrorSpan>{error}</ErrorSpan>}

            <AuthButton disabled={isLoading} type="submit">
                {isLoading ? <MainLoader customStyles={StyledMainLoader} /> : 'Sign up'}
            </AuthButton>
        </StyledForm>
    )
}

const StyledForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: '9px',
}))

const StyledMainLoader = css`
    width: 20px;
    border: 3px solid ${COLORS.LIGHT_GREY};
    border-right-color: ${COLORS.HARD_GREY};
`

export default SignUpForm
