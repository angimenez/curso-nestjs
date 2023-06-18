import { registerAs } from '@nestjs/config';

// Esta sección es sumamente importante para el configService
// Acá se evita tener que escribir process.env.VARIABLE y que sea más lindo
export default registerAs('config', () => ({
  mongo: {
    dbName: process.env.MONGO_DB,
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    port: parseInt(process.env.MONGO_PORT, 10),
    host: process.env.MONGO_HOST,
    connection: process.env.MONGO_CONNECTION,
  },
  database: {
    host: process.env.DATABASE_HOST,
  },
  apiKey: process.env.API_KEY,
}));
