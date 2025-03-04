class CustomError extends Error {
	constructor(message, statusCode) {
		super(message)
		this.statusCode = statusCode
	}
}

function createValidationError(message) {
	return new CustomError(message, 400)
}

function createNotFoundError(message) {
	return new CustomError(message, 404)
}

function createServerError(message, originalError = null) {
	if (originalError && originalError.statusCode) {
		return originalError
	}

	return new CustomError(message, 500)
}

function errorHandler(err, req, res, next) {
	const statusCode = err.statusCode || 500

	console.error(`Ошибка: ${err.message}`)

	res.status(statusCode).json({
		status: 'error',
		message: err.message,
	})
}

// Обертка для асинхронных функций
function catchAsync(func) {
	return function (req, res, next) {
		func(req, res, next).catch(next)
	}
}

export {
	createValidationError,
	createNotFoundError,
	createServerError,
	errorHandler,
	catchAsync,
}
