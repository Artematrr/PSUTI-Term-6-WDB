/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - createdBy
 *       properties:
 *         id:
 *           type: integer
 *           description: ID мероприятия
 *         title:
 *           type: string
 *           description: Название мероприятия
 *         description:
 *           type: string
 *           description: Описание мероприятия
 *         date:
 *           type: string
 *           format: date
 *           description: Дата мероприятия
 *         createdBy:
 *           type: integer
 *           description: ID создателя мероприятия
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID пользователя
 *         name:
 *           type: string
 *           description: Имя пользователя
 *         email:
 *           type: string
 *           description: Email пользователя
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Роль пользователя
 */

// Этот файл не экспортирует ничего, он просто предоставляет схемы для Swagger
