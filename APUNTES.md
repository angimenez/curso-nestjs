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

## COnfig Service

Para hacer uso de archivos .env y que sea más fácil configurar nuestros entornos de ejecución en NestJS, podemos usar los configService que por debajo utiliza dotenv.
IMPORTANTE AGREGAR AL .gitignore el .env file
Para utilizarlo lo instalamos con el siguiente comando:

    npm install @nestjs/config

Para inyectar la configuración del .env debemos escribir el sieugiente código en app.module (en la parte de los imports de módulos):

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal:
        true /* Para que los valores del archivo de configuración sean globales */,
    }),

De esta manera se carga en un ConfigService lo que está en el .env. Para poder hacer uso de las configuraciones dentro de nuestros servicios debemos inyectorlo de la siguiente manera:
constructor(private configService: ConfigService) {}

Para traer cualquier configuración luego es simplemente:

    this.configService.get('VAR_CONF_EJEMPLO')

## Tipado del config service

Un problema de la implementación anterior, es que debemos recordar exactamente cada atributo del .env cómo se escribe exactamente para poder trabajar bien. Para tener un "tipado" y evitar esto, hay que hacer lo siguiente:

Creamos un archivo config.ts con el siguiente código (allí se agrupan las variables):

import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
database: {
host: process.env.DATABASE_HOST,
},
apiKey: process.env.API_KEY,
}));

Luego hacemos lo siguiente app.module:
ConfigModule.forRoot({
/_ Con esto podemos configurar diferentes ambientes de trabajo _/
envFilePath: environments[process.env.NODE_ENV] || '.env',
load: [
config,
] /_ Para que nuestras variables de entornos tengan tipado seguro_/,
isGlobal:
true /_ Para que los valores del archivo de configuración sean globales _/,
}),

Luego en donde haremos uso de las variables, debemos importar e inyectar dependencias:

import { ConfigType } from '@nestjs/config';
import config from './config';

...
constructor(
@Inject(config.KEY) private configService: ConfigType<typeof config>,
) {}
...

## Joi (validación de esquemas .envs)

Se instala con el siguiente comando:
npm install joi
Con joi validamos que el archivo .env tenga todo lo que necesitamos. Para usarlo se importa de la siguiente manera y se usa el siguiente código:
...
import _ as Joi from 'joi';
...
ConfigModule.forRoot({
/_ Con esto podemos configurar diferentes ambientes de trabajo _/
envFilePath: environments[process.env.NODE_ENV] || '.env',
load: [
config,
] /_ Para que nuestras variables de entornos tengan tipado seguro*/,
isGlobal:
true /* Para que los valores del archivo de configuración sean globales _/,
validationSchema: Joi.object({
API_KEY: Joi.string().required(),
DATABASE_HOST: Joi.string().required(),
DATABASE_PORT: Joi.number().required(),
}) /_ Con joi validamos que el archivo .env tenga todo lo que necesitamos \*/,
}),
...

## Documentación siguiendo el standard de OpenAPI.org

(https://docs.nestjs.com/openapi/introduction)
Para seguir el standard de open api nestjs nos proporciona una librería llamada swagger que nos va a permitir generar la documentación de forma automática. Para esto primero debemos instalar estos módulos:
npm install --save @nestjs/swagger swagger-ui-express
Debemos agregar unas líneas de código para configurar nuestro proyecto con swagger en main.ts:
...
const config = new DocumentBuilder()
.setTitle('Platzi Store API')
.setDescription('Platzi Store API description')
.setVersion('1.0')
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
...
Además, para que tome los dtos correctamente en la documentación, debemos modificar el archivo nest-cli.json y agregar el plugin del swagger en los compilerOptions, se puede ver algo así como esto:
"compilerOptions": {
"deleteOutDir": true,
"plugins": ["@nestjs/swagger"]
}

Después debemos modificar los partial types para que los tome del paquete de swagger (sino no documento los updates):
import { PartialType } from '@nestjs/swagger';

## Mejorando la documentación de Swagger

EL paquete de sagger para nest nos trae decoradores que nos permiten mejorar las descirpciones y la documnetación generada. Ahora vamos a ver algunos ejemplos, como agregar el decorador @ApiProperty({description:"Descripcion para una propiedad rebuscada"}).
También en los controladores tenemos para agupar endpoints con (por ejemplo en products.controller):
@ApiTags('products')
Con el decorador @ApiOperation({ summary: 'Description' }) podemos documentar métodos en específico.
