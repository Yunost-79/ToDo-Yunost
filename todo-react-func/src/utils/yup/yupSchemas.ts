import * as Yup from 'yup'

export const signInValidSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
})

export const signUpValidSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
})
