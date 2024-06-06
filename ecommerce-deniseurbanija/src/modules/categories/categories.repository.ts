import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/db/entities/Categories.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories(): Promise<Categories[]> {
    const categories: Categories[] = await this.categoriesRepository.find();

    if (categories.length === 0)
      throw new NotFoundException('categories list is still empty');

    return categories;
  }

  async seedCategories() {
    data?.map(async (element) => {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .orIgnore()
        .execute();
    });
    return {
      message: 'Categories seeded succesfully',
    };
  }
}
