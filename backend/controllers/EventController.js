class EventController {
    async getAll (req, res, next) {
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
	}
}

export default new EventController();