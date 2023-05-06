# Algun comando importante para la consola con nest

## Para crear controladores dentro de una carpeta

<code>nest g controller controllers/products --flat</code>
Si no le ponemos el --flat crea una carpeta
Otra forma de hacerlo es:
<code>nest g co controllers/products --flat</code>

## Pipes

Los pipes validan que un parámetro en la URL se transforme a un tipo deseado y si no se puede convertir devuelve un error apropiado al cliente ("bad request").
Los mismos se agregan como un parámetro más de la anotación para parámetro.
Nosotros podemos crear nuestros propios pipes usando el siguiente comando:
<code>nest g pipe common/parse-int</code>

## Data Transfer Objects

Los DTO no son más que clases customizadas que tu mismo puedes crear para indicar la estructura que tendrán los objetos de entrada en una solicitud.

Los mismos sirven para mejorar la experiencia de desarrollo (aunque no lo verifique en producción).

## Class-validator y mapped-types

Los DTO no solo sirven para tipar y determinar la estructura de los datos de entrada de un endpoint, también pueden contribuir en la validación de los datos y en la entrega de mensajes al front-end en caso de error en los mismos.

Ejecutar el siguiente comando:
<code>npm install class-validator class-transformer @nestjs/mapped-types</code>

Estas librerías traen un set de decoradores para las propiedades de los DTO y así validar los tipos de datos de entrada.

En main.ts agregar la siguiente línea antes del app.listen:
<code>app.useGlobalPipes(new ValidationPipe());</code>

## Creando módulos

Los módulos es una forma de agrupar lógica y simplificar la arquitectura de nuestra aplicación.
Para crear un módulo es necesario usar el siguiente comando:
<code>nest g mo nombre_modulo</code>

## Usando un servicio de un módulo en otro módulo

Para esto el módulo que tiene el servicio debe exportarlo (mirar el código de products) y el módulo que hará el uso del servicio externo debe importarlo (ver el código de users).

## Inyección de dependencias

Se utiliza para utilizar el patrón singlenton (tener una única dependencia para el tema de los servicios), de esta manera, no se generan granden cantidades de instancias innecesarias. Siempre los servicios para ser inyectables deben tener el decorador @Inyectable, y se pueden inyectar a controladores y a otros servicios. Hay que tener especial cuidado con no crear una dependencia circular (un servicio que se inyecta en otro, y el otro en el mismo servicio).

## Inyecciones con useClass y useValue

Cuando realizas un import de un servicio en un módulo como venimos haciendo siempre, internamente, NestJS realiza lo siguiente:

<code>import { AppService } from './app.service';

@Module({
providers: [
{
provide: AppService,
useClass: AppService
}
]
})
export class AppModule {}
</code>

Ambas sintaxis son equivalentes, useClass es el tipo de inyección por defecto. Básicamente, indica que un servicio debe utilizar X clase para funcionar. Si el día de mañana, por algún motivo en tu aplicación, el servicio AppService queda obsoleto y tienes que reemplazarlo por uno nuevo, puedes realizar lo siguiente:
<code>
import { AppService2 } from './app.service';

@Module({
providers: [
{
provide: AppService,
useClass: AppService2
}
]
})
export class AppModule {}
</code>

### useValue

Este tipo de inyección es super importante, por ejemplo para inyectar la conexión a una base de dados o un API key. Se puede realizar de la siguiente manera:
<code>
const API_KEY = '1324567890';

@Module({
providers: [
{
provide: 'API_KEY',
useValue: API_KEY
}
],
})
export class AppModule {}
</code>

Para usarlo por ejemplo en un controller:
<code>
import { Controller, Inject } from '@nestjs/common';

@Controller()
export class AppController {

constructor(@Inject('API_KEY') private apiKey: string) {}
}
</code>

## useFactory

ES útil para realizar peticiones asíncronas (como esperar a conectar con la base de datos y eso)

## Módulos globales

Son buenos para que podamos exportar providers a todos los módulos sin necesidad de importarlos expresamente, y de esa manera podemos inyectar sus providers en otros módulos. Recordar utilizar el decorator @Global()
También sirve para exportar los servicios que se repiten en varios módulos, por ejemplo si en productos llamamos cosas de usuarios y en usuarios llamamos cosas de productos, vamos a generar una dependencia circular y vamos a tener líos, entonces lo mejor es meter esos servicios en un módulo global y listo.
