import { CircularProgress, IconButton, InputAdornment, styled, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AUTH_VARS } from '../../globalVariables/authVariables'
import { PATHS } from '../../globalVariables/pathsVariables'
import { SignInUserData } from '../../globalVariables/typesVariables'
import { removeAuthErrorAndLoading, signInRequest } from '../../redux/actions/authActions'
import { RootState } from '../../redux/store'
import { generateHashPassword } from '../../utils/bcrypt/bcrypt'
import { getAccessToken } from '../../utils/cookies/cookies'
import { signInValidSchema } from '../../utils/yup/yupSchemas'
import AuthButton from '../UI/Buttons/AuthButton/AuthButton'
import ShowIcon from '../UI/Icons/ShowIcon'
import ErrorSpan from '../UI/Spans/ErrorSpan'

type Show = {
    password: boolean
}

const SignInForm = () => {
    const [isShow, setIsShow] = useState<Show>({
        password: false,
    })

    const dispatch = useDispatch()
    const { isLoading, error, isSignedIn } = useSelector((state: RootState) => state.auth)

    const token = getAccessToken()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(removeAuthErrorAndLoading())
    }, [dispatch])

    useEffect(() => {
        if (isSignedIn && token) {
            navigate(PATHS.MAIN)
        }
    }, [isSignedIn, token, navigate])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: signInValidSchema,
        onSubmit: (values) => {
            const hashedPassword = generateHashPassword(values.password.trim())

            const signInUserData: SignInUserData = {
                username: values.username.trim(),
                password: hashedPassword,
            }

            try {
                dispatch(signInRequest(signInUserData))

                if (isSignedIn) {
                    navigate(PATHS.MAIN)
                }
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

            {error && <ErrorSpan>{error}</ErrorSpan>}

            <AuthButton disabled={isLoading} type="submit">
                {isLoading ? <StyledCircularProgress color="inherit" size={30} /> : 'Sign in'}
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

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    padding: '5px',
}))

export default SignInForm
