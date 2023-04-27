import { Controller, Get, Query } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `Limit is ${limit} and offset is ${offset}`;
  }
}
