import bcrypt from 'bcrypt'
import { User, Event } from '../models/index.js'

const usersData = [
	{
		name: 'Артем',
		email: 'artem@gmail.com',
		password: 'artem123',
		role: 'admin',
	},
	{
		name: 'Тимур',
		email: 'timur@gmail.com',
		password: 'timur123',
		role: 'user',
	},
	{
		name: 'Андрей',
		email: 'andrew@gmail.com',
		password: 'andrew123',
		role: 'user',
	},
]

const generateEvents = userId => [
	{
		title: 'Лекция по веб-разработке',
		description: 'Обязательно к посещению',
		date: '2025-03-25',
		createdBy: userId,
	},
	{
		title: 'Лабораторная работа по веб-разработке',
		description: 'Сдать 5 лаб)',
		date: '2025-03-28',
		createdBy: userId,
	},
]

const seedDB = async () => {
	try {
		console.debug('Начинаю заполнение БД данными...')

		for (const userData of usersData) {
			const hashedPassword = await bcrypt.hash(userData.password, 10)
			const user = await User.create({
				name: userData.name,
				email: userData.email,
				password: hashedPassword,
				role: userData.role || 'user',
			})

			console.debug(
				`Создан пользователь: ${user.name} (${user.email}) с ролью ${user.role}`
			)

			const events = generateEvents(user.id)
			for (const eventData of events) {
				await Event.create(eventData)
			}

			console.debug(
				`Создано ${events.length} шт. мероприятий для пользователя ${user.name}`
			)
		}

		console.debug('База данных успешно заполнена данными!')
	} catch (error) {
		console.error('Ошибка при заполнении БД:', error)
	}
}

export { seedDB }
