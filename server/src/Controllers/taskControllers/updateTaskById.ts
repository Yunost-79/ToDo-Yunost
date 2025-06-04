import { Context } from 'koa'
import logger from 'node-color-log'
import { Task } from '../../Models/TaskModel'
import { STATUS_CODES } from '../../vars/statusCodesVars'
import { FILTER_STATUS, FilterStatus } from '../../vars/tasksVars'

type Updates = {
    value?: string
    status?: 'active' | 'completed'
}

const updateTaskById = async (ctx: Context) => {
    try {
        const { id } = ctx.params as { id: string }
        const taskId = parseInt(id)
        const { updates } = ctx.request.body as { updates: Updates }

        const { userId } = ctx.state.user as { userId: number }

        if (!taskId) ctx.throw(STATUS_CODES.BAD_REQUEST, 'Invalid or empty task id in params')

        if (!updates || (updates.value === undefined && updates.status === undefined)) {
            ctx.throw(STATUS_CODES.BAD_REQUEST, 'No update fields provided')
        }

        const task = await Task.findOne({
            where: {
                taskId,
                userId,
            },
        })

        if (!task) ctx.throw(STATUS_CODES.NOT_FOUNDS, `Task with this id: ${taskId} not found`)

        const updateData: Partial<{ value: string; status: FilterStatus }> = {}

        if (typeof updates.value === 'string') {
            const trimmedValue = updates.value.trim()
            if (trimmedValue === '') ctx.throw(STATUS_CODES.BAD_REQUEST, 'Value cannot be empty')

            updateData.value = trimmedValue
        }

        if (updates.status !== undefined) {
            if (!Object.values(FILTER_STATUS).includes(updates.status)) {
                ctx.throw(
                    STATUS_CODES.BAD_REQUEST,
                    `Status must be one of: ${Object.values(FILTER_STATUS).join(', ')}`,
                )
            }
            updateData.status = updates.status
        }

        await Task.update(updateData, {
            where: {
                taskId,
                userId,
            },
        })

        const updatedTask = await Task.findOne({
            where: {
                taskId,
                userId,
            },
        })

        ctx.status = STATUS_CODES.OK
        ctx.body = {
            message: `Task with taskId: ${taskId} updated`,
            task: updatedTask,
        }

        logger.color('yellow').log('Task has been updated')
    } catch (e: any) {
        const errStatus = e.status || STATUS_CODES.INTERNAL_SERVER_ERROR

        ctx.status = errStatus
        ctx.body = {
            message: 'Update task failed',
            error: e.message,
        }
        logger.color('red').log(e.message)
    }
}

export default updateTaskById
