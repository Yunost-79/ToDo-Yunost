import { Context } from 'koa'
import logger from 'node-color-log'
import { Task } from '../../../Models/TaskModel'
import { STATUS_CODES } from '../../../vars/statusCodesVars'

const deleteTasks = async (ctx: Context) => {
    try {
        const { userId } = ctx.state.user as { userId: number }

        const tasks = await Task.findAll({ where: { userId } })

        if (tasks.length === 0) ctx.throw(STATUS_CODES.NOT_FOUNDS, 'Tasks not found')

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
            message: 'deleteTasks failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default deleteTasks
