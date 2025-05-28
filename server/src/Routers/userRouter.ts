import Router from 'koa-router'
import login from '../Controllers/userControllers/login'
import logout from '../Controllers/userControllers/logout'
import registration from '../Controllers/userControllers/registration'

const router = new Router({
    prefix: '/users',
})

router.post('/register', registration)
router.post('/login', login)
router.post('/logout', logout)

export default router
