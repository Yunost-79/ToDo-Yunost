import Router from 'koa-router'
import refresh from './refreshRouter'
import tasks from './taskRouter'
import users from './userRouter'

export const routers = new Router()

routers.use(users.routes(), users.allowedMethods())
routers.use(tasks.routes(), tasks.allowedMethods())
routers.use(refresh.routes(), refresh.allowedMethods())

export default routers
