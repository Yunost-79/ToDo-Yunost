import { generateUserAvatar } from '../../../helpers/avatarHelpers/avatarHelpers'
import { User } from '../../../Models/UserModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { TestContext } from '../../../vars/testTypes'
import registration from './registration'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/UserModel', () => ({
    User: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}))

jest.mock('../../../helpers/avatarHelpers/avatarHelpers', () => ({
    generateUserAvatar: jest.fn(),
}))

describe('registration', () => {
    let ctx: TestContext

    const mockedUserFindOne = User.findOne as jest.Mock
    const mockedUserCreate = User.create as jest.Mock
    const mockedGenerateUserAvatar = generateUserAvatar as jest.Mock

    const user = {
        username: 'new-test-user',
        avatar: 'https://ui-avatars.com/api/?name=username&background=054acc&size=128',
        userId: 111,
    }

    beforeEach(() => {
        ctx = {
            request: {
                body: {
                    username: 'new-test-user',
                    password: 'hashedPassword',
                },
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

    it('registration: should registration user and return status 200', async () => {
        mockedUserFindOne.mockResolvedValue(undefined)
        mockedUserCreate.mockImplementation(() => {})
        mockedGenerateUserAvatar.mockReturnValue(user.avatar)

        await registration(ctx)

        expect(User.findOne).toHaveBeenCalledWith({
            where: {
                username: ctx.request.body.username,
            },
        })

        expect(User.create).toHaveBeenCalledWith({
            username: ctx.request.body.username,
            password: ctx.request.body.password,
            avatar: user.avatar,
        })

        expect(ctx.status).toBe(STATUS_CODES.CREATED)
        expect(ctx.body).toEqual({
            message: 'User created',
        })
    })

    it('registration: should throw BAD_REQUEST if invalid or empty username', async () => {
        ctx.request.body.username = undefined

        await registration(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'registration failed',
            error: `Invalid or empty username`,
        })
    })

    it('registration: should throw BAD_REQUEST if invalid or empty password', async () => {
        ctx.request.body.password = undefined

        await registration(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'registration failed',
            error: `Invalid or empty password`,
        })
    })

    it('registration: should throw BAD_REQUEST if user with this username exist', async () => {
        mockedUserFindOne.mockResolvedValue({
            get: (filed: string) => {
                return user[filed as keyof typeof user]
            },
            dataValues: {
                password: ctx.request.body.password,
            },
        })

        await registration(ctx)

        expect(User.findOne).toHaveBeenCalledWith({
            where: {
                username: ctx.request.body.username,
            },
        })
        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'registration failed',
            error: `A user with this username exist`,
        })
    })
})
