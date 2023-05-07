import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    host: process.env.DATABASE_HOST,
  },
  apiKey: process.env.API_KEY,
}));
