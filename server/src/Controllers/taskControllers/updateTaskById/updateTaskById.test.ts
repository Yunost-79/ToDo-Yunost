import { Task } from '../../../Models/TaskModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { FILTER_STATUS } from '../../../vars/tasksVars'
import { TestContext } from '../../../vars/testTypes'
import updateTaskById from './updateTaskById'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/TaskModel', () => ({
    Task: {
        findOne: jest.fn(),
        update: jest.fn(),
    },
}))

describe('updateTaskById', () => {
    let ctx: TestContext

    const mockedTaskFindOne = Task.findOne as jest.Mock
    const mockedTaskUpdate = Task.update as jest.Mock

    beforeEach(() => {
        ctx = {
            request: {
                body: {
                    updates: {},
                },
            },
            params: {
                id: '123',
            },
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

    it('updateTaskById: should update task value and return status 200', async () => {
        ctx.request.body.updates.value = 'new test string'

        const existingTask = {
            taskId: ctx.params.id,
            userId: ctx.state.user.userId,
            value: 'old test string',
            status: 'active',
        }

        const updatedTask = {
            ...existingTask,
            value: ctx.request.body.updates.value,
        }

        mockedTaskFindOne.mockResolvedValueOnce(existingTask)

        mockedTaskUpdate.mockResolvedValue([-1])
        mockedTaskFindOne.mockResolvedValueOnce(updatedTask)

        await updateTaskById(ctx)

        expect(Task.findOne).toHaveBeenCalledWith({
            where: {
                taskId: ctx.params.id,
                userId: ctx.state.user.userId,
            },
        })

        expect(Task.update).toHaveBeenCalledWith(
            {
                value: ctx.request.body.updates.value,
            },
            {
                where: {
                    taskId: ctx.params.id,
                    userId: ctx.state.user.userId,
                },
            },
        )

        expect(Task.findOne).toHaveBeenCalledWith({
            where: {
                taskId: ctx.params.id,
                userId: ctx.state.user.userId,
            },
        })

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: `Task with taskId: ${ctx.params.id} updated`,
            task: updatedTask,
        })
    })

    it('updateTaskById: should update task status and return status 200', async () => {
        ctx.request.body.updates.status = 'completed'

        const existingTask = {
            taskId: ctx.params.id,
            userId: ctx.state.user.userId,
            value: 'old test string',
            status: 'active',
        }

        const updatedTask = {
            ...existingTask,
            status: ctx.request.body.updates.status,
        }

        mockedTaskFindOne.mockResolvedValueOnce(existingTask)

        mockedTaskUpdate.mockResolvedValue([-1])
        mockedTaskFindOne.mockResolvedValueOnce(updatedTask)

        await updateTaskById(ctx)

        expect(Task.findOne).toHaveBeenCalledWith({
            where: {
                taskId: ctx.params.id,
                userId: ctx.state.user.userId,
            },
        })

        expect(Task.update).toHaveBeenCalledWith(
            {
                status: ctx.request.body.updates.status,
            },
            {
                where: {
                    taskId: ctx.params.id,
                    userId: ctx.state.user.userId,
                },
            },
        )

        expect(Task.findOne).toHaveBeenCalledWith({
            where: {
                taskId: ctx.params.id,
                userId: ctx.state.user.userId,
            },
        })

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: `Task with taskId: ${ctx.params.id} updated`,
            task: updatedTask,
        })
    })

    it('updateTaskById: should throw BAD_REQUEST if taskId is empty in params', async () => {
        ctx.params.id = undefined

        await updateTaskById(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'updateTaskById failed',
            error: 'Invalid or empty task id in params',
        })
    })

    it('updateTaskById: should throw BAD_REQUEST if empty fields for provided', async () => {
        ctx.request.body.updates = {}

        await updateTaskById(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'updateTaskById failed',
            error: 'No update fields provided',
        })
    })

    it('updateTaskById: should throw NOT_FOUNDS if task with id not found with value for update', async () => {
        ctx.request.body.updates.value = 'new test string'

        mockedTaskFindOne.mockResolvedValue(null)

        await updateTaskById(ctx)

        expect(Task.findOne).toHaveBeenCalledWith({
            where: {
                taskId: ctx.params.id,
                userId: ctx.state.user.userId,
            },
        })
        expect(ctx.status).toBe(STATUS_CODES.NOT_FOUNDS)
        expect(ctx.body).toEqual({
            message: 'updateTaskById failed',
            error: `Task with this id: ${ctx.params.id} not found`,
        })
    })

    it('updateTaskById: should throw NOT_FOUNDS if task with id not found with status for update', async () => {
        ctx.request.body.updates.status = 'completed'

        mockedTaskFindOne.mockResolvedValue(null)

        await updateTaskById(ctx)

        expect(Task.findOne).toHaveBeenCalledWith({
            where: {
                taskId: ctx.params.id,
                userId: ctx.state.user.userId,
            },
        })
        expect(ctx.status).toBe(STATUS_CODES.NOT_FOUNDS)
        expect(ctx.body).toEqual({
            message: 'updateTaskById failed',
            error: `Task with this id: ${ctx.params.id} not found`,
        })
    })

    it('updateTaskById: should throw BAD_REQUEST if status not from FILTER_STATUS', async () => {
        ctx.request.body.updates.status = 'invalid-filter-status' as any

        const existingTask = {
            taskId: ctx.params.id,
            userId: ctx.state.user.userId,
            value: 'old test string',
            status: 'active',
        }

        mockedTaskFindOne.mockResolvedValue(existingTask)

        await updateTaskById(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'updateTaskById failed',
            error: `Status must be one of: ${Object.values(FILTER_STATUS).join(', ')}`,
        })
    })
})
