import { Request, Response, NextFunction } from 'express';
import { CustomError } from '@throws';

/**
 * Middleware для обработки ошибок
 * @param err Объект ошибки
 * @param req Объект запроса
 * @param res Объект ответа
 * @param next Функция next
 */
function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Неизвестная ошибка';

  console.error(`Ошибка: ${err.message}`);

  res.status(statusCode).json({
    status: 'error',
    message: message,
  });
}

export { errorHandler };
