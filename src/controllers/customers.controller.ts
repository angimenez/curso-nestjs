import { Controller, Get, Query } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getCustomers(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `Limit is ${limit} and offset is ${offset}`;
  }
}
