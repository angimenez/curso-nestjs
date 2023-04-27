import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Importante agregar la siguiente línea para que funcione la validación de dtos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:
        true /* Con esto se evita que se ingrese un dato que no está en los dto y los ignora*/,
      forbidNonWhitelisted:
        true /* Con esto se alerta al cliente que se está mandando algún atributo que no existe en el dto, por lo tanto proboca un error */,
    }),
  );

  await app.listen(3000);
}
bootstrap();
