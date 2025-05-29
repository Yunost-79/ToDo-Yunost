import * as Yup from 'yup'

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const helperPasswordText = [
    '- Minimum 8 characters',
    '- At least one uppercase English letter',
    '- At least one lowercase English letter',
    '- At least one digit',
    '- At least one special character',
].join('\n')

export const signInValidSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})

export const signUpValidSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
        .matches(passwordRegex, helperPasswordText)
        .required('Password is required'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
})
