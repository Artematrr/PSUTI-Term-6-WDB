import { Router } from 'express'
import { createNotFoundError } from '../throws/index.js'

const baseRouter = Router()

baseRouter.get('/', (req, res) => {
	res.json({ status: 'success', message: 'Домашняя страница' })
})

baseRouter.all('*', (req, res, next) => {
	next(createNotFoundError(`Несуществующий маршрут ${req.originalUrl}`))
})

export default baseRouter
