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
	logging: false,
})

const authDB = async () => {
	try {
		await sequelize.authenticate()
		console.debug('Соединение с БД установлено!')
	} catch (error) {
		console.error(`Соединение с БД не установлено. Ошибка: ${error}`)
	}
}

const syncDB = async (force = false) => {
	try {
		await sequelize.sync({ force })
		console.debug(`Таблицы синхронизированы! ${force ? '(Со сбросом)' : ''}`)
	} catch (error) {
		console.error(`Таблицы не синхронизированы. Ошибка: ${error}`)
	}
}

export { sequelize, authDB, syncDB }
