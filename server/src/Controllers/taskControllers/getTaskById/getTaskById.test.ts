import { Task } from '../../../Models/TaskModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { TestContext } from '../../../vars/testTypes'
import getTaskById from './getTaskById'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/TaskModel', () => ({
    Task: {
        findOne: jest.fn(),
    },
}))

describe('deleteTaskById', () => {
    let ctx: TestContext

    const mockedTaskFindOne = Task.findOne as jest.Mock

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

    it('getTaskById: should get task by id and return status 200', async () => {
        mockedTaskFindOne.mockResolvedValue({
            taskId: '123',
            userId: 111,
            value: 'testValue',
            status: 'active',
            createAt: '2025-06-04 13:33:56.916 +0300',
            updatedAt: '2025-06-04 13:33:56.916 +0300',
        })

        await getTaskById(ctx)

        expect(Task.findOne).toHaveBeenCalledWith({
            where: {
                taskId: ctx.params.id,
                userId: ctx.state.user.userId,
            },
        })

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: 'Task with id: 123 for userId: 111',
            task: {
                taskId: '123',
                userId: 111,
                value: 'testValue',
                status: 'active',
                createAt: '2025-06-04 13:33:56.916 +0300',
                updatedAt: '2025-06-04 13:33:56.916 +0300',
            },
            taskId: ctx.params.id,
            userId: ctx.state.user.userId,
        })
    })

    it('getTaskById: should throw BAD_REQUEST if taskId is empty in params', async () => {
        ctx.params.id = undefined

        await getTaskById(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'getTaskById failed',
            error: 'Invalid or empty task id in params',
        })
    })

    it('getTaskById: should throw BAD_REQUEST if taskId is empty in params', async () => {
        mockedTaskFindOne.mockReturnValue(null)

        await getTaskById(ctx)

        expect(ctx.status).toBe(STATUS_CODES.NOT_FOUNDS)
        expect(ctx.body).toEqual({
            message: 'getTaskById failed',
            error: `Task with this id: ${ctx.params.id} not found`,
        })
    })
})
