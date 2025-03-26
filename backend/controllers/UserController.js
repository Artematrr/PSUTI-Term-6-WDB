import UserService from '../services/UserService.js'

class UserController {
	async getAll(req, res, next) {
		try {
			const users = await UserService.getAllUsers()

			res.status(200).json({
				status: 'success',
				data: users,
			})
		} catch (error) {
			next(error)
		}
	}

	async create(req, res, next) {
		try {
			const user = await UserService.createUser(req.body)

			res.status(201).json({
				status: 'success',
				message: 'Пользователь успешно создан',
				data: user,
			})
		} catch (error) {
			next(error)
		}
	}

	async updateRole(req, res, next) {
		try {
			const { role } = req.body

			const user = await UserService.updateUserRole(
				req.params.id,
				role,
				req.user
			)

			res.status(200).json({
				status: 'success',
				message: `Роль пользователя с ID ${user.id} успешно обновлена на ${role}`,
				data: user,
			})
		} catch (error) {
			next(error)
		}
	}
}

export default new UserController()
