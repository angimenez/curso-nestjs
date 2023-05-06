import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';

import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [BrandsService, CategoriesService, ProductsService],
})
export class ProductsModule {}
