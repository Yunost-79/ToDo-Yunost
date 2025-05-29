import bcrypt from 'bcryptjs'

export const generateHashPassword = (password: string) => {
    // const saltRounds = Number(process.env.REACT_APP_SALT_ROUNDS) || 10
    // const salt = bcrypt.genSaltSync(saltRounds)
    // return bcrypt.hashSync(password, salt)

    const FIXED_SALT = '$2a$10$CwTycUXWue0Thq9StjUM0u'
    return bcrypt.hashSync(password, FIXED_SALT)
}

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash)
}
