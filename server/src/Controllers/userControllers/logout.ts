import { Context } from 'koa'
import logger from 'node-color-log'
import { removeToken } from '../../helpers/tokenHelpers'
import { STATUS_CODES } from '../../vars/statusCodesVars'

const logout = async (ctx: Context) => {
    try {
        removeToken(ctx, 'access')
        removeToken(ctx, 'refresh')

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: 'Logged out successfully',
        }

        logger.color('green').log('User logged out')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'Logout failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default logout
