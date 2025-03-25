import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
import {
	createValidationError,
	createNotFoundError,
	createServerError,
} from '../throws/index.js'

class AuthService {
	async register(userData) {
		const { name, email, password } = userData

		if (!name || !email || !password) {
			throw createValidationError('Все поля обязательны')
		}

		try {
			const existingUser = await User.findOne({ where: { email } })
			if (existingUser) {
				throw createValidationError('Пользователь с таким email уже существует')
			}

			const hashedPassword = await bcrypt.hash(password, 10)
			const user = await User.create({ name, email, password: hashedPassword })

			return { user }
		} catch (error) {
			if (error.name === 'ValidationError') {
				throw error
			}
			throw createServerError('Ошибка при создании пользователя', error)
		}
	}

	async login(credentials) {
		const { email, password } = credentials

		if (!email || !password) {
			throw createValidationError('Email и пароль обязательны')
		}

		try {
			const user = await User.findOne({ where: { email } })
			if (!user) {
				throw createNotFoundError('Пользователь с таким email не найден')
			}

			const isPasswordValid = await bcrypt.compare(password, user.password)
			if (!isPasswordValid) {
				throw createValidationError('Неверный пароль')
			}

			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: '1h',
			})

			return { user, token }
		} catch (error) {
			if (error.name === 'ValidationError' || error.name === 'NotFoundError') {
				throw error
			}
			throw createServerError('Ошибка при входе в систему', error)
		}
	}
}

export default new AuthService() 