import { Event } from '../models/index.js'
import { Op } from 'sequelize'
import {
	createValidationError,
	createNotFoundError,
	createServerError,
} from '../throws/index.js'

class EventService {
	async getAllEvents(startDate, endDate) {
		try {
			if (startDate && endDate) {
				return await Event.findAll({
					where: { date: { [Op.between]: [startDate, endDate] } },
				})
			} else if (startDate && !endDate) {
				return await Event.findAll({
					where: { date: { [Op.gte]: startDate } },
				})
			} else if (!startDate && endDate) {
				return await Event.findAll({
					where: { date: { [Op.lte]: endDate } },
				})
			}
			return await Event.findAll()
		} catch (error) {
			throw createServerError('Ошибка при получении списка мероприятий', error)
		}
	}

	async getEventById(id) {
		try {
			const event = await Event.findByPk(id)
			if (!event) {
				throw createNotFoundError(`Мероприятие с ID ${id} не найдено`)
			}
			return event
		} catch (error) {
			throw createServerError(
				`Ошибка при получении мероприятия с ID ${id}`,
				error
			)
		}
	}

	async createEvent(eventData) {
		const { title, description, date, createdBy } = eventData

		if (!title) {
			throw createValidationError('Необходимо указать название мероприятия')
		}
		if (!createdBy) {
			throw createValidationError('Необходимо указать создателя мероприятия')
		}

		try {
			return await Event.create({ title, description, date, createdBy })
		} catch (error) {
			throw createServerError('Ошибка при создании мероприятия', error)
		}
	}

	async updateEvent(id, eventData) {
		try {
			const event = await Event.findByPk(id)
			if (!event) {
				throw createNotFoundError(`Мероприятие с ID ${id} не найдено`)
			}

			const oldEvent = { ...event.toJSON() }
			const updatedEvent = await event.update(eventData)

			return {
				current: updatedEvent,
				previous: oldEvent,
			}
		} catch (error) {
			throw createServerError(
				`Ошибка при обновлении мероприятия с ID ${id}`,
				error
			)
		}
	}

	async deleteEvent(id) {
		try {
			const event = await Event.findByPk(id)
			if (!event) {
				throw createNotFoundError(`Мероприятие с ID ${id} не найдено`)
			}

			await event.destroy()
			return true
		} catch (error) {
			throw createServerError(
				`Ошибка при удалении мероприятия с ID ${id}`,
				error
			)
		}
	}
}

export default new EventService()
