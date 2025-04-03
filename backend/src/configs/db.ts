import { Sequelize } from 'sequelize';
import 'dotenv/config';

const db_name: string | undefined = process.env.DB_NAME;
const db_user: string | undefined = process.env.DB_USER;
const db_password: string | undefined = process.env.DB_PASSWORD;
const db_host: string | undefined = process.env.DB_HOST;
const db_port: string | undefined = process.env.DB_PORT;

const sequelize = new Sequelize(db_name!, db_user!, db_password!, {
  host: db_host,
  port: Number(db_port),
  dialect: 'postgres',
  logging: false,
});

const authDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.debug('Соединение с БД установлено!');
  } catch (error) {
    console.error(`Соединение с БД не установлено. Ошибка: ${error}`);
  }
};

const syncDB = async (force = false): Promise<void> => {
  try {
    await sequelize.sync({ force });
    console.debug(`Таблицы синхронизированы! ${force ? '(Со сбросом)' : ''}`);
  } catch (error) {
    console.error(`Таблицы не синхронизированы. Ошибка: ${error}`);
  }
};

export { sequelize, authDB, syncDB };
