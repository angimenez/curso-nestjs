import { Controller, Get, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query('limit') limit: number, @Query('offset') offset: number) {
    return `Limit is ${limit} and offset is ${offset}`;
  }
}
