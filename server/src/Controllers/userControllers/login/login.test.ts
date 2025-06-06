import { generateTokenAndSetCookie } from '../../../helpers/tokenHelper/tokenHelpers'
import { User } from '../../../Models/UserModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { TestContext } from '../../../vars/testTypes'
import login from './login'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/UserModel', () => ({
    User: {
        findOne: jest.fn(),
    },
}))

jest.mock('../../../helpers/tokenHelper/tokenHelpers', () => ({
    generateTokenAndSetCookie: jest.fn(),
}))

describe('login', () => {
    let ctx: TestContext

    const mockedUserFindOne = User.findOne as jest.Mock

    const user = {
        username: 'test-user',
        avatar: 'https://ui-avatars.com/api/?name=username&background=054acc&size=128',
        userId: 111,
    }

    beforeEach(() => {
        ctx = {
            request: {
                body: {},
            },
            status: undefined,
            body: undefined,
            throw: (status: number, message: string) => {
                const err: any = new Error(message)
                err.status = status
                throw err
            },
        } as TestContext
    })

    it('login: should login user and return status 200', async () => {
        ctx.request.body.username = 'test-user'
        ctx.request.body.password = 'hashedPassword'

        mockedUserFindOne.mockResolvedValue({
            get: (filed: string) => {
                return user[filed as keyof typeof user]
            },
            dataValues: {
                password: ctx.request.body.password,
            },
        })

        await login(ctx)

        expect(User.findOne).toHaveBeenCalledWith({
            where: {
                username: ctx.request.body.username,
            },
        })

        expect(generateTokenAndSetCookie).toHaveBeenCalledWith(ctx, user.userId, true)

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: `User ${ctx.request.body.username} logged in`,
            user,
        })
    })

    it('login: should throw BAD_REQUEST if invalid or empty username', async () => {
        ctx.request.body.username = undefined
        ctx.request.body.password = 'hashedPassword'

        await login(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'login failed',
            error: `Invalid or empty username`,
        })
    })

    it('login: should throw BAD_REQUEST if invalid or empty password', async () => {
        ctx.request.body.username = 'test-user'
        ctx.request.body.password = undefined

        await login(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'login failed',
            error: `Invalid or empty password`,
        })
    })

    it('login: should throw NOT_FOUNDS if user not found', async () => {
        ctx.request.body.username = 'test-user'
        ctx.request.body.password = 'hashedPassword'

        mockedUserFindOne.mockResolvedValue(undefined)

        await login(ctx)

        expect(ctx.status).toBe(STATUS_CODES.NOT_FOUNDS)
        expect(ctx.body).toEqual({
            message: 'login failed',
            error: `User with this username ${ctx.request.body.username} is not found`,
        })
    })

    it('login: should throw BAD_REQUEST if incorrect password', async () => {
        ctx.request.body.username = 'test-user'
        ctx.request.body.password = 'hashedPassword'

        mockedUserFindOne.mockResolvedValue({
            get: (filed: string) => {
                return user[filed as keyof typeof user]
            },
            dataValues: {
                password: 'anotherHashedPassword',
            },
        })

        await login(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'login failed',
            error: `Incorrect password`,
        })
    })
})
