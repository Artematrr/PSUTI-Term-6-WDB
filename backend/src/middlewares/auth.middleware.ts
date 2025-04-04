import { Request, Response, NextFunction } from 'express';
import { passport } from '@configs';
import {
  createUnauthorizedError,
  createForbiddenError,
  createServerError,
  CustomError,
} from '@throws';
import { ICurrentUser } from '@models';
import { RequestHandler } from 'express';

// Расширяем Request ролью и id текущего пользователя
export interface IAuthRequest extends Request {
  user?: ICurrentUser;
}

/**
 * Middleware для проверки JWT аутентификации
 * @param req Объект запроса
 * @param res Объект ответа
 * @param next Функция next
 */
function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: CustomError, user: ICurrentUser | false) => {
      if (err) {
        return next(createServerError('Ошибка аутентификации', err));
      }

      if (!user) {
        return next(
          createUnauthorizedError('Токен отсутствует или недействителен'),
        );
      }

      // Преобразуем User в ICurrentUser
      (req as IAuthRequest).user = user;
      next();
    },
  )(req, res, next);
}

/**
 * Middleware для проверки роли пользователя
 * @param role Роль пользователя для проверки ('admin', 'user')
 * @returns Функция, выполняющая проверку роли пользователя
 */
function checkRole(role: 'admin' | 'user'): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as IAuthRequest;
    if (!authReq.user) {
      return next(createUnauthorizedError('Не авторизован'));
    }

    if (role === 'admin' && authReq.user.role !== 'admin') {
      return next(
        createForbiddenError('Доступ запрещен. Требуется роль администратора'),
      );
    }

    next();
  };
}

export { authenticateJWT, checkRole };
