import { User } from '../models/index.js'
import {
	createValidationError,
	createNotFoundError,
	createServerError,
} from '../throws/index.js'

class UserService {
	async getAllUsers() {
		try {
			const users = await User.findAll()

			if (!users || users.length === 0) {
				throw createNotFoundError('Пользователи не найдены')
			}

			return users
		} catch (error) {
			if (error.name === 'NotFoundError') {
				throw error
			}
			throw createServerError(
				'Ошибка при получении списка пользователей',
				error
			)
		}
	}

	async createUser(userData) {
		const { name, email } = userData

		if (!name || !email) {
			throw createValidationError('Необходимо указать имя и email пользователя')
		}

		try {
			const existingUser = await User.findOne({ where: { email } })
			if (existingUser) {
				throw createValidationError(
					`Пользователь с email ${email} уже существует`
				)
			}

			return await User.create({ name, email })
		} catch (error) {
			if (error.name === 'ValidationError') {
				throw error
			}
			throw createServerError('Ошибка при создании пользователя', error)
		}
	}
}

export default new UserService()
