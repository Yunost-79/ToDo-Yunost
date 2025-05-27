import Router from 'koa-router'

const router = new Router({
    prefix: '/tasks',
})

// router.post('/')
router.get('/', (ctx) => {
    ctx.body = {
        message: '/get get all tasks',
    }
})
// router.get('/:id')
// router.delete('/')
// router.delete('/:id')
// router.put('/task/update')

// router.post('/register')
// router.post('/login')

export default router
