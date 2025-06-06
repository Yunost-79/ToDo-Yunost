import { Context } from 'koa'

export type TestContext = Context & {
    header: ContextHeader
    params: ContextParams
    query: ContextQuery
    state: ContextState
    request: ContextRequest
    cookies: ContextCookies
    status?: number
    body: any
    throw?: (status: number, message: string) => never
}

type ContextHeader = {
    authorization: string
}

type ContextParams = {
    id?: string
    status?: 'active' | 'completed'
}

type ContextQuery = {
    offset?: string
    status?: 'all' | 'active' | 'completed'
}

type ContextState = {
    user: UserState
}

type UserState = {
    userId: number
    avatar: string
    username: string
}

type ContextRequest = {
    body: BodyRequest
}

type BodyRequest = {
    value?: string
    updates: TaskUpdates
    username?: string
    password?: string
}

type TaskUpdates = {
    value?: string
    status?: 'active' | 'completed'
}

type ContextCookies = {
    get: jest.Mock
    set: jest.Mock
}
