import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Like } from './cats/like.entity';

// Проверка обязательных переменных окружения
const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Конфигурация базы данных
export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '1',
  database: process.env.DB_NAME || 'support_lk_db',
  entities: [Like],
  synchronize: true, // Только для разработки!
  logging: process.env.NODE_ENV === 'development',
};

// Конфигурация приложения
export const appConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  environment: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  },
};

// Проверка обязательных переменных в production
if (appConfig.environment === 'production') {
  getRequiredEnv('DB_HOST');
  getRequiredEnv('DB_USER');
  getRequiredEnv('DB_PASSWORD');
  getRequiredEnv('DB_NAME');
}