import { Context } from 'koa'
import logger from 'node-color-log'
import { Task } from '../../Models/TaskModel'
import { STATUS_CODES } from '../../vars/statusCodesVars'

const getTaskById = async (ctx: Context) => {
    try {
        const { id: taskId } = ctx.params as { id: number }

        if (!taskId) ctx.throw(STATUS_CODES.BAD_REQUEST, 'Invalid or empty task id in params')

        const { userId } = ctx.state.user as { userId: number }

        const task = await Task.findOne({
            where: {
                taskId,
                userId,
            },
        })

        if (!task) ctx.throw(STATUS_CODES.NOT_FOUNDS, `Task with this id: ${taskId} not found`)

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: `Task with id: ${taskId} for userId: ${userId}`,
            userId,
            taskId,
            task,
        }

        logger.color('yellow').log('Task has been received')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'Get task by id failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default getTaskById
