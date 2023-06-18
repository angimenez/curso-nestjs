import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongoClient } from 'mongodb';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

import { environments } from './environments';
import config from './config';

// ESTO DE ABAJO ES DEPRECADO PORQUE USAMOS .env
const API_KEY = 'KAKAKAKAK';
const API_KEY_PROD = 'KAKAKA FOR PRODUCTION';

@Module({
  imports: [
    ConfigModule.forRoot({
      /* Con esto podemos configurar diferentes ambientes de trabajo */
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [
        config,
      ] /* Para que nuestras variables de entornos tengan tipado seguro*/,
      isGlobal:
        true /* Para que los valores del archivo de configuración sean globales */,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        // Validamos datos de MongoDB
        MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
      }) /* Con joi validamos que el archivo .env tenga todo lo que necesitamos */,
    }),
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
})
export class AppModule {}
