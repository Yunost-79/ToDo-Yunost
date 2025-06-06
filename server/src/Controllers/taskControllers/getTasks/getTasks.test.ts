import { Task } from '../../../Models/TaskModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { TestContext } from '../../../vars/testTypes'
import getTasks from './getTasks'

jest.mock('node-color-log', () => ({
    color: jest.fn().mockReturnThis(),
    log: jest.fn(),
}))

jest.mock('../../../Models/TaskModel', () => ({
    Task: {
        findAll: jest.fn(),
    },
}))

describe('getTasks', () => {
    let ctx: TestContext

    const mockedTaskFindAll = Task.findAll as jest.Mock

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

    it('getTasks: should get all tasks and return status 200', async () => {
        const mockData = [
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
        ]

        mockedTaskFindAll.mockReturnValue(mockData)

        await getTasks(ctx)

        expect(Task.findAll).toHaveBeenCalledWith({
            where: {
                userId: ctx.state.user.userId,
            },
        })

        expect(ctx.status).toBe(STATUS_CODES.OK)
        expect(ctx.body).toEqual({
            message: `Tasks received: ${mockData.length} for userId: ${ctx.state.user.userId}`,
            count: mockData.length,
            tasks: mockData,
        })
    })
})
