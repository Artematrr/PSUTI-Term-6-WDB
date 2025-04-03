import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import { IRegisterData, ILoginData } from '../models';

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const registerData: IRegisterData = req.body;
      const { user } = await AuthService.register(registerData);

      res.status(201).json({
        status: 'success',
        message: 'Пользователь успешно зарегистрирован',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginData: ILoginData = req.body;
      const { token, user } = await AuthService.login(loginData);

      res.status(200).json({
        status: 'success',
        message: 'Авторизация успешна',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
