import { IncomingMessage, ServerResponse } from 'http'
import jwt from 'jsonwebtoken'
import Koa, { Context } from 'koa'
import { generateTokenAndSetCookie, getToken, removeToken, verifyToken } from './tokenHelpers'

describe('tokenHelpers', () => {
    let ctx: Context

    beforeEach(() => {
        const app = new Koa()
        const request = new IncomingMessage(null as any)
        const response = new ServerResponse(request)

        ctx = app.createContext(request, response)

        const cookieStore: Record<string, string> = {}

        ctx.cookies = {
            get(name: string) {
                return cookieStore[name]
            },
            set(name: string, value: string) {
                cookieStore[name] = value
            },
        } as any
    })

    it('generateTokenAndSetCookie: must to set accessToken and refreshToken in cookies', () => {
        const { accessToken, refreshToken } = generateTokenAndSetCookie(ctx, 1, false)

        expect(typeof accessToken).toBe('string')
        expect(typeof refreshToken).toBe('string')

        expect(ctx.cookies.get('accessToken')).toBe(accessToken)
        expect(ctx.cookies.get('refreshToken')).toBe(refreshToken)
    })

    it('getToken: must return correct access token', () => {
        ctx.cookies.set('accessToken', 'test-token')
        const token = getToken(ctx, 'access')
        expect(token).toBe('test-token')
    })

    it('getToken: must return correct refresh token', () => {
        ctx.cookies.set('refreshToken', 'test-token')
        const token = getToken(ctx, 'refresh')
        expect(token).toBe('test-token')
    })

    it('removeToken: delete accessToken', () => {
        ctx.cookies = {
            set: jest.fn(),
        } as any

        removeToken(ctx, 'access')
        expect(ctx.cookies.set).toHaveBeenCalledWith('accessToken', '', { maxAge: 0 })
    })

    it('removeToken: delete refreshToken', () => {
        ctx.cookies = {
            set: jest.fn(),
        } as any

        removeToken(ctx, 'refresh')
        expect(ctx.cookies.set).toHaveBeenCalledWith('refreshToken', '', { maxAge: 0 })
    })

    it('verifyToken: must return verify token', () => {
        const payload = { userId: 123, isAdmin: false }
        const secret = process.env.JWT_SECRET_ACCESS || 'secret'

        const token = jwt.sign(payload, secret, { expiresIn: '1h' })
        const result = verifyToken(token, 'access')

        expect(result.userId).toBe(123)
        expect(result.isAdmin).toBe(false)
    })
})
