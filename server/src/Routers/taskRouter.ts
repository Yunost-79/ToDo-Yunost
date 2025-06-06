import Router from 'koa-router'
import createTask from '../Controllers/taskControllers/createTask/createTask'
import deleteTaskById from '../Controllers/taskControllers/deleteTaskById/deleteTaskById'
import deleteTasks from '../Controllers/taskControllers/deleteTasks/deleteTasks'
import getTaskByFilterStatus from '../Controllers/taskControllers/getTaskByFilterStatus/getTaskByFilterStatus'
import getTaskById from '../Controllers/taskControllers/getTaskById/getTaskById'
import getTasks from '../Controllers/taskControllers/getTasks/getTasks'
import getTasksWithOffset from '../Controllers/taskControllers/getTasksWithOffset/getTasksWithOffset'
import updateTaskById from '../Controllers/taskControllers/updateTaskById/updateTaskById'
import authMiddleware from '../Middlewares/authMiddleware/authMiddleware'

const router = new Router({
    prefix: '/tasks',
})

router.use(authMiddleware)

router.post('/', createTask)

router.get('/', getTasks)
router.get('/paginated', getTasksWithOffset)
router.get('/:id', getTaskById)

router.get('/filter/:status', getTaskByFilterStatus)

router.delete('/remove', deleteTasks)
router.delete('/remove/:id', deleteTaskById)

router.put('/:id', updateTaskById)

export default router
