import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import 'dotenv/config'

const port = process.env.APP_PORT

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Events API & Users API',
			version: '1.0.0',
			description: 'API для управления мероприятиями и пользователями',
		},
		servers: [
			{
				url: `http://localhost:${port}`,
				description: 'Dev',
			},
		],
	},
	apis: ['./api/*.js'],
}

const specs = swaggerJsdoc(options)

export { specs, swaggerUi }
