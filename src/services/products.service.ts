import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private autoincrement = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 1222,
      image: '',
      stock: 12,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    // Es importante usar estas excepciones que nos da nest, porque sino da error 500 (como si todo estuviera roto)
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  create(payload: any) {
    this.autoincrement++;
    const newProduct = {
      id: this.autoincrement,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Product #${id} not found`);
    this.products[index] = { ...this.products[index], ...payload };
    return this.products[index];
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Product #${id} not found`);
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct;
  }
}
