import { Request, Response, NextFunction } from 'express';
import { UserService } from '@services';
import { IUserData, UserRole, ICurrentUser } from '@models';
import { IAuthRequest } from '@/middlewares/auth.middleware';

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.getAllUsers();

      res.status(200).json({
        status: 'success',
        data: users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })),
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: IUserData = req.body;
      const user = await UserService.createUser(userData);

      res.status(201).json({
        status: 'success',
        message: 'Пользователь успешно создан',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRole(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const authReq = req as IAuthRequest;
      const { role } = req.body as { role: UserRole };
      const userId = req.params.id;

      const user = await UserService.updateUserRole(
        userId,
        role,
        authReq.user as ICurrentUser,
      );

      res.status(200).json({
        status: 'success',
        message: `Роль пользователя с ID ${user.id} успешно обновлена на ${role}`,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
