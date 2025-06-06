import Router from 'koa-router'
import refreshToken from '../Controllers/tokenControllers/refreshToken/refreshToken'

const router = new Router({
    prefix: '/refresh',
})

router.post('/', refreshToken)

export default router
