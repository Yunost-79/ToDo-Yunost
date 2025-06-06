import dotenv from 'dotenv'
import logger from 'node-color-log'
import { app } from './app'
import { sequelize } from './db'

dotenv.config()

const PORT = process.env.PORT || 4000

const runServer = async () => {
    try {
        await sequelize.sync({ alter: true })
        logger.color('green').reverse().log('DB connected! --__--')
        app.listen(PORT, () => {
            logger.color('green').reverse().log(`Server is running on ${PORT} port`)
        })
    } catch (e) {
        const err = e as Error
        logger.color('red').reverse().log('Error with DB connection: ', err)
    }
}

if (require.main === module) {
    runServer()
}
