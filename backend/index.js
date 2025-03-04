import express, { json } from 'express'
import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import { authDB, syncDB, resetDB } from './config/db.js'
import { eventsRouter, usersRouter, baseRouter } from './api/routes.js'
import { specs, swaggerUi } from './docs/swagger.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const port = process.env.APP_PORT

// Логирование
app.use(morgan('[:method] :url'))

// Настройка JSON и CORS
app.use(json())
app.use(cors())

// Документация API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// Маршруты
app.use('/events', eventsRouter)
app.use('/users', usersRouter)
app.use('/', baseRouter)

// Глобальный обработчик ошибок
app.use(errorHandler)

async function startServer() {
	try {
		await authDB()
		await syncDB()
		// await resetDB() // Стереть все данные БД

		app.listen(port, () => console.debug(`Сервер запущен на порту ${port}`))
	} catch (error) {
		console.error(`Ошибка при старте сервера: ${error}`)
		process.exit(1) // Завершение процесса с кодом ошибки
	}
}

startServer()
