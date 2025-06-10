import bcrypt from 'bcryptjs'

export const generateHashPassword = (password: string) => {
    // IMPORTANT: This was bad idea because when using HTTPS, passwords are securely protected

    const FIXED_SALT = '$2a$10$CwTycUXWue0Thq9StjUM0u'
    return bcrypt.hashSync(password, FIXED_SALT)
}

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash)
}
