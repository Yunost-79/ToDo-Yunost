import cors from '@koa/cors'
import dotenv from 'dotenv'
import Koa, { DefaultContext, DefaultState } from 'koa'
import bodyParser from 'koa-bodyparser'
import KoaLogger from 'koa-logger'
import Router from 'koa-router'
import logger from 'node-color-log'
import routers from './Routers/routers'
import { sequelize } from './db'

const runKoa = () => {
    const app: Koa<DefaultState, DefaultContext> = new Koa()
    const router = new Router()

    app.use(cors())
    app.use(bodyParser())
    app.use(KoaLogger())

    app.use(routers.routes())
    app.use(routers.allowedMethods())

    return app
}

const runServer = async () => {
    dotenv.config()
    const PORT = process.env.PORT || 4000

    const app = runKoa()

    try {
        await sequelize.sync()
        logger.color('green').reverse().log('DB connected! --__--')
        app.listen(PORT, () => {
            logger.color('green').reverse().log(`Server is running on ${PORT} port`)
        })
    } catch (e) {
        const err = e as Error
        logger.color('red').reverse().log('Error with DB connection: ', err)
    }
}

runServer()
