import passport from '../configs/passport.js'
import {
	createUnauthorizedError,
	createForbiddenError,
	createServerError,
} from '../throws/index.js'

/**
 * Middleware для проверки JWT аутентификации
 * @param {Request} req Объект запроса
 * @param {Response} res Объект ответа
 * @param {Function} next Функция next
 */
function authenticateJWT(req, res, next) {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (err) {
			return next(createServerError('Ошибка аутентификации', err))
		}

		if (!user) {
			return next(
				createUnauthorizedError('Токен отсутствует или недействителен')
			)
		}

		req.user = user
		next()
	})(req, res, next)
}

/**
 * Middleware для проверки роли пользователя
 * @param {string} role Роль пользователя для проверки ('admin', 'user')
 * @returns {Function} Функция, выполняющая проверку роли пользователя
 */
function checkRole(role) {
	return (req, res, next) => {
		if (!req.user) {
			return next(createUnauthorizedError('Не авторизован'))
		}

		if (role === 'admin' && req.user.role !== 'admin') {
			return next(
				createForbiddenError('Доступ запрещен. Требуется роль администратора')
			)
		}

		next()
	}
}

export { authenticateJWT, checkRole }
