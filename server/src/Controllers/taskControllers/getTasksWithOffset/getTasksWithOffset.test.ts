import { Task } from '../../../Models/TaskModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { TestContext } from '../../../vars/testTypes'
import getTasksWithOffset from './getTasksWithOffset'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/TaskModel', () => ({
    Task: {
        findAll: jest.fn(),
        count: jest.fn(),
    },
}))

describe('getTasksWithOffset', () => {
    let ctx: TestContext

    const mockedTaskFindAll = Task.findAll as jest.Mock
    const mockedTaskCount = Task.count as jest.Mock

    beforeEach(() => {
        ctx = {
            state: {
                user: { userId: 111 },
            },
            query: {
                offset: '0',
                status: 'all',
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

    it('getTasksWithOffset: should get all tasks and return status 200', async () => {
        const limit = 15

        const mockData = [
            {
                taskId: 123,
                userId: ctx.state.user.userId,
                value: 'testValue',
                status: 'active',
                createAt: '2025-06-04 13:33:56.916 +0300',
                updatedAt: '2025-06-04 13:33:56.916 +0300',
            },
            {
                taskId: 124,
                userId: ctx.state.user.userId,
                value: 'testValue',
                status: 'completed',
                createAt: '2025-06-04 13:33:56.916 +0300',
                updatedAt: '2025-06-04 13:33:56.916 +0300',
            },
        ]

        mockedTaskFindAll.mockReturnValue(mockData)
        mockedTaskCount.mockReturnValue(mockData.length)

        await getTasksWithOffset(ctx)

        const offsetNumber = parseInt(ctx.query.offset ?? '0')

        expect(Task.findAll).toHaveBeenCalledWith({
            where: {
                userId: ctx.state.user.userId,
            },
            limit: limit,
            offset: offsetNumber,
            order: [['createdAt', 'DESC']],
        })
        expect(Task.count).toHaveBeenCalledWith({
            where: {
                userId: ctx.state.user.userId,
            },
        })
        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: 'Tasks received',
            count: mockData.length,
            isEnd: mockData.length < limit,
            tasks: mockData,
        })
    })

    it('getTasksWithOffset: should get tasks with completed status and return status 200', async () => {
        const limit = 15
        ctx.query.status = 'completed'

        const mockData = [
            {
                taskId: 124,
                userId: ctx.state.user.userId,
                value: 'testValue',
                status: 'completed',
                createAt: '2025-06-04 13:33:56.916 +0300',
                updatedAt: '2025-06-04 13:33:56.916 +0300',
            },
        ]

        mockedTaskFindAll.mockReturnValue(mockData)
        mockedTaskCount.mockReturnValue(mockData.length)

        await getTasksWithOffset(ctx)

        const offsetNumber = parseInt(ctx.query.offset ?? '0')

        expect(Task.findAll).toHaveBeenCalledWith({
            where: {
                userId: ctx.state.user.userId,
                status: ctx.query.status,
            },
            limit: limit,
            offset: offsetNumber,
            order: [['createdAt', 'DESC']],
        })
        expect(Task.count).toHaveBeenCalledWith({
            where: {
                userId: ctx.state.user.userId,
                status: ctx.query.status,
            },
        })
        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: 'Tasks received',
            count: mockData.length,
            isEnd: mockData.length < limit,
            tasks: mockData,
        })
    })

    it('getTasksWithOffset: should throw BAD_REQUEST if offset is empty in query', async () => {
        ctx.query.offset = undefined

        await getTasksWithOffset(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'getTasksWithOffset failed',
            error: 'Invalid or empty query',
        })
    })
})
