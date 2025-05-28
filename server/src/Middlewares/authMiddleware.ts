import dotenv from 'dotenv'
import { Context } from 'koa'
import { generateTokenAndSetCookie, getToken, verifyToken } from '../helpers/tokenHelpers'
import { User } from '../Models/UserModel'
import { STATUS_CODES } from '../vars/statusCodesVars'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('Error with dotenv in authMiddleware')
}

const authMiddleware = async (ctx: Context, next: any) => {
    try {
        const token = getToken(ctx)

        if (!token) {
            ctx.throw(STATUS_CODES.UNAUTHORIZED, 'Token is missing')
        }

        const tokenData = verifyToken(token)

        if (!tokenData) {
            ctx.throw(STATUS_CODES.UNAUTHORIZED, 'User data is empty in token')
        }

        const userId = tokenData.userId

        if (!userId) {
            ctx.throw(STATUS_CODES.UNAUTHORIZED, 'UserId missing in token data')
        }

        const user = await User.findOne({ where: { userId } })

        if (!user) {
            ctx.throw(STATUS_CODES.UNAUTHORIZED, `User with userId: ${userId} not found`)
        }

        ctx.state.user = user
        generateTokenAndSetCookie(userId, ctx)

        await next()
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'authMiddleware failed',
            error: e.message,
        }
    }
}

export default authMiddleware
