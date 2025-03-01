import { Router } from 'express'
import { Events, Users } from '../config/db.js'

const eventsRouter = Router()
const usersRouter = Router()

eventsRouter.get('/', async (req, res) => {
	try {
		const events = await Events.findAll()
		res.status(200).json({ message: events })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Ошибка при получении ивентов.', error: error })
	}
})

eventsRouter.get('/:id', async (req, res) => {
	try {
		const id = req.params.id
		const event = await Events.findByPk(id)
		if (!event) {
			return res.status(404).json({ message: 'Ивент не найден.' })
		} else {
			return res.status(200).json({ message: event })
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Ошибка при получении ивента.', error: error })
	}
})

eventsRouter.post('/', async (req, res) => {
	try {
		const { title, description, date, createdBy } = req.body

		if (!title || !createdBy) {
			return res
				.status(400)
				.json({ message: 'Необходимо указать title и createdBy.' })
		}

		const event = await Events.create({
			title,
			description,
			date,
			createdBy,
		})
		res.status(200).json({ message: event })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Ошибка при создании ивента.', error: error })
	}
})

eventsRouter.put('/:id', async (req, res) => {
	try {
		const id = req.params.id
		const { title, description, date, createdBy } = req.body

		const event = await Events.findByPk(id)
		const oldEvent = await Events.findByPk(id)

		if (!event) {
			return res.status(404).json({ message: 'Ивент не найден' })
		} else {
			await event.update({ title, description, date, createdBy })
			return res.status(200).json({
				message: 'Ивент обновлён!',
				event,
				oldEvent,
			})
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Ошибка при обновлении ивента.', error: error })
	}
})

eventsRouter.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id
		const event = await Events.findByPk(id)

		if (!event) {
			return res.status(404).json({ message: 'Ивент не найден.' })
		} else {
			await event.destroy()
			return res.status(200).json({ message: 'Ивент удалён!' })
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Ошибка при удалении ивента.', error: error })
	}
})

usersRouter.get('/', async (req, res) => {
	try {
		const users = await Users.findAll()
		res.status(200).json({ message: users })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Ошибка при получении пользователей.', error: error })
	}
})

usersRouter.post('/', async (req, res) => {
	try {
		const { name, email } = req.body

		if (!name || !email) {
			return res
				.status(400)
				.json({ message: 'Необходимо указать name и email.' })
		}

		const isUserExists = await Users.findOne({ where: { email } })

		if (isUserExists) {
			return res
				.status(400)
				.json({ message: 'Пользователь с таким email уже существует.' })
		}

		const user = await Users.create({ name, email })

		res.status(200).json({ message: user })
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Ошибка при создании пользователя.', error: error })
	}
})

export { eventsRouter, usersRouter }
