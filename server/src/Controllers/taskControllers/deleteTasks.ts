import { Context } from 'koa'
import { Task } from '../../Models/TaskModel'
import { STATUS_CODES } from '../../vars/statusCodesVars'
import logger from 'node-color-log'

const deleteTasks = async (ctx: Context) => {
    try {
        const { userId } = ctx.state.user as { userId: number }

        const destroyedTasksCount = await Task.destroy({
            where: {
                userId,
            },
        })

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: `All tasks: ${destroyedTasksCount} for userId: ${userId} have been deleted`,
        }

        logger.color('yellow').log('Tasks have been delete')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'Delete tasks failed',
            error: e.message,
        }
    }
}

export default deleteTasks
