import express, { json } from 'express'
import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import { authDB, syncDB } from './configs/db.js'
import './models/index.js'
import { seedDB } from './configs/seedDb.js'
import { eventRouter, userRouter, baseRouter, authRouter, publicRouter, authenticateJWT } from './routes/routes.js'
import { specs, swaggerUi } from './configs/swagger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import passport from './configs/passport.js'

const app = express()
const port = process.env.APP_PORT

// Сброс базы данных при запуске
const RESET_DB = true

// Логирование
app.use(morgan('[:method] :url'))

// Настройка JSON и CORS
app.use(json())
app.use(cors())

// Инициализация Passport
app.use(passport.initialize())

// Документация API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// Публичные маршруты 
app.use('/', publicRouter)
app.use('/auth', authRouter)

// Требующие аутентификации маршруты
app.use('/events', authenticateJWT, eventRouter)
app.use('/users', authenticateJWT, userRouter)
app.use('/', baseRouter)

// Глобальный обработчик ошибок
app.use(errorHandler)

async function startServer() {
	try {
		await authDB()
		await syncDB(RESET_DB)
		
		if (RESET_DB) {
			await seedDB()
		}

		app.listen(port, () =>
			console.debug(`Сервер запущен на порту http://localhost:${port}`)
		)
	} catch (error) {
		console.error(`Ошибка при старте сервера: ${error}`)
		process.exit(1) // Завершение процесса с кодом ошибки
	}
}

startServer()
