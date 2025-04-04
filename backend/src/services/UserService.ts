import { User, IUserData, ICurrentUser, UserRole } from '@models';
import {
  createValidationError,
  createNotFoundError,
  createServerError,
  createForbiddenError,
  CustomError,
} from '@throws';

class UserService {
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await User.findAll();

      if (!users || users.length === 0) {
        throw createNotFoundError('Пользователи не найдены');
      }

      return users;
    } catch (error) {
      if (error instanceof CustomError && error.name === 'NotFoundError') {
        throw error;
      }
      throw createServerError(
        'Ошибка при получении списка пользователей',
        error as CustomError,
      );
    }
  }

  async createUser(userData: IUserData): Promise<User> {
    const { name, email } = userData;

    if (!name || !email) {
      throw createValidationError(
        'Необходимо указать имя и email пользователя',
      );
    }

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw createValidationError(
          `Пользователь с email ${email} уже существует`,
        );
      }

      return await User.create({ name, email });
    } catch (error) {
      if (error instanceof CustomError && error.name === 'ValidationError') {
        throw error;
      }
      throw createServerError(
        'Ошибка при создании пользователя',
        error as CustomError,
      );
    }
  }

  async updateUserRole(
    userId: string,
    newRole: UserRole,
    currentUser: ICurrentUser,
  ): Promise<User> {
    if (!userId) {
      throw createValidationError('ID пользователя не указан');
    }

    if (newRole !== 'user' && newRole !== 'admin') {
      throw createValidationError('Роль должна быть "user" или "admin"');
    }

    if (currentUser.role !== 'admin') {
      throw createForbiddenError(
        'Только администратор может изменять роли пользователей',
      );
    }

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw createNotFoundError(`Пользователь с ID ${userId} не найден`);
      }

      // Запрещаем админу убирать роль админа у самого себя
      if (userId === currentUser.id && newRole === 'user') {
        throw createForbiddenError(
          'Вы не можете лишить себя прав администратора',
        );
      }

      await user.update({ role: newRole });
      return user;
    } catch (error) {
      if (
        error instanceof CustomError &&
        (error.name === 'ValidationError' ||
          error.name === 'NotFoundError' ||
          error.name === 'ForbiddenError')
      ) {
        throw error;
      }
      throw createServerError(
        `Ошибка при обновлении роли пользователя с ID ${userId}`,
        error as CustomError,
      );
    }
  }
}

export default new UserService();
