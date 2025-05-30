import dotenv from 'dotenv'
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken'
import { Context } from 'koa'

dotenv.config()

const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH

if (!JWT_SECRET_ACCESS || !JWT_SECRET_REFRESH) {
    throw new Error('Error with dotenv in generateTokenAndSetCookie')
}

export const generateTokenAndSetCookie = (ctx: Context, userId: number) => {
    const accessToken = jwt.sign({ userId }, JWT_SECRET_ACCESS as jwt.Secret, {
        expiresIn: '3h',
    })
    const refreshToken = jwt.sign({ userId }, JWT_SECRET_REFRESH as jwt.Secret, {
        expiresIn: '7d',
    })

    const minutes = 180
    const days = 7

    ctx.cookies.set('accessToken', accessToken, {
        maxAge: minutes * 60 * 1000,
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        overwrite: true,
    })

    ctx.cookies.set('refreshToken', refreshToken, {
        maxAge: days * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        overwrite: true,
    })

    return { accessToken, refreshToken }
}

export const getToken = (ctx: Context, cookie: 'access' | 'refresh') => {
    const cookieName = cookie === 'access' ? 'accessToken' : 'refreshToken'
    return ctx.cookies.get(cookieName)
}

export const removeToken = (ctx: Context, cookie: 'access' | 'refresh') => {
    const cookieName = cookie === 'access' ? 'accessToken' : 'refreshToken'

    return ctx.cookies.set(cookieName, '', {
        maxAge: 0,
    })
}

export const verifyToken = (token: string, jwtFlag: 'access' | 'refresh') => {
    const secretCode = jwtFlag === 'access' ? JWT_SECRET_ACCESS : JWT_SECRET_REFRESH

    try {
        return jwt.verify(token, secretCode) as JwtPayload
    } catch (e: any) {
        if (e instanceof TokenExpiredError) {
            throw new Error('Token expired')
        }

        throw new Error('Invalid token')
    }
}
