import { sequelize } from '../configs/db.js'
import { Sequelize } from 'sequelize'

const User = sequelize.define(
	'user',
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		role: {
			type: Sequelize.ENUM('user', 'admin'),
			allowNull: false,
			defaultValue: 'user',
		},
	},
	{
		freezeTableName: true,
	}
)

export default User
