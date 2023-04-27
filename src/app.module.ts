import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { UsersController } from './controllers/users.controller';
import { BrandsController } from './controllers/brands.controller';
import { OrdersController } from './controllers/orders.controller';
import { CustomersController } from './controllers/customers.controller';
import { ProductsService } from './services/products.service';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';
import { BrandsService } from './services/brands.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    UsersController,
    BrandsController,
    OrdersController,
    CustomersController,
  ],
  providers: [
    AppService,
    ProductsService,
    CustomersService,
    OrdersService,
    CategoriesService,
    UsersService,
    BrandsService,
  ],
})
export class AppModule {}
