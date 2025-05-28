import { Context } from 'koa'
import logger from 'node-color-log'
import { generateTokenAndSetCookie, getToken, verifyToken } from '../../helpers/tokenHelpers'
import { STATUS_CODES } from '../../vars/statusCodesVars'

const refreshToken = async (ctx: Context) => {
    try {
        const refreshToken = getToken(ctx, 'refresh')

        if (!refreshToken) ctx.throw(STATUS_CODES.UNAUTHORIZED, 'No refresh token provided')

        const decoded = verifyToken(refreshToken, 'refresh')
        const userId = decoded.userId

        if (!userId) ctx.throw(STATUS_CODES.UNAUTHORIZED, 'Invalid refresh token')

        generateTokenAndSetCookie(ctx, userId)

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: 'Access token refreshed',
        }

        logger.color('blue').log('Access token refreshed')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'Refresh token failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default refreshToken
