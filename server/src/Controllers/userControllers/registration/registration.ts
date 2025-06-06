import { Context } from 'koa'
import logger from 'node-color-log'
import { generateUserAvatar } from '../../../helpers/avatarHelpers/avatarHelpers'
import { User } from '../../../Models/UserModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'

type RegistrationReqBody = {
    username: string
    password: string
}

const registration = async (ctx: Context) => {
    try {
        const { username, password } = ctx.request.body as RegistrationReqBody

        if (!username || username.trim() === '')
            ctx.throw(STATUS_CODES.BAD_REQUEST, 'Invalid or empty username')

        if (!password || password.trim() === '')
            ctx.throw(STATUS_CODES.BAD_REQUEST, 'Invalid or empty password')

        const existingUser = await User.findOne({ where: { username } })

        if (existingUser) {
            ctx.throw(STATUS_CODES.BAD_REQUEST, 'A user with this username exist')
        }

        const avatar = generateUserAvatar(username)

        await User.create({ username, password, avatar })

        ctx.status = STATUS_CODES.CREATED
        ctx.body = {
            message: 'User created',
        }

        // const user = {
        //     userId: newUser.get('userId') as number,
        //     username: newUser.get('username') as string,
        //     avatar: avatar as string,
        // }

        // generateTokenAndSetCookie(user.userId as number, ctx)

        // ctx.status = STATUS_CODES.CREATED
        // ctx.body = {
        //     message: `User ${user.username} created`,
        //     user,
        // }

        logger.color('green').log('User registered')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'registration failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default registration
