import { Context } from 'koa'
import logger from 'node-color-log'
import { Task } from '../../Models/TaskModel'
import { STATUS_CODES } from '../../vars/statusCodesVars'

type CreateTaskReqBody = {
    value: string
    userId: number
}

const createTask = async (ctx: Context) => {
    try {
        const { value } = ctx.request.body as CreateTaskReqBody

        if (!value || value.trim() === '')
            ctx.throw(STATUS_CODES.BAD_REQUEST, 'Invalid or empty task value')

        const { userId } = ctx.state.user as { userId: number }

        const task = await Task.create({ userId, value })

        ctx.status = STATUS_CODES.CREATED
        ctx.body = {
            message: 'Task created',
            task,
        }

        logger.color('yellow').log('Task created')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'Create task failed',
            error: e.message,
        }
    }
}

export default createTask
