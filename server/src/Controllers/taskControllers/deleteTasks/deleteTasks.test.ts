import { Task } from '../../../Models/TaskModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { TestContext } from '../../../vars/testTypes'
import deleteTasks from './deleteTasks'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/TaskModel', () => ({
    Task: {
        findAll: jest.fn(),
        destroy: jest.fn(),
    },
}))

describe('deleteTasks', () => {
    let ctx: TestContext

    const mockedTaskFindAll = Task.findAll as jest.Mock
    const mockedTaskDestroy = Task.destroy as jest.Mock

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

    it('deleteTasks: should delete 2 task and return status 200', async () => {
        mockedTaskFindAll.mockResolvedValue([
            {
                taskId: 123,
                userId: 111,
                value: 'testValue',
                status: 'active',
                createAt: '2025-06-04 13:33:56.916 +0300',
                updatedAt: '2025-06-04 13:33:56.916 +0300',
            },
            {
                taskId: 124,
                userId: 111,
                value: 'testValue',
                status: 'completed',
                createAt: '2025-06-04 13:33:56.916 +0300',
                updatedAt: '2025-06-04 13:33:56.916 +0300',
            },
        ])
        mockedTaskDestroy.mockResolvedValue(2)

        await deleteTasks(ctx)

        expect(Task.findAll).toHaveBeenCalledWith({
            where: { userId: ctx.state.user.userId },
        })

        expect(Task.destroy).toHaveBeenCalledWith({
            where: { userId: ctx.state.user.userId },
        })

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: 'All tasks: 2 for userId: 111 have been deleted',
        })
    })

    it('deleteTasks: should throw NOT_FOUNDS if tasks not found', async () => {
        mockedTaskFindAll.mockResolvedValue([])

        await deleteTasks(ctx)

        expect(ctx.status).toBe(STATUS_CODES.NOT_FOUNDS)
        expect(ctx.body).toEqual({
            message: 'deleteTasks failed',
            error: 'Tasks not found',
        })
    })
})
