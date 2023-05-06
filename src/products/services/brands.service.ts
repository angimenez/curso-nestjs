import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  private autoincrement = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const product = this.brands.find((item) => item.id === id);
    // Es importante usar estas excepciones que nos da nest, porque sino da error 500 (como si todo estuviera roto)
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  create(payload: CreateBrandDto /* <- Dto */) {
    this.autoincrement++;
    const newProduct = {
      id: this.autoincrement,
      ...payload,
    };
    this.brands.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateBrandDto) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Product #${id} not found`);
    this.brands[index] = { ...this.brands[index], ...payload };
    return this.brands[index];
  }

  delete(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Product #${id} not found`);
    const deletedProduct = this.brands.splice(index, 1);
    return deletedProduct;
  }
}
