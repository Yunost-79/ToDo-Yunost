import { Task } from '../../../Models/TaskModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { TestContext } from '../../../vars/testTypes'
import getTaskByFilterStatus from './getTaskByFilterStatus'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/TaskModel', () => ({
    Task: {
        findAll: jest.fn(),
    },
}))

describe('getTaskByFilterStatus', () => {
    let ctx: TestContext

    const mockedTaskFindAll = Task.findAll as jest.Mock

    beforeEach(() => {
        ctx = {
            params: { status: 'active' },
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

    it('getTaskByFilterStatus: should get tasks by filter (active) and return status 200', async () => {
        ctx.params = { status: 'active' }

        const mockData = [
            {
                taskId: '123',
                userId: 111,
                value: 'testValue',
                status: 'active',
                createAt: '2025-06-04 13:33:56.916 +0300',
                updatedAt: '2025-06-04 13:33:56.916 +0300',
            },
            {
                taskId: '124',
                userId: 111,
                value: 'testValue',
                status: 'active',
                createAt: '2025-06-04 13:33:56.916 +0300',
                updatedAt: '2025-06-04 13:33:56.916 +0300',
            },
        ]

        mockedTaskFindAll.mockResolvedValue(mockData)

        await getTaskByFilterStatus(ctx)

        expect(Task.findAll).toHaveBeenCalledWith({
            where: {
                userId: ctx.state.user.userId,
                status: ctx.params.status,
            },
        })

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: 'Tasks with filter status: active',
            count: mockData.length,
            tasks: mockData,
        })
    })

    it('getTaskByFilterStatus: should get tasks [] by filter (completed) and return status 200', async () => {
        ctx.params = { status: 'completed' }

        mockedTaskFindAll.mockResolvedValue([])

        await getTaskByFilterStatus(ctx)

        expect(Task.findAll).toHaveBeenCalledWith({
            where: {
                userId: ctx.state.user.userId,
                status: ctx.params.status,
            },
        })

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: 'Tasks with filter status: completed',
            count: 0,
            tasks: [],
        })
    })

    it('deleteTaskById: should throw BAD_REQUEST if status is empty in params', async () => {
        ctx.params.status = undefined

        await getTaskByFilterStatus(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'getTaskByFilterStatus failed',
            error: 'Invalid or empty filter status in params',
        })
    })
})
