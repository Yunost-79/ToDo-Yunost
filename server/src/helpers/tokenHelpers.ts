import dotenv from 'dotenv'
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken'
import { Context } from 'koa'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('Error with dotenv in generateTokenAndSetCookie')
}

export const generateTokenAndSetCookie = (userId: number, ctx: Context) => {
    const token: string = jwt.sign({ userId }, JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    })

    const days = 1

    return ctx.cookies.set('jwt', token, {
        maxAge: days * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        overwrite: true,
    })
}

export const getToken = (ctx: Context) => {
    return ctx.cookies.get('jwt')
}

export const removeToken = (ctx: Context) => {
    return ctx.cookies.set('jwt', '', {
        maxAge: 0,
    })
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch (e: any) {
        if (e instanceof TokenExpiredError) {
            throw new Error('Token expired')
        }

        throw new Error('Invalid token')
    }
}
