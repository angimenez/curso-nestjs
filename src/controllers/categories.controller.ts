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
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/categories.dto';
import { CategoriesService } from 'src/services/categories.service';

@Controller('categories')
export class CategoriesController {
  // El service se inyecta en el controlador para ser utilizado
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  get(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return this.categoriesService.findAll();
  }

  @Post()
  create(@Body() payload: CreateCategoryDto /* <- Dto */) {
    return this.categoriesService.create(payload);
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
    return this.categoriesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    // Esto si precisamos acceder de la forma en que se hace en express
    response.status(200).send(this.categoriesService.update(+id, payload));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.delete(+id);
  }
}
