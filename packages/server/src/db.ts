import { Sequelize } from 'sequelize-typescript';
import { UserTheme, Theme } from './models/index.js';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
  NODE_ENV,
} = process.env;

const sequelize = new Sequelize({
  host: POSTGRES_HOST || 'localhost',
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
  models: [UserTheme, Theme],
});

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: NODE_ENV === 'development' });
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
  }
}
