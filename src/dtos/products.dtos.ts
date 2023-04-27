import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  // Para especificar un mensaje personalizado
  @IsString({ message: 'El usuario debe tener nombre' })
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

/**
 * Implementación utilizando PartialType para
 * no tener que escribir todos los campos de nuevo
 * pero con la diferencia que los haga a todos opcionales
 * */
export class UpdateProductDto extends PartialType(CreateProductDto) {}

// Con el signo de interrogación digo que son opcionales
// export class UpdateProductDto {
//   @IsString()
//   readonly name?: string;

//   @IsString()
//   readonly description?: string;

//   @IsNumber()
//   readonly price?: number;

//   @IsNumber()
//   readonly stock?: number;

//   @IsUrl()
//   readonly image?: string;
// }
