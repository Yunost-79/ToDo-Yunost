import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const { DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } = process.env

if (!DB_USERNAME || !DB_PASSWORD || !DB_PORT || !DB_NAME) {
    throw new Error('Error with dotenv in db')
}

export const sequelize = new Sequelize(DB_NAME || '', DB_USERNAME || '', DB_PASSWORD || '', {
    host: 'localhost',
    dialect: 'postgres',
    port: parseInt(DB_PORT || '5432', 10),
    logging: false,
})
