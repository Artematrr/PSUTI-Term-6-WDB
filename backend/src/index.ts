import express, { json } from 'express';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import { authDB, syncDB } from '@configs';
import '@models';
import { seedDB } from '@configs';
import {
  eventRouter,
  userRouter,
  baseRouter,
  authRouter,
  publicRouter,
} from '@routes';
import { authenticateJWT, checkRole } from '@middlewares';
import { specs, swaggerUi } from '@configs';
import { errorHandler } from '@middlewares';
import { passport } from '@configs';

const app = express();
const port = process.env.APP_PORT;

// Сброс базы данных и заполние её данными при запуске
const RESET_DB = true;

// Логирование
app.use(morgan('[:method] :url'));

// Настройка JSON и CORS
app.use(json());
app.use(cors());

// Инициализация Passport
app.use(passport.initialize());

// Документация API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Публичные маршруты
app.use('/', publicRouter);
app.use('/auth', authRouter);

// Требующие аутентификации маршруты
app.use('/events', authenticateJWT, eventRouter);
app.use('/users', authenticateJWT, checkRole('admin'), userRouter);
app.use('/', baseRouter);

// Глобальный обработчик ошибок
app.use(errorHandler);

async function startServer() {
  try {
    await authDB();
    await syncDB(RESET_DB);

    if (RESET_DB) {
      await seedDB();
    }

    app.listen(port, () =>
      console.debug(`Сервер запущен на порту http://localhost:${port}`),
    );
  } catch (error) {
    console.error(`Ошибка при старте сервера: ${error}`);
    process.exit(1); // Завершение процесса с кодом ошибки
  }
}

startServer();
