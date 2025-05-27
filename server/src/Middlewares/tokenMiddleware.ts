import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { STATUS_CODES, StatusCodes } from '../vars/statusCodesVars'

type ContextBody = {
    message: string
    status: StatusCodes
}

type TokenContext = Context & {
    body: ContextBody
}

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

const tokenMiddleware = async (ctx: TokenContext, next: any) => {
    try {
        const header = ctx.header.authorization

        if (!header) {
            ctx.throw(STATUS_CODES.UNAUTHORIZED, 'Auth header is missing')
        }

        const token = header.replace('Bearer ', '')

        if (!token || token === '') {
            ctx.throw(STATUS_CODES.UNAUTHORIZED, 'Expired or invalid token')
        }

        if (!JWT_SECRET) {
            throw new Error('Error with dotenv in tokenMiddleware')
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        ctx.state.user = decoded

        await next()
    } catch (e) {
        const err = e as Error
        console.error(err.message)
        ctx.status = STATUS_CODES.UNAUTHORIZED
        ctx.body = {
            message: err.message,
            status: STATUS_CODES.UNAUTHORIZED,
        }
    }
}

export default tokenMiddleware
