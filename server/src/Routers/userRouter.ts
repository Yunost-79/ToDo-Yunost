import Router from 'koa-router'
import getUserData from '../Controllers/userControllers/getUserData/getUserData'
import login from '../Controllers/userControllers/login/login'
import logout from '../Controllers/userControllers/logout/logout'
import registration from '../Controllers/userControllers/registration/registration'
import authMiddleware from '../Middlewares/authMiddleware/authMiddleware'

const router = new Router({
    prefix: '/users',
})

router.post('/register', registration)
router.post('/login', login)
router.post('/logout', logout)

router.get('/', authMiddleware, getUserData)

export default router
