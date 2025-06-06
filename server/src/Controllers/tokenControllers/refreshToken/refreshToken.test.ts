import logout from '../../../Controllers/userControllers/logout/logout'
import {
    generateTokenAndSetCookie,
    getToken,
    verifyToken,
} from '../../../helpers/tokenHelper/tokenHelpers'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { TestContext } from '../../../vars/testTypes'
import refreshToken from './refreshToken'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/TaskModel', () => ({
    Task: {
        findAll: jest.fn(),
    },
}))

jest.mock('../../../helpers/tokenHelper/tokenHelpers', () => ({
    generateTokenAndSetCookie: jest.fn(),
    getToken: jest.fn(),
    verifyToken: jest.fn(),
}))

jest.mock('../../../Controllers/userControllers/logout/logout', () => jest.fn())

describe('refreshToken', () => {
    let ctx: TestContext

    const mockedGetToken = getToken as jest.Mock
    const mockedVerifyToken = verifyToken as jest.Mock

    let userTokenData = {
        userId: 111,
        isAdmin: true,
    }

    const validToken = 'valid-token'

    beforeEach(() => {
        ctx = {
            cookies: {
                get: jest.fn(),
                set: jest.fn(),
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

    it('refreshToken: should refresh token successfully for admin', async () => {
        mockedGetToken.mockReturnValue(validToken)
        mockedVerifyToken.mockReturnValue(userTokenData)

        await refreshToken(ctx)

        expect(getToken).toHaveBeenCalledWith(ctx, 'refresh')
        expect(verifyToken).toHaveBeenCalledWith(validToken, 'refresh')
        expect(generateTokenAndSetCookie).toHaveBeenCalledWith(
            ctx,
            userTokenData.userId,
            userTokenData.isAdmin,
        )

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: 'Access token refreshed',
        })
    })

    it('refreshToken: should throw UNAUTHORIZED if no refresh token provided', async () => {
        mockedGetToken.mockReturnValue(undefined)

        await refreshToken(ctx)

        expect(getToken).toHaveBeenCalledWith(ctx, 'refresh')

        expect(ctx.status).toBe(STATUS_CODES.UNAUTHORIZED)
        expect(ctx.body).toEqual({
            message: 'refreshToken failed',
            error: 'No refresh token provided',
        })

        expect(logout).toHaveBeenCalled()
    })

    it('refreshToken: should throw UNAUTHORIZED if invalid refresh token', async () => {
        mockedGetToken.mockReturnValue(validToken)
        mockedVerifyToken.mockReturnValue({ isAdmin: true })

        await refreshToken(ctx)

        expect(getToken).toHaveBeenCalledWith(ctx, 'refresh')
        expect(verifyToken).toHaveBeenCalledWith(validToken, 'refresh')

        expect(ctx.status).toBe(STATUS_CODES.UNAUTHORIZED)
        expect(ctx.body).toEqual({
            message: 'refreshToken failed',
            error: 'Invalid refresh token',
        })

        expect(logout).toHaveBeenCalled()
    })

    it('refreshToken: should throw UNAUTHORIZED if user doesn`t have access', async () => {
        mockedGetToken.mockReturnValue(validToken)
        mockedVerifyToken.mockReturnValue({ userId: userTokenData.userId, isAdmin: false })

        await refreshToken(ctx)

        expect(getToken).toHaveBeenCalledWith(ctx, 'refresh')
        expect(verifyToken).toHaveBeenCalledWith(validToken, 'refresh')

        expect(ctx.status).toBe(STATUS_CODES.UNAUTHORIZED)
        expect(ctx.body).toEqual({
            message: 'refreshToken failed',
            error: 'User doesn`t have access',
        })

        expect(logout).toHaveBeenCalled()
    })
})
