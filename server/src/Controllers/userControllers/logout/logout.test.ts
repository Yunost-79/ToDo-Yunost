import { getToken, removeToken } from '../../../helpers/tokenHelper/tokenHelpers'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { TestContext } from '../../../vars/testTypes'
import logout from './logout'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../helpers/tokenHelper/tokenHelpers', () => ({
    removeToken: jest.fn(),
    getToken: jest.fn(),
}))

describe('logout', () => {
    let ctx: TestContext

    const mockedGetToken = getToken as jest.Mock
    const mockedRemoveToken = removeToken as jest.Mock

    beforeEach(() => {
        ctx = {
            status: undefined,
            body: undefined,
            throw: (status: number, message: string) => {
                const err: any = new Error(message)
                err.status = status
                throw err
            },
        } as TestContext
    })

    it('logout should logout user and return status 200', async () => {
        mockedRemoveToken.mockImplementation(() => {})
        mockedGetToken.mockReturnValueOnce(undefined).mockReturnValueOnce(undefined)

        await logout(ctx)

        expect(removeToken).toHaveBeenCalledWith(ctx, 'access')
        expect(removeToken).toHaveBeenCalledWith(ctx, 'refresh')

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: 'Logged out successfully',
        })
    })

    it('logout should logout user and return status 200', async () => {
        mockedRemoveToken.mockImplementation(() => {})
        mockedGetToken.mockReturnValueOnce(undefined).mockReturnValueOnce(undefined)

        await logout(ctx)

        expect(removeToken).toHaveBeenCalledWith(ctx, 'access')
        expect(removeToken).toHaveBeenCalledWith(ctx, 'refresh')

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: 'Logged out successfully',
        })
    })
})
