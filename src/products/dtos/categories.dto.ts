import { PartialType } from '@nestjs/swagger';
// Se utiliza el del plugin de swagger porque sino no documenta bien los updates
// import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  // Para especificar un mensaje personalizado
  @IsString({ message: 'La categoría debe tener nombre' })
  @IsNotEmpty()
  readonly name: string;
}

/**
 * Implementación utilizando PartialType para
 * no tener que escribir todos los campos de nuevo
 * pero con la diferencia que los haga a todos opcionales
 * */
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
