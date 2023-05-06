import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  // El service se inyecta en el controlador para ser utilizado
  constructor(private readonly usersService: UsersService) {}

  @Get()
  get(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() payload: CreateUserDto /* <- Dto */) {
    return this.usersService.create(payload);
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(
    @Param(
      'id',
      ParseIntPipe /* Importante esto del pipe para validar el dato sea del tipo que preciso */,
    )
    id: number,
  ) {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrders(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.usersService.getOrdersByUser(id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ) {
    // Esto si precisamos acceder de la forma en que se hace en express
    response.status(200).send(this.usersService.update(+id, payload));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
