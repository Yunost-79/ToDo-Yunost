import { Context } from 'koa'
import logger from 'node-color-log'
import { getToken, removeToken } from '../../../helpers/tokenHelper/tokenHelpers'
import { STATUS_CODES } from '../../../vars/statusCodesVars'

const logout = async (ctx: Context) => {
    try {
        removeToken(ctx, 'access')
        removeToken(ctx, 'refresh')

        const forCheckAccessToken = getToken(ctx, 'access')
        const forCheckRefreshToken = getToken(ctx, 'refresh')

        if (forCheckAccessToken || forCheckRefreshToken)
            ctx.throw(STATUS_CODES.INTERNAL_SERVER_ERROR, 'Error with deleting tokens')

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: 'Logged out successfully',
        }

        logger.color('green').log('User logged out')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'logout failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default logout
