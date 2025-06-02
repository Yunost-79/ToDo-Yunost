import { Context } from 'koa'
import logger from 'node-color-log'
import { User } from '../../Models/UserModel'
import { generateTokenAndSetCookie } from '../../helpers/tokenHelpers'
import { STATUS_CODES } from '../../vars/statusCodesVars'
import logout from './logout'

type LoginReqBody = {
    username: string
    password: string
}

const login = async (ctx: Context) => {
    try {
        const { username, password } = ctx.request.body as LoginReqBody

        if (!username || username.trim() === '')
            ctx.throw(STATUS_CODES.BAD_REQUEST, 'Invalid or empty email')

        if (!password || password.trim() === '')
            ctx.throw(STATUS_CODES.BAD_REQUEST, 'Invalid or empty password')

        const currentUser = await User.findOne({ where: { username } })

        if (!currentUser) {
            ctx.throw(STATUS_CODES.NOT_FOUNDS, `User with ${username} is not found`)
        }

        const isValidPassword = currentUser.dataValues.password === password

        if (!isValidPassword) {
            ctx.throw(STATUS_CODES.BAD_REQUEST, 'Incorrect password')
        }

        const user = {
            userId: currentUser.get('userId'),
            username: currentUser.get('username'),
            avatar: currentUser.get('avatar'),
        }

        // generateTokenAndSetCookie(ctx, Number(user.userId), username === 'username') // checking for admin rules

        generateTokenAndSetCookie(ctx, Number(user.userId), true) // checking for admin rules

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: `User ${user.username} logged in`,
            user,
        }

        logger.color('green').log('User logged in')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        logout(ctx)

        ctx.status = errStatus
        ctx.body = {
            message: 'Login failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default login
