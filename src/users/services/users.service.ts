import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private autoincrement = 1;
  private users: User[] = [
    {
      id: 1,
      username: 'User 1',
      password: 'bla bla',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const product = this.users.find((item) => item.id === id);
    // Es importante usar estas excepciones que nos da nest, porque sino da error 500 (como si todo estuviera roto)
    if (!product) throw new NotFoundException(`User #${id} not found`);
    return product;
  }

  create(payload: CreateUserDto /* <- Dto */) {
    this.autoincrement++;
    const newUser = {
      id: this.autoincrement,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`User #${id} not found`);
    this.users[index] = { ...this.users[index], ...payload };
    return this.users[index];
  }

  delete(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`User #${id} not found`);
    const deletedUser = this.users.splice(index, 1);
    return deletedUser;
  }
}
