import { Context } from 'koa'
import logger from 'node-color-log'
import { Task } from '../../../Models/TaskModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'
import { FilterStatus } from '../../../vars/tasksVars'

const getTaskByFilterStatus = async (ctx: Context) => {
    try {
        const { status } = ctx.params as { status: FilterStatus }

        if (!status) ctx.throw(STATUS_CODES.BAD_REQUEST, 'Invalid or empty filter status in params')

        const { userId } = ctx.state.user as { userId: number }

        const filteredTasks = await Task.findAll({
            where: {
                userId,
                status,
            },
        })

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: `Tasks with filter status: ${status}`,
            count: filteredTasks.length,
            tasks: filteredTasks,
        }

        logger.color('yellow').log(`Get tasks with ${status} status`)
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'getTaskByFilterStatus failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default getTaskByFilterStatus
