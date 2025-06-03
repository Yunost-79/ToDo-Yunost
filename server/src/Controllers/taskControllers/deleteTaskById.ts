import { Context } from 'koa'
import logger from 'node-color-log'
import { Task } from '../../Models/TaskModel'
import { STATUS_CODES } from '../../vars/statusCodesVars'

const deleteTaskById = async (ctx: Context) => {
    try {
        const { id: taskId } = ctx.params as { id: string }

        const { userId } = ctx.state.user as { userId: number }

        if (!taskId) ctx.throw(STATUS_CODES.BAD_REQUEST, 'Invalid or empty task id in params')

        const task = await Task.findOne({
            where: {
                taskId,
                userId,
            },
        })

        if (!task) ctx.throw(STATUS_CODES.NOT_FOUNDS, `Task with this id: ${taskId} not found`)

        await Task.destroy({
            where: {
                taskId,
                userId,
            },
        })

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: `Task with taskId ${taskId} for userId: ${userId} have been deleted`,
        }

        logger.color('yellow').log('Task has been deleted')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'Delete task by id failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default deleteTaskById
