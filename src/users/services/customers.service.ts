import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  private autoincrement = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Customer 1',
      lastname: 'lasname 2',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const product = this.customers.find((item) => item.id === id);
    // Es importante usar estas excepciones que nos da nest, porque sino da error 500 (como si todo estuviera roto)
    if (!product) throw new NotFoundException(`Customer #${id} not found`);
    return product;
  }

  create(payload: CreateCustomerDto /* <- Dto */) {
    this.autoincrement++;
    const newCustomer = {
      id: this.autoincrement,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Customer #${id} not found`);
    this.customers[index] = { ...this.customers[index], ...payload };
    return this.customers[index];
  }

  delete(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Customer #${id} not found`);
    const deletedCustomer = this.customers.splice(index, 1);
    return deletedCustomer;
  }
}
