import Router from 'koa-router'
import tasks from './taskRouter'
import users from './userRouter'

export const routers = new Router()

routers.use(users.routes(), users.allowedMethods())
routers.use(tasks.routes(), tasks.allowedMethods())

export default routers
