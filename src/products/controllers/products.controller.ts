import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Controller('products')
export class ProductsController {
  // El service se inyecta en el controlador para ser utilizado
  constructor(private readonly productsService: ProductsService) {}

  // El slash del final y del principio son opcionales
  // Al igual que con param podemos indicar cada parametro
  // de la query a mano
  /*@Get()
  getProducts(@Query() queryParams: any) {
    const { limit, offset, brand } = queryParams;
    return `Brand is ${brand}, Limit is ${limit} and offset is ${offset}`;
  }*/
  @Get()
  get(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDto /* <- Dto */) {
    return this.productsService.create(payload);
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
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() payload: UpdateProductDto,
  ) {
    // Esto si precisamos acceder de la forma en que se hace en express
    response.status(200).send(this.productsService.update(+id, payload));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }
}
