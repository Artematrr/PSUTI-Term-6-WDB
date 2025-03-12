import { ValidationError, NotFoundError, ServerError } from './errors.js'

/**
 * Создает ошибку 400 Bad Request
 * @param {string} message Сообщение об ошибке
 * @returns {ValidationError} Ошибка валидации
 */
function createValidationError(message) {
	return new ValidationError(message)
}

/**
 * Создает ошибку 404 Not Found
 * @param {string} message Сообщение об ошибке
 * @returns {NotFoundError} Ошибка 404 Not Found
 */
function createNotFoundError(message) {
	return new NotFoundError(message)
}

/**
 * Создает ошибку 500 Internal Server Error
 * @param {string} message Сообщение об ошибке
 * @param {Error|null} originalError Оригинальная ошибка
 * @returns {ServerError|Error} Ошибка сервера или оригинальная ошибка
 */
function createServerError(message, originalError = null) {
	// Если оригинальная ошибка уже имеет код статуса, возвращаем её
	if (originalError && originalError.statusCode) {
		return originalError
	}
	return new ServerError(message, originalError)
}

export { createValidationError, createNotFoundError, createServerError }
