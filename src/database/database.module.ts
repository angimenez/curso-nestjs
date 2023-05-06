import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'TASKS',
      useFactory: async () => {
        const tasks = await (
          await fetch('https://jsonplaceholder.typicode.com/todos')
        ).json();
        return tasks;
      },
    },
  ],
  exports: [
    'TASKS',
  ] /* AL ser un módulo global se puede inyectar en cualquier otro módulo sin tener que usar el imports */,
})
export class DatabaseModule {}
