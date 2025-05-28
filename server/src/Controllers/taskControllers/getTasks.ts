import { Context } from 'koa'
import logger from 'node-color-log'
import { Task } from '../../Models/TaskModel'
import { STATUS_CODES } from '../../vars/statusCodesVars'

const getTasks = async (ctx: Context) => {
    try {
        const { userId } = ctx.state.user as { userId: number }

        const tasks = await Task.findAll({
            where: {
                userId,
            },
        })

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: `Tasks received: ${tasks.length} for userId: ${userId}`,
            count: tasks.length,
            tasks,
        }

        logger.color('yellow').log('Tasks have been received')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'Get tasks failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default getTasks
