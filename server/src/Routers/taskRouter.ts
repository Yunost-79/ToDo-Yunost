import Router from 'koa-router'
import createTask from '../Controllers/taskControllers/createTask'
import deleteTaskById from '../Controllers/taskControllers/deleteTaskById'
import deleteTasks from '../Controllers/taskControllers/deleteTasks'
import getTaskByFilterStatus from '../Controllers/taskControllers/getTaskByFilterStatus'
import getTaskById from '../Controllers/taskControllers/getTaskById'
import getTasks from '../Controllers/taskControllers/getTasks'
import updateTaskById from '../Controllers/taskControllers/updateTaskById'
import authMiddleware from '../Middlewares/authMiddleware'

const router = new Router({
    prefix: '/tasks',
})

router.use(authMiddleware)

router.post('/', createTask)

router.get('/', getTasks)
router.get('/:id', getTaskById)

router.get('/filter/:status', getTaskByFilterStatus)

router.delete('/', deleteTasks)
router.delete('/:id', deleteTaskById)

router.put('/:id', updateTaskById)

export default router
