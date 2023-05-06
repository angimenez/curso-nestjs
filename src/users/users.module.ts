import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { OrdersController } from './controllers/orders.controller';
import { CustomersController } from './controllers/customers.controller';

import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { UsersService } from './services/users.service';

@Module({
  controllers: [UsersController, OrdersController, CustomersController],
  providers: [CustomersService, OrdersService, UsersService],
})
export class UsersModule {}
