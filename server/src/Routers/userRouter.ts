import Router from 'koa-router'
import tokenMiddleware from '../Middlewares/tokenMiddleware'

const router = new Router({
    prefix: '/users',
})

router.post('/register', (ctx) => {
    ctx.body = {
        message: '/post register',
    }
})
router.post('/login', (ctx) => {
    ctx.body = {
        message: '/post login',
    }
})
router.post('/refresh', tokenMiddleware, (ctx) => {
    ctx.body = {
        message: '/post refresh token',
    }
})
export default router
