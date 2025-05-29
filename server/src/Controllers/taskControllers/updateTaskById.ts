import { Context } from 'koa'
import logger from 'node-color-log'
import { Task } from '../../Models/TaskModel'
import { STATUS_CODES } from '../../vars/statusCodesVars'
import { FILTER_STATUS, FilterStatus } from '../../vars/tasksVars'

type UpdateTaskReqBody = {
    value?: string
    status?: FilterStatus
}

const updateTaskById = async (ctx: Context) => {
    try {
        const { id: taskId } = ctx.params as { id: number }
        const { value, status } = ctx.request.body as UpdateTaskReqBody

        const { userId } = ctx.state.user as { userId: number }

        if (!taskId) ctx.throw(STATUS_CODES.BAD_REQUEST, 'Invalid or empty task id in params')

        if (value === undefined && status === undefined)
            ctx.throw(STATUS_CODES.BAD_REQUEST, 'No fields for update')
        // if (!value || value.trim() === '')
        //     ctx.throw(STATUS_CODES.BAD_REQUEST, 'Invalid or empty task value')

        if (status && !Object.values(FILTER_STATUS).includes(status))
            ctx.throw(
                STATUS_CODES.BAD_REQUEST,
                `Status must have one of these values: ${Object.values(FILTER_STATUS).join('; ')}`,
            )

        const task = await Task.findOne({
            where: {
                taskId,
                userId,
            },
        })

        if (!task) ctx.throw(STATUS_CODES.NOT_FOUNDS, `Task with this id: ${taskId} not found`)

        const updateData: Partial<{ value: string; status: FilterStatus }> = {}

        if (typeof value === 'string') {
            const trimmed = value.trim()
            if (trimmed === '') {
                ctx.throw(STATUS_CODES.BAD_REQUEST, 'Value cannot be an empty string')
            }
            updateData.value = trimmed
        }

        if (status !== undefined) {
            updateData.status = status
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
