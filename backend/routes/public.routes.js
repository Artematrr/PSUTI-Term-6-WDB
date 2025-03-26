import { Router } from 'express'
import EventController from '../controllers/EventController.js'

const publicRouter = Router()

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Получить список мероприятий
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Начальная дата для фильтрации
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Конечная дата для фильтрации
 *     responses:
 *       200:
 *         description: Список мероприятий
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 */
publicRouter.get('/events', EventController.getAll)

export default publicRouter
