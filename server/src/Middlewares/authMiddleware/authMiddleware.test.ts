import logout from '../../Controllers/userControllers/logout/logout'
import { User } from '../../Models/UserModel'
import { getToken, verifyToken } from '../../helpers/tokenHelper/tokenHelpers'
import { STATUS_CODES } from '../../vars/statusCodesVars'
import { TestContext } from '../../vars/testTypes'
import authMiddleware from './authMiddleware'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../helpers/tokenHelper/tokenHelpers', () => ({
    getToken: jest.fn(),
    verifyToken: jest.fn(),
}))

jest.mock('../../Controllers/userControllers/logout/logout', () => jest.fn())

jest.mock('../../Models/UserModel', () => ({
    User: {
        findOne: jest.fn(),
    },
}))

describe('authMiddleware', () => {
    let ctx: TestContext
    let next: jest.Mock

    const mockedGetToken = getToken as jest.Mock
    const mockedVerifyToken = verifyToken as jest.Mock
    const mockedUserFindOne = User.findOne as jest.Mock

    beforeEach(() => {
        ctx = {
            header: { authorization: 'Bearer token' },
            state: {},
            status: undefined,
            throw: (status: number, message: string) => {
                logout(ctx)
                const err: any = new Error(message)
                err.status = status
                throw err
            },
        } as TestContext

        next = jest.fn()
        jest.clearAllMocks()
    })

    it('authMiddleware: should set user in state and call next()', async () => {
        const user = { userId: 123, isAdmin: true }

        mockedGetToken.mockReturnValue('validToken')
        mockedVerifyToken.mockReturnValue(user)
        mockedUserFindOne.mockReturnValue(user)

        await authMiddleware(ctx, next)

        expect(getToken).toHaveBeenCalledWith(ctx, 'access')
        expect(verifyToken).toHaveBeenCalledWith('validToken', 'access')
        expect(User.findOne).toHaveBeenCalledWith({ where: { userId: user.userId } })
        expect(ctx.state.user).toEqual(user)
        expect(next).toHaveBeenCalled()
    })

    it('authMiddleware: should throw UNAUTHORIZED if  token is missing', async () => {
        mockedGetToken.mockReturnValue(null)

        await authMiddleware(ctx, next)

        expect(ctx.status).toBe(STATUS_CODES.UNAUTHORIZED)
        expect(ctx.body).toEqual({
            message: 'authMiddleware failed',
            error: 'Token is missing',
        })
    })

    it('authMiddleware: should throw UNAUTHORIZED if not verify token data', async () => {
        mockedGetToken.mockReturnValue('validToken')
        mockedVerifyToken.mockReturnValue({ userId: null, isAdmin: true })

        await authMiddleware(ctx, next)

        expect(ctx.status).toBe(STATUS_CODES.UNAUTHORIZED)
        expect(ctx.body).toEqual({
            message: 'authMiddleware failed',
            error: 'Invalid token data',
        })
    })

    it('authMiddleware: should throw UNAUTHORIZED if user doesn`t have access', async () => {
        mockedGetToken.mockReturnValue('validToken')
        mockedVerifyToken.mockReturnValue({ userId: 123, isAdmin: false })

        await authMiddleware(ctx, next)

        expect(ctx.status).toBe(STATUS_CODES.UNAUTHORIZED)
        expect(ctx.body).toEqual({
            message: 'authMiddleware failed',
            error: 'User doesn`t have access',
        })
    })

    it('authMiddleware: should throw NOT_FOUND if user not found in DB', async () => {
        const user = { userId: 124, isAdmin: true }

        mockedGetToken.mockReturnValue('validToken')
        mockedVerifyToken.mockReturnValue(user)
        mockedUserFindOne.mockReturnValue(null)

        await authMiddleware(ctx, next)

        expect(ctx.status).toBe(STATUS_CODES.NOT_FOUNDS)
        expect(ctx.body).toEqual({
            message: 'authMiddleware failed',
            error: 'User not found',
        })
    })
})
