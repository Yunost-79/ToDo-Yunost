import Router from 'koa-router'

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
router.post('/refresh', (ctx) => {
    ctx.body = {
        message: '/post refresh token',
    }
})
export default router
