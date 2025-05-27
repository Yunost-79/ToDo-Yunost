import { DataTypes } from 'sequelize'
import { FILTER_STATUS } from '../vars/tasksVars'
import { sequelize } from '../db'

export const Task = sequelize.define(
    'Task',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isEdit: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: FILTER_STATUS.ALL,
        },
    },
    {
        tableName: 'tasks',
        timestamps: true,
    },
)
