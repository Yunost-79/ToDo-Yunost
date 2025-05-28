import { DataTypes } from 'sequelize'
import { sequelize } from '../db'
import { FILTER_STATUS } from '../vars/tasksVars'

export const Task = sequelize.define(
    'Task',
    {
        taskId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: FILTER_STATUS.ACTIVE,
        },
    },
    {
        tableName: 'tasks',
        timestamps: true,
    },
)
