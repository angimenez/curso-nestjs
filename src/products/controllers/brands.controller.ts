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
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { BrandsService } from '../services/brands.service';

@Controller('brands')
export class BrandsController {
  // El service se inyecta en el controlador para ser utilizado
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  get(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return this.brandsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateBrandDto /* <- Dto */) {
    return this.brandsService.create(payload);
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
    return this.brandsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    // Esto si precisamos acceder de la forma en que se hace en express
    response.status(200).send(this.brandsService.update(+id, payload));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.brandsService.delete(+id);
  }
}
