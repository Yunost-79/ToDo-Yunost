import { Context } from 'koa'
import { getToken, verifyToken } from '../helpers/tokenHelpers'
import { User } from '../Models/UserModel'
import { STATUS_CODES } from '../vars/statusCodesVars'

const authMiddleware = async (ctx: Context, next: any) => {
    try {
        const token = getToken(ctx, 'access')

        if (!token) {
            ctx.throw(STATUS_CODES.UNAUTHORIZED, 'Token is missing')
        }

        const tokenData = verifyToken(token, 'access')

        if (!tokenData?.userId) {
            ctx.throw(STATUS_CODES.UNAUTHORIZED, 'Invalid token data')
        }

        const userId = tokenData.userId

        const user = await User.findOne({ where: { userId } })

        if (!user) {
            ctx.throw(STATUS_CODES.UNAUTHORIZED, `User not found`)
        }

        ctx.state.user = user
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
