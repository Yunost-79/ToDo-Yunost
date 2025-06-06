import { TestContext } from '../../../vars/testTypes'
import { Task } from '../../../Models/TaskModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import deleteTaskById from './deleteTaskById'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/TaskModel', () => ({
    Task: {
        findOne: jest.fn(),
        destroy: jest.fn(),
    },
}))

describe('deleteTaskById', () => {
    let ctx: TestContext

    const mockedTaskFindOne = Task.findOne as jest.Mock
    const mockedTaskDestroy = Task.destroy as jest.Mock

    beforeEach(() => {
        ctx = {
            params: { id: '123' },
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

    it('deleteTaskById: should delete task and return status 200', async () => {
        const whereTask = { taskId: '123', userId: 111 }

        mockedTaskFindOne.mockResolvedValue({ taskId: '123' })
        mockedTaskDestroy.mockResolvedValue(1)

        await deleteTaskById(ctx)

        expect(Task.findOne).toHaveBeenCalledWith({
            where: {
                taskId: ctx.params.id,
                userId: ctx.state.user.userId,
            },
        })

        expect(Task.destroy).toHaveBeenCalledWith({
            where: whereTask,
        })

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: 'Task with taskId 123 for userId: 111 have been deleted',
        })
    })

    it('deleteTaskById: should throw BAD_REQUEST if taskId is empty in params', async () => {
        ctx.params.id = undefined

        await deleteTaskById(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'deleteTaskById failed',
            error: 'Invalid or empty task id in params',
        })
    })

    it('deleteTaskById: should throw NOT_FOUNDS if task with id not found', async () => {
        mockedTaskFindOne.mockResolvedValue(null)

        await deleteTaskById(ctx)

        expect(ctx.status).toBe(STATUS_CODES.NOT_FOUNDS)
        expect(ctx.body).toEqual({
            message: 'deleteTaskById failed',
            error: 'Task with this id: 123 not found',
        })
    })
})
