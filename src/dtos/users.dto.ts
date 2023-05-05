import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  // Para especificar un mensaje personalizado
  @IsString({ message: 'Nombre de usuario requerido' })
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

/**
 * Implementación utilizando PartialType para
 * no tener que escribir todos los campos de nuevo
 * pero con la diferencia que los haga a todos opcionales
 * */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
