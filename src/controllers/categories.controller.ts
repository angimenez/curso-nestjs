import { Controller, Get, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getCategories(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return `Limit is ${limit} and offset is ${offset}`;
  }
}
