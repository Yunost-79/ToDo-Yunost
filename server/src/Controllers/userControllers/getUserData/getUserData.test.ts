import { User } from '../../../Models/UserModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { TestContext } from '../../../vars/testTypes'
import getUserData from './getUserData'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/UserModel', () => ({
    User: {
        findOne: jest.fn(),
    },
}))

describe('getUserData', () => {
    let ctx: TestContext

    const mockedUserFindOne = User.findOne as jest.Mock

    beforeEach(() => {
        ctx = {
            state: {
                user: { userId: 111 },
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

    it('getUserData: should get user data and return status 200', async () => {
        const user = {
            username: 'test-user',
            avatar: 'https://ui-avatars.com/api/?name=username&background=054acc&size=128',
            userId: 111,
        }

        mockedUserFindOne.mockReturnValue({
            get: (filed: string) => {
                return user[filed as keyof typeof user]
            },
        })

        await getUserData(ctx)

        expect(User.findOne).toHaveBeenCalledWith({
            where: {
                userId: ctx.state.user.userId,
            },
        })

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: `Get user data by ID: ${ctx.state.user.userId}`,
            user,
        })
    })

    it('getUserData: should throw NOT_FOUNDS if user not found', async () => {
        mockedUserFindOne.mockReturnValue(undefined)

        await getUserData(ctx)

        expect(ctx.status).toBe(STATUS_CODES.NOT_FOUNDS)
        expect(ctx.body).toEqual({
            message: 'getUserData failed',
            error: `User with ID: ${ctx.state.user.userId} is not found`,
        })
    })
})
