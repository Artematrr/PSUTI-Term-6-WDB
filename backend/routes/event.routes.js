import { Router } from 'express'
import EventController from '../controllers/EventController.js'

const eventRouter = Router()

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Получить список мероприятий (требуется аутентификация)
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Не авторизован
 */
// eventRouter.get('/', EventController.getAll)

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Получить мероприятие по ID (требуется аутентификация)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID мероприятия
 *     responses:
 *       200:
 *         description: Мероприятие найдено
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Мероприятие не найдено
 */
eventRouter.get('/:id', EventController.getOne)

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Создать новое мероприятие (требуется аутентификация)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Мероприятие создано
 *       400:
 *         description: Неверные данные
 *       401:
 *         description: Не авторизован
 */
eventRouter.post('/', EventController.create)

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Обновить мероприятие (требуется аутентификация)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Мероприятие обновлено
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Мероприятие не найдено
 */
eventRouter.put('/:id', EventController.update)

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Удалить мероприятие (требуется аутентификация)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Мероприятие удалено
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Мероприятие не найдено
 */
eventRouter.delete('/:id', EventController.delete)

export default eventRouter
