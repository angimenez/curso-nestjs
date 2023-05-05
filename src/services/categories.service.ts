import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/categories.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoriesService {
  private autoincrement = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const Category = this.categories.find((item) => item.id === id);
    // Es importante usar estas excepciones que nos da nest, porque sino da error 500 (como si todo estuviera roto)
    if (!Category) throw new NotFoundException(`Category #${id} not found`);
    return Category;
  }

  create(payload: CreateCategoryDto /* <- Dto */) {
    this.autoincrement++;
    const newCategory = {
      id: this.autoincrement,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Category #${id} not found`);
    this.categories[index] = { ...this.categories[index], ...payload };
    return this.categories[index];
  }

  delete(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Category #${id} not found`);
    const deletedCategory = this.categories.splice(index, 1);
    return deletedCategory;
  }
}
