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


