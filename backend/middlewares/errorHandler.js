/**
 * Middleware для обработки ошибок
 * @param {Error} err Объект ошибки
 * @param {Request} req Объект запроса
 * @param {Response} res Объект ответа
 * @param {Function} next Функция next
 */
function errorHandler(err, req, res, next) {
	const statusCode = err.statusCode || 500
	console.error(`Ошибка: ${err.message}`)
	res.status(statusCode).json({
		status: 'error',
		message: err.message,
	})
}

export { errorHandler }
