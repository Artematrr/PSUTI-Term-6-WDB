import { Router } from 'express'
import { Events, Users } from '../config/db.js'
import { Op } from 'sequelize'
import {
	createValidationError,
	createNotFoundError,
	createServerError,
	catchAsync,
} from '../middleware/errorHandler.js'

const eventsRouter = Router()
const usersRouter = Router()
const baseRouter = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - createdBy
 *       properties:
 *         id:
 *           type: integer
 *           description: ID события
 *         title:
 *           type: string
 *           description: Название события
 *         description:
 *           type: string
 *           description: Описание события
 *         date:
 *           type: string
 *           format: date
 *           description: Дата события
 *         createdBy:
 *           type: integer
 *           description: ID создателя события
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID пользователя
 *         name:
 *           type: string
 *           description: Имя пользователя
 *         email:
 *           type: string
 *           description: Email пользователя
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Получить список мероприятий
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Начальная дата для фильтрации
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Конечная дата для фильтрации
 *     responses:
 *       200:
 *         description: Список мероприятий
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 */
eventsRouter.get(
	'/',
	catchAsync(async (req, res, next) => {
		const startDate = req.query.startDate
		const endDate = req.query.endDate

		let events

		try {
			// Фильтр по датам, если они указаны
			if (startDate && endDate) {
				events = await Events.findAll({
					where: { date: { [Op.between]: [startDate, endDate] } },
				})
			} else if (startDate && !endDate) {
				events = await Events.findAll({
					where: { date: { [Op.gte]: startDate } },
				})
			} else if (!startDate && endDate) {
				events = await Events.findAll({
					where: { date: { [Op.lte]: endDate } },
				})
			} else {
				events = await Events.findAll()
			}

			res.status(200).json({
				status: 'success',
				data: events,
			})
		} catch (error) {
			next(createServerError('Ошибка при получении списка мероприятий', error))
		}
	})
)

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Получить мероприятие по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID мероприятия
 *     responses:
 *       200:
 *         description: Мероприятие найдено
 *       404:
 *         description: Мероприятие не найдено
 */
eventsRouter.get(
	'/:id',
	catchAsync(async (req, res, next) => {
		const id = req.params.id

		try {
			const event = await Events.findByPk(id)

			if (!event) {
				next(createNotFoundError(`Мероприятие с ID ${id} не найдено`))
			}

			res.status(200).json({
				status: 'success',
				data: event,
			})
		} catch (error) {
			next(
				createServerError(`Ошибка при получении мероприятия с ID ${id}`, error)
			)
		}
	})
)

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Создать новое мероприятие
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Мероприятие создано
 *       400:
 *         description: Неверные данные
 */
eventsRouter.post(
	'/',
	catchAsync(async (req, res, next) => {
		const { title, description, date, createdBy } = req.body

		if (!title) {
			next(createValidationError('Необходимо указать название мероприятия'))
		}
		if (!createdBy) {
			next(createValidationError('Необходимо указать создателя мероприятия'))
		}

		try {
			const event = await Events.create({ title, description, date, createdBy })

			res.status(201).json({
				status: 'success',
				message: 'Мероприятие успешно создано',
				data: event,
			})
		} catch (error) {
			next(createServerError('Ошибка при создании мероприятия', error))
		}
	})
)

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Обновить мероприятие
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Мероприятие обновлено
 *       404:
 *         description: Мероприятие не найдено
 */
eventsRouter.put(
	'/:id',
	catchAsync(async (req, res, next) => {
		const id = req.params.id
		const { title, description, date, createdBy } = req.body

		try {
			const event = await Events.findByPk(id)

			if (!event) {
				next(createNotFoundError(`Мероприятие с ID ${id} не найдено`))
			}

			const oldEvent = { ...event.toJSON() }
			await event.update({ title, description, date, createdBy })

			res.status(200).json({
				status: 'success',
				message: 'Мероприятие успешно обновлено',
				data: {
					current: event,
					previous: oldEvent,
				},
			})
		} catch (error) {
			next(
				createServerError(`Ошибка при обновлении мероприятия с ID ${id}`, error)
			)
		}
	})
)

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Удалить мероприятие
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Мероприятие удалено
 *       404:
 *         description: Мероприятие не найдено
 */
eventsRouter.delete(
	'/:id',
	catchAsync(async (req, res, next) => {
		const id = req.params.id

		try {
			const event = await Events.findByPk(id)

			if (!event) {
				next(createNotFoundError(`Мероприятие с ID ${id} не найдено`))
			}

			await event.destroy()

			res.status(200).json({
				status: 'success',
				message: 'Мероприятие успешно удалено',
			})
		} catch (error) {
			next(
				createServerError(`Ошибка при удалении мероприятия с ID ${id}`, error)
			)
		}
	})
)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить список пользователей
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
usersRouter.get(
	'/',
	catchAsync(async (req, res, next) => {
		try {
			const users = await Users.findAll()

			res.status(200).json({
				status: 'success',
				data: users,
			})
		} catch (error) {
			next(
				createServerError('Ошибка при получении списка пользователей', error)
			)
		}
	})
)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать нового пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Пользователь создан
 *       400:
 *         description: Неверные данные или пользователь уже существует
 */
usersRouter.post(
	'/',
	catchAsync(async (req, res, next) => {
		const { name, email } = req.body

		if (!name) {
			next(createValidationError('Необходимо указать имя пользователя'))
		}

		if (!email) {
			next(createValidationError('Необходимо указать email пользователя'))
		}

		try {
			const existingUser = await Users.findOne({ where: { email } })

			if (existingUser) {
				next(
					createValidationError(`Пользователь с email ${email} уже существует`)
				)
			}

			const user = await Users.create({ name, email })

			res.status(201).json({
				status: 'success',
				message: 'Пользователь успешно создан',
				data: user,
			})
		} catch (error) {
			next(createServerError('Ошибка при создании пользователя', error))
		}
	})
)

baseRouter.get('/', (req, res) => {
	res.json({ status: 'success', message: 'Домашняя страница' })
})

baseRouter.all('*', (req, res, next) => {
	next(createNotFoundError(`Несуществующий маршрут ${req.originalUrl}`))
})

export { eventsRouter, usersRouter, baseRouter }
