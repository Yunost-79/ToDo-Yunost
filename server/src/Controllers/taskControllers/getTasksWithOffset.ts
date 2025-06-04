import { Context } from 'koa'
import logger from 'node-color-log'
import { Task } from '../../Models/TaskModel'
import { STATUS_CODES } from '../../vars/statusCodesVars'

const getTasksWithOffset = async (ctx: Context) => {
    try {
        const { offset, status } = ctx.query as {
            offset: string
            status: 'all' | 'active' | 'completed'
        }
        const { userId } = ctx.state.user as { userId: number }

        const numberOffset = parseInt(offset) || 0
        const limit = 15

        const whereRule = {
            userId,
            ...(status !== 'all' ? { status } : {}),
        }

        const tasks = await Task.findAll({
            where: whereRule,
            limit,
            offset: numberOffset,
            order: [['createdAt', 'DESC']],
        })

        const totalCount = await Task.count({ where: whereRule })

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: `Tasks received`,
            count: totalCount,
            isEnd: tasks.length < limit,
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

export default getTasksWithOffset
