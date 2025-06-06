import { Task } from '../../../Models/TaskModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { TestContext } from '../../../vars/testTypes'
import createTask from './createTask'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/TaskModel', () => ({
    Task: {
        create: jest.fn(),
    },
}))

describe('createTask', () => {
    let ctx: TestContext

    const mockedTaskCreate = Task.create as jest.Mock

    beforeEach(() => {
        ctx = {
            request: {
                body: {
                    value: 'New task text',
                },
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

    it('createTask: should create task and return status 201', async () => {
        const mockData = { value: 'New task text', userId: 111 }
        mockedTaskCreate.mockResolvedValue(mockData)

        await createTask(ctx)

        expect(Task.create).toHaveBeenCalledWith(mockData)
        expect(ctx.status).toBe(STATUS_CODES.CREATED)
        expect(ctx.body).toEqual({
            message: 'Task created',
            task: mockData,
        })
    })

    it('createTask: should throw BAD_REQUEST if value is empty', async () => {
        ctx.request.body.value = ' '

        await createTask(ctx)

        expect(ctx.status).toBe(STATUS_CODES.BAD_REQUEST)
        expect(ctx.body).toEqual({
            message: 'Create task failed',
            error: 'Invalid or empty task value',
        })
    })
})
