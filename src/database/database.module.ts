import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';

import config from '../config';

@Global()
@Module({
  providers: [
    {
      provide: 'TASKS',
      // useFactory permite inyectar cosas asíncronas
      useFactory: async () => {
        const tasks = await (
          await fetch('https://jsonplaceholder.typicode.com/todos')
        ).json();
        return tasks;
      },
    },
    // Creamos un provider para poder utilizar la base de datos de mongo en cualquier servicio como inyectable
    {
      provide: 'MONGO',
      /* Con el config service accedo a lo que está en config.ts, que es donde ponemos las variables de entorno */
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('platzi-store');
        return database;
      },
      inject: [config.KEY], // Importantisima esta línea, sino no anda el tema de inyectar la configuración
    },
  ],
  exports: [
    'TASKS',
    'MONGO',
  ] /* AL ser un módulo global se puede inyectar en cualquier otro módulo sin tener que usar el imports */,
})
export class DatabaseModule {}
