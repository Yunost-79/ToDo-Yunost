import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import KoaLogger from 'koa-logger'
import routers from './Routers/routers'

export const app = new Koa()

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
)
app.use(bodyParser())
app.use(KoaLogger())
app.use(routers.routes())
app.use(routers.allowedMethods())
