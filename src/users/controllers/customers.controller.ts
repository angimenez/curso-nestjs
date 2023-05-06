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
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { CustomersService } from '../services/customers.service';

@Controller('customers')
export class CustomersController {
  // El service se inyecta en el controlador para ser utilizado
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  get(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return this.customersService.findAll();
  }

  @Post()
  create(@Body() payload: CreateCustomerDto /* <- Dto */) {
    return this.customersService.create(payload);
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
    return this.customersService.findOne(+id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() payload: UpdateCustomerDto,
  ) {
    // Esto si precisamos acceder de la forma en que se hace en express
    response.status(200).send(this.customersService.update(+id, payload));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customersService.delete(+id);
  }
}
