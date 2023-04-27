import { Controller, Get, Query } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `Limit is ${limit} and offset is ${offset}`;
  }
}
