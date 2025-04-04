import { Router } from 'express';
import { UserController } from '@controllers';

const userRouter: Router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить список пользователей (требуется роль администратора)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       403:
 *         description: Доступ запрещен (не администратор)
 */
userRouter.get('/', UserController.getAll);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать нового пользователя (требуется роль администратора)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Пользователь создан
 *       400:
 *         description: Неверные данные или пользователь уже существует
 *       403:
 *         description: Доступ запрещен (не администратор)
 */
userRouter.post('/', UserController.create);

/**
 * @swagger
 * /users/{id}/role:
 *   patch:
 *     summary: Изменить роль пользователя (требуется роль администратора)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 description: Новая роль пользователя
 *     responses:
 *       200:
 *         description: Роль пользователя успешно обновлена
 *       400:
 *         description: Неверные данные
 *       403:
 *         description: Доступ запрещен (не администратор)
 *       404:
 *         description: Пользователь не найден
 */
userRouter.patch('/:id/role', UserController.updateRole);

export default userRouter;
