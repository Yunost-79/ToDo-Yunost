import { Context } from 'koa'
import logger from 'node-color-log'
import { generateTokenAndSetCookie, getToken, verifyToken } from '../../helpers/tokenHelpers'
import { STATUS_CODES } from '../../vars/statusCodesVars'
import logout from '../userControllers/logout'

const refreshToken = async (ctx: Context) => {
    try {
        const refreshToken = getToken(ctx, 'refresh')

        if (!refreshToken) ctx.throw(STATUS_CODES.UNAUTHORIZED, 'No refresh token provided')

        const decoded = verifyToken(refreshToken, 'refresh')
        const userId = decoded.userId

        const isAdmin = decoded.isAdmin

        console.log('is Admin in refresh token', isAdmin)

        if (!userId) ctx.throw(STATUS_CODES.UNAUTHORIZED, 'Invalid refresh token')
        if (!isAdmin) ctx.throw(STATUS_CODES.UNAUTHORIZED, 'User doesn`t have access')

        generateTokenAndSetCookie(ctx, userId, isAdmin)

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: 'Access token refreshed',
        }

        logger.color('blue').log('Access token refreshed')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR
        logout(ctx)

        ctx.status = errStatus
        ctx.body = {
            message: 'Refresh token failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default refreshToken
