import AuthService from '../services/AuthService.js'

class AuthController {
	async register(req, res, next) {
		try {
			const { user } = await AuthService.register(req.body)

			res.status(201).json({
				status: 'success',
				message: 'Пользователь успешно зарегистрирован',
				data: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
			})
		} catch (error) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const { user, token } = await AuthService.login(req.body)

			res.status(200).json({
				status: 'success',
				message: 'Авторизация успешна',
				token,
			})
		} catch (error) {
			next(error)
		}
	}
}

export default new AuthController()
