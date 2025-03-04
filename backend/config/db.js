import { Sequelize } from 'sequelize'
import 'dotenv/config'

const db_name = process.env.DB_NAME
const db_user = process.env.DB_USER
const db_password = process.env.DB_PASSWORD
const db_host = process.env.DB_HOST
const db_port = process.env.DB_PORT

const sequelize = new Sequelize(db_name, db_user, db_password, {
	host: db_host,
	port: db_port,
	dialect: 'postgres',
})

const Events = sequelize.define(
	'event',
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		description: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '',
		},
		date: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
		createdBy: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id',
			},
		},
	},
	{
		// description = title, если он не указан
		hooks: {
			beforeCreate: (event, options) => {
				if (!event.description) {
					event.description = event.title
				}
			},
		},
	}
)

const Users = sequelize.define('users', {
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
	createdAt: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW,
	},
})

Users.hasMany(Events, { foreignKey: 'createdBy' })

const authDB = async () => {
	try {
		await sequelize.authenticate()
		console.debug('Соединение с БД установлено!')
	} catch (error) {
		console.debug(`Соединение с БД не установлено. Ошибка: ${error}`)
	}
}

const resetDB = async () => {
	try {
		await sequelize.sync({ force: true })
		console.debug('Таблицы созданы!')
	} catch (error) {
		console.debug(`Таблицы не созданы. Ошибка: ${error}`)
	}
}

const syncDB = async () => {
	try {
		await sequelize.sync()
		console.debug('Таблицы синхронизированы!')
	} catch (error) {
		console.debug(`Таблицы не синхронизированы. Ошибка: ${error}`)
	}
}

export { sequelize, Events, Users, authDB, syncDB, resetDB }
