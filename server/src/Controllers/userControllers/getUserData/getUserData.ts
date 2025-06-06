import { Context } from 'koa'
import logger from 'node-color-log'
import { User } from '../../../Models/UserModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'

const getUserData = async (ctx: Context) => {
    try {
        const { userId } = ctx.state.user as { userId: number }

        const currentUser = await User.findOne({
            where: {
                userId,
            },
        })

        if (!currentUser) {
            ctx.throw(STATUS_CODES.NOT_FOUNDS, `User with ID: ${userId} is not found`)
        }

        const user = {
            userId: currentUser.get('userId'),
            username: currentUser.get('username'),
            avatar: currentUser.get('avatar'),
        }

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: `Get user data by ID: ${userId}`,
            user,
        }

        logger.color('yellow').log('User has been received')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'getUserData failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default getUserData
