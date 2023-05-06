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
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  // El service se inyecta en el controlador para ser utilizado
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  get(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return this.ordersService.findAll();
  }

  @Post()
  create(@Body() payload: CreateOrderDto /* <- Dto */) {
    return this.ordersService.create(payload);
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
    return this.ordersService.findOne(+id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() payload: UpdateOrderDto,
  ) {
    // Esto si precisamos acceder de la forma en que se hace en express
    response.status(200).send(this.ordersService.update(+id, payload));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ordersService.delete(+id);
  }
}
