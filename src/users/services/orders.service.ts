import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class OrdersService {
  private autoincrement = 1;
  private orders: Order[] = [
    {
      id: 1,
      date: new Date(),
      products: [],
      user: new User(),
    },
  ];

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    const product = this.orders.find((item) => item.id === id);
    // Es importante usar estas excepciones que nos da nest, porque sino da error 500 (como si todo estuviera roto)
    if (!product) throw new NotFoundException(`Order #${id} not found`);
    return product;
  }

  create(payload: CreateOrderDto /* <- Dto */) {
    this.autoincrement++;
    const newOrder = {
      id: this.autoincrement,
      ...payload,
    };
    //this.orders.push(newOrder);
    return newOrder;
  }

  update(id: number, payload: UpdateOrderDto) {
    const index = this.orders.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Order #${id} not found`);
    this.orders[index] = { ...this.orders[index], ...payload };
    return this.orders[index];
  }

  delete(id: number) {
    const index = this.orders.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Order #${id} not found`);
    const deletedOrder = this.orders.splice(index, 1);
    return deletedOrder;
  }
}
