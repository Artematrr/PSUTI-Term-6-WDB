import EventService from '../services/EventService.js'

class EventController {
	async getAll(req, res, next) {
		const { startDate, endDate } = req.query
		try {
			const events = await EventService.getAllEvents(startDate, endDate)

			res.status(200).json({
				status: 'success',
				data: events,
			})
		} catch (error) {
			next(error)
		}
	}

	async getOne(req, res, next) {
		try {
			const event = await EventService.getEventById(req.params.id)

			res.status(200).json({
				status: 'success',
				data: event,
			})
		} catch (error) {
			next(error)
		}
	}

	async create(req, res, next) {
		try {
			const eventData = {
				...req.body,
				createdBy: req.user.id,
			}

			const event = await EventService.createEvent(eventData)

			res.status(201).json({
				status: 'success',
				message: 'Мероприятие успешно создано',
				data: event,
			})
		} catch (error) {
			next(error)
		}
	}

	async update(req, res, next) {
		try {
			const result = await EventService.updateEvent(
				req.params.id,
				req.body,
				req.user
			)

			res.status(200).json({
				status: 'success',
				message: 'Мероприятие успешно обновлено',
				data: result,
			})
		} catch (error) {
			next(error)
		}
	}

	async delete(req, res, next) {
		try {
			await EventService.deleteEvent(req.params.id, req.user)

			res.status(200).json({
				status: 'success',
				message: 'Мероприятие успешно удалено',
			})
		} catch (error) {
			next(error)
		}
	}
}

export default new EventController()
