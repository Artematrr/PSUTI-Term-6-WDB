import express, { json } from 'express'
import 'dotenv/config'
import cors from 'cors'
import { authDB, syncDB, resetDB } from './config/db.js'
import { eventsRouter, usersRouter } from './routes/routes.js'

const app = express()
const port = process.env.APP_PORT

app.use(json())
app.use(cors())

app.get('/', (req, res) => {
	res.json({ message: '' })
})

app.use('/events', eventsRouter)
app.use('/users', usersRouter)

await authDB()
await syncDB()
// await resetDB()

app.listen(port, () => console.log('Сервер запущен на порту', port))

export { app }
