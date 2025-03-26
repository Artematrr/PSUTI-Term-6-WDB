class CustomError extends Error {
	constructor(message, statusCode) {
		super(message)
		this.statusCode = statusCode
		this.name = this.constructor.name
	}
}

class NotFoundError extends CustomError {
	constructor(message) {
		super(message, 404)
	}
}

class ServerError extends CustomError {
	constructor(message, originalError = null) {
		super(message, 500)
		this.originalError = originalError
	}
}

class ValidationError extends CustomError {
	constructor(message) {
		super(message, 400)
	}
}

class UnauthorizedError extends CustomError {
	constructor(message) {
		super(message || 'Не авторизован', 401)
	}
}

class ForbiddenError extends CustomError {
	constructor(message) {
		super(message || 'Доступ запрещен', 403)
	}
}

export {
	CustomError,
	NotFoundError,
	ServerError,
	ValidationError,
	UnauthorizedError,
	ForbiddenError,
}
