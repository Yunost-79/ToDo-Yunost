import * as Yup from 'yup'
//eslint-disable-next-line
import YupPassword from 'yup-password'
YupPassword(Yup)

export const signInValidSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})

export const signUpValidSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
        .required('Password is required')
        .password()
        .min(8, '- Minimum 8 characters')
        .minUppercase(1, '- At least one uppercase English letter')
        .minLowercase(1, '- At least one lowercase English letter')
        .minNumbers(1, '- At least one digit')
        .minSymbols(1, '- At least one special character'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
})
