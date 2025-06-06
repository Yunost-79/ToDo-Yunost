import request from 'supertest'
import { app } from './app'

describe('Koa app', () => {
    it('should respond 404 on unknown route', async () => {
        const res = await request(app.callback()).get('/unknown')
        expect(res.status).toBe(404)
    })

    it('should respond 404 on root route', async () => {
        const res = await request(app.callback()).get('/')
        expect(res.status).toBe(404)
    })
})
