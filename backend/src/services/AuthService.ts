import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User, IRegisterData, ILoginData, IAuthResponse } from '@models';
import {
  createValidationError,
  createNotFoundError,
  createServerError,
  CustomError,
} from '@throws';

class AuthService {
  async register(userData: IRegisterData): Promise<IAuthResponse> {
    const { name, email, password } = userData;

    if (!name || !email || !password) {
      throw createValidationError('Все поля обязательны');
    }

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw createValidationError(
          'Пользователь с таким email уже существует',
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'user',
      });

      return { user };
    } catch (error) {
      if (error instanceof Error && error.name === 'ValidationError') {
        throw error;
      }
      throw createServerError(
        'Ошибка при создании пользователя',
        error as CustomError,
      );
    }
  }

  async login(credentials: ILoginData): Promise<IAuthResponse> {
    const { email, password } = credentials;

    if (!email || !password) {
      throw createValidationError('Email и пароль обязательны');
    }

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw createNotFoundError('Пользователь с таким email не найден');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw createValidationError('Неверный пароль');
      }

      const token = jwt.sign(
        {
          id: user.id.toString(),
          role: user.role,
        },
        process.env.JWT_SECRET || '',
        {
          expiresIn: '1h',
        },
      );

      return { user, token };
    } catch (error) {
      if (
        error instanceof Error &&
        (error.name === 'ValidationError' || error.name === 'NotFoundError')
      ) {
        throw error;
      }
      throw createServerError(
        'Ошибка при входе в систему',
        error as CustomError,
      );
    }
  }
}

export default new AuthService();
